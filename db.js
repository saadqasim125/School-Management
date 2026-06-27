// School ERP Database System
(function () {
  const DB_KEY = 'SCHOOL_ERP_DB';

  const defaultDatabase = {
    settings: {
      theme: 'light',
      schoolName: 'Vanguard Enterprise Academy',
      academicYear: '2026-2027',
      securitySettings: {
        twoFactor: false,
        sessionTimeoutMin: 15,
        passwordStrength: 'medium'
      }
    },

    users: [
      {
        id: 'ADM001',
        email: 'admin@school.com',
        phone: '03001234567',
        password: 'admin',
        role: 'admin',
        name: 'Dr. Sarah Vance',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
      },

      {
        id: 'TEA101',
        email: 'teacher1@school.com',
        phone: '03007654321',
        password: 'password',
        role: 'teacher',
        name: 'Prof. John Mitchell',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        classes: ['Grade 9', 'Grade 10'],
        subjects: ['Mathematics', 'Physics']
      },

      {
        id: 'TEA102',
        email: 'teacher2@school.com',
        phone: '03211112222',
        password: 'password',
        role: 'teacher',
        name: 'Dr. Clara Brooks',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        classes: ['Grade 10', 'Grade 11'],
        subjects: ['Chemistry', 'Biology']
      },

      {
        id: 'PAR201',
        email: 'parent1@school.com',
        phone: '03123456789',
        password: 'password',
        role: 'parent',
        name: 'Mr. & Mrs. Robert Chen',
        status: 'Active',
        address: '12-A, Blue Area, Islamabad',
        children: ['STD801', 'STD802']
      },

      {
        id: 'PAR202',
        email: 'parent2@school.com',
        phone: '03335556666',
        password: 'password',
        role: 'parent',
        name: 'Ayesha Khan',
        status: 'Active',
        address: 'Apartment 4B, Hillview Heights, Lahore',
        children: ['STD803']
      },

      {
        id: 'ACC301',
        email: 'accounts@school.com',
        phone: '03456789012',
        password: 'password',
        role: 'accounts',
        name: 'Haris Mahmood',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },

      {
        id: 'STD801',
        email: 'aiden@school.com',
        phone: '03123456781',
        password: 'password',
        role: 'student',
        name: 'Aiden Chen',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'
      },

      {
        id: 'STD802',
        email: 'chloe@school.com',
        phone: '03123456782',
        password: 'password',
        role: 'student',
        name: 'Chloe Chen',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
      },

      {
        id: 'STD803',
        email: 'zane@school.com',
        phone: '03335556661',
        password: 'password',
        role: 'student',
        name: 'Zane Khan',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      }
    ],

  students: [
{
    id: 'STD801',
    rollNumber: '01',
    name: 'Aiden Chen',
    fatherName: 'Robert Chen',
    motherName: 'Emily Chen',
    cnicFormB: '37405-1234567-1',
    dob: '2012-05-14',
    gender: 'Male',
    bloodGroup: 'O+',
    address: '12-A, Blue Area, Islamabad',
    emergencyContact: '03123456789',
    admissionDate: '2022-09-01',
    class: 'Grade 9',
    section: 'A',
    house: 'Red House',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    parentId: 'PAR201',

    grades: {
        midTerm: {
            Mathematics: 92,
            Physics: 88,
            Chemistry: 85,
            English: 90,
            Biology: 95
        },
        finalExam: {
            Mathematics: 94,
            Physics: 90,
            Chemistry: 89,
            English: 92,
            Biology: 93
        }
    },

    attendance: [
        { date: '2026-06-01', status: 'Present' },
        { date: '2026-06-02', status: 'Present' },
        { date: '2026-06-03', status: 'Present' },
        { date: '2026-06-04', status: 'Absent' },
        { date: '2026-06-05', status: 'Present' }
    ]
},

{
    id: 'STD802',
    rollNumber: '02',
    name: 'Chloe Chen',
    fatherName: 'Robert Chen',
    motherName: 'Emily Chen',
    cnicFormB: '37405-1234567-2',
    dob: '2014-08-20',
    gender: 'Female',
    bloodGroup: 'A+',
    address: '12-A, Blue Area, Islamabad',
    emergencyContact: '03123456789',
    admissionDate: '2023-09-01',
    class: 'Grade 9',
    section: 'A',
    house: 'Blue House',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    parentId: 'PAR201',

    grades: {
        midTerm: {
            Mathematics: 78,
            Physics: 82,
            Chemistry: 80,
            English: 88,
            Biology: 84
        },
        finalExam: {
            Mathematics: 82,
            Physics: 85,
            Chemistry: 83,
            English: 90,
            Biology: 86
        }
    },

    attendance: [
        { date: '2026-06-01', status: 'Present' },
        { date: '2026-06-02', status: 'Present' },
        { date: '2026-06-03', status: 'Present' },
        { date: '2026-06-04', status: 'Present' },
        { date: '2026-06-05', status: 'Present' }
    ]
},

{
    id: 'STD803',
    rollNumber: '10',
    name: 'Zane Khan',
    fatherName: 'Kamran Khan (Late)',
    motherName: 'Ayesha Khan',
    cnicFormB: '35202-9876543-1',
    dob: '2011-12-05',
    gender: 'Male',
    bloodGroup: 'B-',
    address: 'Apartment 4B, Hillview Heights, Lahore',
    emergencyContact: '03335556666',
    admissionDate: '2021-09-01',
    class: 'Grade 10',
    section: 'B',
    house: 'Green House',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    parentId: 'PAR202',

    grades: {
        midTerm: {
            Mathematics: 95,
            Physics: 92,
            Chemistry: 96,
            English: 85,
            Biology: 90
        },
        finalExam: {
            Mathematics: 98,
            Physics: 96,
            Chemistry: 97,
            English: 89,
            Biology: 92
        }
    },

    attendance: [
        { date: '2026-06-01', status: 'Present' },
        { date: '2026-06-02', status: 'Present' },
        { date: '2026-06-03', status: 'Present' },
        { date: '2026-06-04', status: 'Present' },
        { date: '2026-06-05', status: 'Absent' }
    ]
}
],
    admissions: [
      {
        id: 'ADM-REQ-001',
        name: 'Sophia Miller',
        parentName: 'David Miller',
        dob: '2016-04-12',
        classApplied: 'Grade 4',
        contact: '03219998888',
        status: 'Pending',
        timestamp: '2026-06-25T10:00:00Z'
      },
      {
        id: 'ADM-REQ-002',
        name: 'Zian Ahmed',
        parentName: 'Ahmed Bilal',
        dob: '2013-11-22',
        classApplied: 'Grade 8',
        contact: '03004445555',
        status: 'Under Review',
        timestamp: '2026-06-26T14:30:00Z'
      }
    ],

    feeSlips: [
      {
        invoiceId: 'INV-2026-001',
        studentId: 'STD801',
        month: 'June 2026',
        items: [
          { name: 'Monthly Fee', amount: 15000 },
          { name: 'Transport Fee', amount: 3000 }
        ],
        totalAmount: 18000,
        status: 'Paid',
        paymentMethod: 'JazzCash',
        transactionId: 'TXN8891230192',
        datePaid: '2026-06-05'
      },
      {
        invoiceId: 'INV-2026-002',
        studentId: 'STD802',
        month: 'June 2026',
        items: [
          { name: 'Monthly Fee', amount: 15000 },
          { name: 'Transport Fee', amount: 3000 }
        ],
        totalAmount: 18000,
        status: 'Unpaid',
        paymentMethod: '',
        transactionId: '',
        datePaid: ''
      },
      {
        invoiceId: 'INV-2026-003',
        studentId: 'STD803',
        month: 'June 2026',
        items: [
          { name: 'Monthly Fee', amount: 18000 },
          { name: 'Annual Exam Fee', amount: 5000 }
        ],
        totalAmount: 23000,
        status: 'Unpaid',
        paymentMethod: '',
        transactionId: '',
        datePaid: ''
      }
    ],

    notices: [
      {
        id: 1,
        category: 'General',
        title: 'Summer Vacation Announcement',
        content: 'School will remain closed for summer break from July 1st to August 15th, 2026.',
        date: '2026-06-20',
        pinned: true,
        expiry: '2026-07-02'
      },
      {
        id: 2,
        category: 'Exams',
        title: 'Final Term Result Cards Issued',
        content: 'Final examination results for all classes have been published and are available on the Parent Portal.',
        date: '2026-06-26',
        pinned: true,
        expiry: '2026-07-10'
      },
      {
        id: 3,
        category: 'Fees',
        title: 'Dues Clearance Deadline',
        content: 'Kindly clear all outstanding June school fees before June 30th to avoid late fee charges.',
        date: '2026-06-24',
        pinned: false,
        expiry: '2026-06-30'
      },
      {
        id: 4,
        category: 'Emergency',
        title: 'Weather Update - Early Dismissal',
        content: 'Due to severe weather forecasts, classes will close early today at 11:30 AM. Safe travels.',
        date: '2026-06-27',
        pinned: false,
        expiry: '2026-06-28'
      }
    ],

    messages: [
      {
        id: 1,
        senderId: 'TEA101',
        receiverId: 'PAR201',
        content: 'Dear Robert, Aiden has done exceptionally well in the recent math quiz. Keep up the encouragement!',
        timestamp: '2026-06-26T11:00:00Z',
        read: false
      },
      {
        id: 2,
        senderId: 'PAR201',
        receiverId: 'TEA101',
        content: 'Thank you, Professor John! We are monitoring his homework daily.',
        timestamp: '2026-06-26T11:30:00Z',
        read: true
      },
      {
        id: 3,
        senderId: 'ADM001',
        receiverId: 'TEA101',
        content: 'Professor John, please submit the final math syllabi for Grade 9 by Friday.',
        timestamp: '2026-06-25T09:00:00Z',
        read: true
      }
    ],
        complaints: [
      {
        id: 'CMP001',
        studentId: 'STD801',
        subject: 'Locker lock broken',
        details: 'Locker #45 lock seems broken. Requesting repair.',
        status: 'Open',
        parentId: 'PAR201',
        replies: []
      }
    ],

    library: [
      {
        barcode: 'LIB1001',
        title: 'Advanced Calculus',
        author: 'M. Spivak',
        status: 'Issued',
        borrowedBy: 'STD801',
        dueDate: '2026-07-05'
      },
      {
        barcode: 'LIB1002',
        title: 'Fundamentals of Physics',
        author: 'Halliday & Resnick',
        status: 'Available',
        borrowedBy: '',
        dueDate: ''
      },
      {
        barcode: 'LIB1003',
        title: 'Organic Chemistry Principles',
        author: 'J. Smith',
        status: 'Available',
        borrowedBy: '',
        dueDate: ''
      }
    ],

    inventory: [
      {
        itemCode: 'INV-CHR-01',
        name: 'Classroom Ergonomic Chairs',
        quantity: 240,
        status: 'In Use'
      },
      {
        itemCode: 'INV-PRJ-05',
        name: 'Smart Projectors HD',
        quantity: 15,
        status: 'Maintenance'
      },
      {
        itemCode: 'INV-LAP-10',
        name: 'Computer Lab Workstations',
        quantity: 45,
        status: 'In Use'
      }
    ],

    transport: [
      {
        routeId: 'RTE-01',
        name: 'Blue Area - Sector F-8 - F-10',
        driver: 'Akram Malik',
        contact: '03009876543',
        status: 'Active'
      },
      {
        routeId: 'RTE-02',
        name: 'Sector G-11 - I-8 - Highway Road',
        driver: 'Nadeem Abbasi',
        contact: '03212345678',
        status: 'Active'
      }
    ],

    hostel: [
      {
        roomNo: 'H-101',
        wing: 'North Wing',
        type: 'Shared (2)',
        occupantIds: ['STD801'],
        status: 'Available'
      },
      {
        roomNo: 'H-102',
        wing: 'North Wing',
        type: 'Single',
        occupantIds: ['STD803'],
        status: 'Occupied'
      }
    ],

    visitors: [
      {
        name: 'Kamran Shah',
        contact: '0321-5554321',
        purpose: 'Admissions Inquiry',
        checkIn: '2026-06-27T09:15:00Z',
        checkOut: '2026-06-27T10:00:00Z'
      },
      {
        name: 'Dr. Tariq Khan',
        contact: '0333-8889999',
        purpose: 'Guest Lecture',
        checkIn: '2026-06-27T10:30:00Z',
        checkOut: ''
      }
    ],

    loginHistory: [
      {
        timestamp: '2026-06-27T08:30:00Z',
        userId: 'ADM001',
        name: 'Dr. Sarah Vance',
        role: 'admin',
        ip: '192.168.10.15',
        device: 'Windows PC (Chrome)'
      },
      {
        timestamp: '2026-06-27T09:12:00Z',
        userId: 'TEA101',
        name: 'Prof. John Mitchell',
        role: 'teacher',
        ip: '192.168.10.22',
        device: 'MacBook Pro (Safari)'
      }
    ],

    leaveRequests: [
      {
        id: 'LR001',
        teacherId: 'TEA101',
        teacherName: 'Prof. John Mitchell',
        startDate: '2026-07-02',
        endDate: '2026-07-05',
        reason: 'Medical Checkup',
        status: 'Pending'
      }
    ],

    announcements: [
      {
        id: 'AN001',
        teacherId: 'TEA101',
        targetClass: 'Grade 9',
        title: 'Bring compass to geometry class',
        date: '2026-06-27'
      }
    ]
  };

  window.SchoolDB = {
    get() {
      let data = localStorage.getItem(DB_KEY);

      if (!data) {
        localStorage.setItem(DB_KEY, JSON.stringify(defaultDatabase));
        return defaultDatabase;
      }

      try {
        return JSON.parse(data);
      } catch (e) {
        localStorage.setItem(DB_KEY, JSON.stringify(defaultDatabase));
        return defaultDatabase;
      }
    },

    save(data) {
      localStorage.setItem(DB_KEY, JSON.stringify(data));
    },

    reset() {
      localStorage.setItem(DB_KEY, JSON.stringify(defaultDatabase));
      return defaultDatabase;
    }
  };

  window.SchoolDB.get();
})();