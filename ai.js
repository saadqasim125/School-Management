// School ERP AI Assistant (NLP Parsing Engine)
(function() {
  window.SchoolAI = {
    // Parse natural language queries and return HTML formatted responses
    parseCommand: function(input) {
      const db = window.SchoolDB.get();
      const text = input.toLowerCase().trim();
      // Command: "Show pending fees" or "Show unpaid fee students"
      if (text.includes('pending fees') || text.includes('unpaid') || text.includes('dues')) {
        const unpaid = db.feeSlips.filter(s => s.status === 'Unpaid');
        if (unpaid.length === 0) {
          return 'All student invoices have been paid and cleared successfully.';
        }
        
        let result = `<div class="font-semibold text-slate-200">Pending Fee Accounts:</div><ul class="list-disc pl-5 mt-1.5 space-y-1">`;
        unpaid.forEach(s => {
          const std = db.students.find(student => student.id === s.studentId);
          const name = std ? std.name : s.studentId;
          const cls = std ? std.class : 'N/A';
          result += `<li><strong>${name}</strong> (${cls}) - Dues: <strong>PKR ${s.totalAmount.toLocaleString()}</strong> [Invoice: ${s.invoiceId}]</li>`;
        });
        result += '</ul>';
        return result;
      }
      // Command: "Find class 10 students" or "Find class 9"
      if (text.includes('find class') || text.includes('students in class') || text.includes('list class')) {
        // Regex to find digits or alphanumeric class names
        const match = text.match(/(?:class|grade)\s+(\d+|[a-zA-Z0-9\s]+)/i);
        if (match) {
          const className = match[1].trim();
          const matches = db.students.filter(s => s.class.toLowerCase().includes(className));
          
          if (matches.length === 0) {
            return `No students found matching class context: <strong>"${className}"</strong>. Try "Grade 9" or "Grade 10".`;
          }
          
          let result = `<div class="font-semibold text-slate-200">Registered Students in ${className.toUpperCase()}:</div><ul class="list-disc pl-5 mt-1.5 space-y-1">`;
          matches.forEach(s => {
            result += `<li>ID: <span class="font-mono text-indigo-400">${s.id}</span> - Roll ${s.rollNumber}: <strong>${s.name}</strong> (Sec ${s.section})</li>`;
          });
          result += '</ul>';
          return result;
        }
        return 'Could not identify the class. Please ask like this: <em>"Find class 9 students"</em>.';
      }
      // Command: "Generate attendance report"
      if (text.includes('attendance report') || text.includes('attendance percentage') || text.includes('show attendance')) {
        let totalLogs = 0;
        let presentLogs = 0;
        
        db.students.forEach(s => {
          s.attendance.forEach(a => {
            totalLogs++;
            if (a.status === 'Present') presentLogs++;
          });
        });
        
        const rate = totalLogs > 0 ? ((presentLogs / totalLogs) * 100).toFixed(1) : '95.0';
        return `<strong>System Attendance Auditing Summary:</strong><br>
                • Total Checked Records: ${totalLogs}<br>
                • Present Log Entries: ${presentLogs}<br>
                • Enterprise Attendance Rate: <strong class="text-emerald-400">${rate}%</strong>`;
      }
      // Command: "Find teacher by ID TEA101"
      if (text.includes('find teacher') || text.includes('teacher by id') || text.includes('teacher profile')) {
        const match = text.match(/tea\d+/i);
        if (match) {
          const id = match[0].toUpperCase();
          const teacher = db.users.find(u => u.role === 'teacher' && u.id === id);
          
          if (!teacher) {
            return `No teacher was found matching ID: <strong>"${id}"</strong>.`;
          }
          
          return `<strong>Teacher Record Found:</strong><br>
                  • Name: <strong>${teacher.name}</strong><br>
                  • Email Address: ${teacher.email}<br>
                  • Mobile Contact: ${teacher.phone}<br>
                  • Subjects Assigned: ${teacher.subjects.join(', ')}<br>
                  • Teaching Classes: ${teacher.classes.join(', ')}`;
        }
        return 'Please specify the Teacher ID, e.g., <em>"Find teacher by ID TEA101"</em>.';
      }
      // Fallback
      return `I didn't quite catch that query. You can ask me commands like:<br>
              - <span class="text-indigo-400 font-medium">"Show pending fees"</span><br>
              - <span class="text-indigo-400 font-medium">"Find class 9 students"</span><br>
              - <span class="text-indigo-400 font-medium">"Generate attendance report"</span><br>
              - <span class="text-indigo-400 font-medium">"Find teacher by ID TEA101"</span>`;
    }
  };
})();