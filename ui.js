// School ERP General UI & AI Assistant Module
(function() {
  window.SchoolUI = {
    // Show premium toast notifications
    showToast: function(message, type = 'success') {
      const container = document.getElementById('toast-container') || this.createToastContainer();
      
      const toast = document.createElement('div');
      toast.className = `glass-panel px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border-l-4 transition-all duration-300 transform translate-y-4 opacity-0 max-w-sm ${
        type === 'success' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' :
        type === 'danger' ? 'border-rose-500 text-rose-600 dark:text-rose-400' :
        type === 'warning' ? 'border-amber-500 text-amber-600 dark:text-amber-400' :
        'border-indigo-500 text-indigo-600 dark:text-indigo-400'
      }`;
      
      let icon = '🔔';
      if (type === 'success') icon = '✅';
      if (type === 'danger') icon = '❌';
      if (type === 'warning') icon = '⚠️';
      toast.innerHTML = `
        <span class="text-xl">${icon}</span>
        <div class="flex-1 text-sm font-medium">${message}</div>
        <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none">&times;</button>
      `;
      // Close button
      toast.querySelector('button').addEventListener('click', () => {
        toast.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => toast.remove(), 300);
      });
      container.appendChild(toast);
      // Trigger animation
      setTimeout(() => {
        toast.classList.remove('opacity-0', 'translate-y-4');
      }, 50);
      // Self destruct
      setTimeout(() => {
        if (toast.parentNode) {
          toast.classList.add('opacity-0', 'translate-y-4');
          setTimeout(() => toast.remove(), 300);
        }
      }, 4000);
    },
    createToastContainer: function() {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-auto';
      document.body.appendChild(container);
      return container;
    },
    // Light / Dark Theme Toggle
    initTheme: function() {
      const db = window.SchoolDB.get();
      const currentTheme = db.settings.theme || 'light';
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }
      this.updateThemeButton();
    },
    toggleTheme: function() {
      const db = window.SchoolDB.get();
      const isDark = document.documentElement.classList.toggle('dark-theme');
      db.settings.theme = isDark ? 'dark' : 'light';
      window.SchoolDB.save(db);
      this.updateThemeButton();
      this.showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`, 'info');
    },
    updateThemeButton: function() {
      const buttons = document.querySelectorAll('.theme-toggle-btn');
      const isDark = document.documentElement.classList.contains('dark-theme');
      buttons.forEach(btn => {
        btn.innerHTML = isDark ? '☀️' : '🌙';
      });
    },
    // QR Code Generator (Simple canvas based QR simulator for ID Cards)
    generateQRCodeCanvas: function(canvasElement, text) {
      if (!canvasElement) return;
      const ctx = canvasElement.getContext('2d');
      const width = canvasElement.width;
      const height = canvasElement.height;
      
      // Clear
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      // Simulate QR block matrix
      ctx.fillStyle = '#0f172a';
      const size = 10;
      
      // Corners
      ctx.fillRect(5, 5, 30, 30);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(10, 10, 20, 20);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(15, 15, 10, 10);
      ctx.fillRect(width - 35, 5, 30, 30);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(width - 30, 10, 20, 20);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(width - 25, 15, 10, 10);
      ctx.fillRect(5, height - 35, 30, 30);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(10, height - 30, 20, 20);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(15, height - 25, 10, 10);
      // Draw random noise
      ctx.fillStyle = '#0f172a';
      for (let x = 40; x < width - 40; x += 6) {
        for (let y = 10; y < height - 10; y += 6) {
          if (Math.random() > 0.5) {
            ctx.fillRect(x, y, 4, 4);
          }
        }
      }
      for (let x = 10; x < width - 10; x += 6) {
        for (let y = 40; y < height - 40; y += 6) {
          if (Math.random() > 0.5) {
            ctx.fillRect(x, y, 4, 4);
          }
        }
      }
    },
    // Print elements directly
    printElement: function(elementId) {
      const el = document.getElementById(elementId);
      if (!el) return;
      const originalContent = document.body.innerHTML;
      const printContent = el.innerHTML;
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      // Reload is sometimes needed to re-attach event listeners after writing innerHTML
      window.location.reload();
    },
    // AI Assistant Search & Commands Parser
    parseAICommand: function(input) {
      const db = window.SchoolDB.get();
      const text = input.toLowerCase().trim();
      if (text.includes('pending fees') || text.includes('unpaid')) {
        const unpaid = db.feeSlips.filter(s => s.status === 'Unpaid');
        if (unpaid.length === 0) return 'All fee invoices have been cleared successfully.';
        
        let result = `<strong>Found ${unpaid.length} Pending Invoice(s):</strong><ul class="list-disc pl-5 mt-2">`;
        unpaid.forEach(s => {
          const std = db.students.find(student => student.id === s.studentId);
          result += `<li>Invoice: ${s.invoiceId} - Student: ${std ? std.name : s.studentId} (${s.month}) - Amount: PKR ${s.totalAmount}</li>`;
        });
        result += '</ul>';
        return result;
      }
      if (text.includes('find class') || text.includes('students in class')) {
        const match = text.match(/class\s+(\d+|[a-zA-Z0-9\s]+)/);
        if (match) {
          const className = match[1];
          const matches = db.students.filter(s => s.class.toLowerCase().includes(className));
          if (matches.length === 0) return `No students found in class: ${className}`;
          
          let result = `<strong>Students in ${className.toUpperCase()}:</strong><ul class="list-disc pl-5 mt-2">`;
          matches.forEach(s => {
            result += `<li>ID: ${s.id} - Roll: ${s.rollNumber} - ${s.name} (Section ${s.section})</li>`;
          });
          result += '</ul>';
          return result;
        }
        return 'Please specify the class number, e.g., "Find class 9 students".';
      }
      if (text.includes('attendance report')) {
        let total = 0;
        let present = 0;
        db.students.forEach(s => {
          s.attendance.forEach(a => {
            total++;
            if (a.status === 'Present') present++;
          });
        });
        const percent = total > 0 ? ((present / total) * 100).toFixed(1) : '100';
        return `<strong>Attendance Report Summary:</strong><br>Calculated overall attendance rate is <strong>${percent}%</strong> based on ${total} logged attendance status records.`;
      }
      if (text.includes('teacher by id') || text.includes('find teacher')) {
        const match = text.match(/tea\d+/i);
        if (match) {
          const teacherId = match[0].toUpperCase();
          const teacher = db.users.find(u => u.role === 'teacher' && u.id === teacherId);
          if (!teacher) return `Teacher with ID ${teacherId} not found in the staff database.`;
          return `<strong>Teacher Record Found:</strong><br>
                  Name: ${teacher.name}<br>
                  Email: ${teacher.email}<br>
                  Phone: ${teacher.phone}<br>
                  Subjects: ${teacher.subjects.join(', ')}<br>
                  Classes Assigned: ${teacher.classes.join(', ')}`;
        }
        return 'Please include the Teacher ID in your request, e.g., "Find teacher by ID TEA101".';
      }
      return `Command not understood. You can try queries like:<br>
              - "Show pending fees"<br>
              - "Find class 9 students"<br>
              - "Generate attendance report"<br>
              - "Find teacher by ID TEA101"`;
    }
  };
  // Initialize page components on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    window.SchoolUI.initTheme();
  });
})();
