// School ERP Auth Module
(function() {
  const SESSION_KEY = 'SCHOOL_ERP_SESSION';
  const TIMEOUT_MS = 15 * 60 * 1000; // 15 mins session timeout
  window.SchoolAuth = {
    // Attempt Login
    login: function(identifier, password, rememberMe) {
      const db = window.SchoolDB.get();
      const user = db.users.find(u => 
        (u.email.toLowerCase() === identifier.toLowerCase() || 
         u.phone === identifier || 
         u.id.toLowerCase() === identifier.toLowerCase()) && 
        u.password === password
      );
      if (!user) {
        return { success: false, message: 'Invalid credentials or identifier ID.' };
      }
      if (user.status === 'Suspended') {
        return { success: false, message: 'This account has been suspended. Please contact Admin.' };
      }
      // Add to session log
      const newLog = {
        timestamp: new Date().toISOString(),
        userId: user.id,
        name: user.name,
        role: user.role,
        ip: '192.168.10.' + Math.floor(Math.random() * 254 + 1),
        device: navigator.userAgent.includes('Windows') ? 'Windows PC (Chrome)' : 'Mobile Device (Safari)'
      };
      
      db.loginHistory.unshift(newLog);
      window.SchoolDB.save(db);
      // Save remember-me
      if (rememberMe) {
        localStorage.setItem('SCHOOL_ERP_REMEMBER', identifier);
      } else {
        localStorage.removeItem('SCHOOL_ERP_REMEMBER');
      }
      // Set Session
      const session = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          photo: user.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
        },
        loginTime: Date.now(),
        lastActivity: Date.now()
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true, user: user };
    },
    // Check current session
    checkSession: function() {
      const sessionStr = sessionStorage.getItem(SESSION_KEY);
      if (!sessionStr) return null;
      try {
        const session = JSON.parse(sessionStr);
        const now = Date.now();
        
        // Timeout check
        if (now - session.lastActivity > TIMEOUT_MS) {
          this.logout();
          alert('Session expired due to inactivity. Logging out...');
          return null;
        }
        // Update activity timestamp
        session.lastActivity = now;
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        
        // Ensure user is not suspended in database
        const db = window.SchoolDB.get();
        const freshUser = db.users.find(u => u.id === session.user.id);
        if (freshUser && freshUser.status === 'Suspended') {
          this.logout();
          alert('Your account status was set to Suspended. Session closed.');
          return null;
        }
        return session.user;
      } catch (e) {
        return null;
      }
    },
    // Retrieve active user or redirect
    requireUser: function(allowedRoles = []) {
      const user = this.checkSession();
      if (!user) {
        window.location.href = 'index.html';
        return null;
      }
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        alert('Access denied: Unauthorized portal.');
        alert('Access denied: Unauthorized portal route.');
        window.location.href = 'index.html';
        return null;
      }
      return user;
    },
    // Check validation conflicts when registering new staff/students
    checkConflicts: function(id, email, phone) {
      const db = window.SchoolDB.get();
      const conflictUser = db.users.find(u => 
        u.id.toLowerCase() === id.toLowerCase() ||
        u.email.toLowerCase() === email.toLowerCase() ||
        u.phone === phone
      );
      
      if (conflictUser) {
        if (conflictUser.id.toLowerCase() === id.toLowerCase()) return 'Duplicate ID identified.';
        if (conflictUser.email.toLowerCase() === email.toLowerCase()) return 'Email address already registered.';
        if (conflictUser.phone === phone) return 'Mobile contact already registered.';
      }
      return null;
    },
    // Redirect logged in user directly to their respective dashboards
    autoRedirectIfSessionActive: function() {
      const sessionStr = sessionStorage.getItem(SESSION_KEY);
      if (sessionStr) {
        try {
          const session = JSON.parse(sessionStr);
          // Quick timeout check
          if (Date.now() - session.lastActivity < TIMEOUT_MS) {
            window.location.href = `${session.user.role}.html`;
          }
        } catch(e) {}
      }
    },
    // Logout
    logout: function() {
      sessionStorage.removeItem(SESSION_KEY);
      window.location.href = 'index.html';
    },
    // Change Password
    changePassword: function(userId, oldPassword, newPassword) {
      const db = window.SchoolDB.get();
      const user = db.users.find(u => u.id === userId);
      
      if (!user) return { success: false, message: 'User not found.' };
      if (user.password !== oldPassword) return { success: false, message: 'Current password incorrect.' };
      
      user.password = newPassword;
      window.SchoolDB.save(db);
      return { success: true, message: 'Password updated successfully!' };
    },
    // Update Profile Info
    updateProfile: function(userId, updatedData) {
      const db = window.SchoolDB.get();
      const user = db.users.find(u => u.id === userId);
      if (!user) return { success: false, message: 'User not found.' };
      Object.assign(user, updatedData);
      window.SchoolDB.save(db);
      // Update current session storage
      const sessionStr = sessionStorage.getItem(SESSION_KEY);
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        Object.assign(session.user, updatedData);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      }
      
      return { success: true, message: 'Profile updated successfully!' };
    }
  };
  // Start background inactivity tracker
  setInterval(() => {
    const sessionStr = sessionStorage.getItem(SESSION_KEY);
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (Date.now() - session.lastActivity > TIMEOUT_MS) {
          window.SchoolAuth.logout();
          alert('Your session has timed out due to inactivity.');
        }
      } catch(e) {}
    }
  }, 10000);
  // Monitor user activity to keep session alive
  const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
  activityEvents.forEach(evt => {
    document.addEventListener(evt, () => {
      const sessionStr = sessionStorage.getItem(SESSION_KEY);
      if (sessionStr) {
        try {
          const session = JSON.parse(sessionStr);
          session.lastActivity = Date.now();
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        } catch(e) {}
      }
    });
  });
})();
