// DEMONSTRATION DATA ONLY
// This module contains sample data for development and testing purposes.
// This data will be replaced with real Supabase data after authentication is implemented.

export const demoUser = {
    id: 'demo-user-1',
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    university: 'State University',
    program: 'Computer Science',
    studyHours: {
        monday: 4,
        tuesday: 4,
        wednesday: 3,
        thursday: 4,
        friday: 3,
        saturday: 6,
        sunday: 5
    },
    totalWeeklyHours: 29
};

export const demoSubjects = [
    {
        id: 'sub-1',
        name: 'Data Structures',
        code: 'CS201',
        credits: 4,
        color: '#386B61'
    },
    {
        id: 'sub-2',
        name: 'Algorithms',
        code: 'CS301',
        credits: 4,
        color: '#78938A'
    },
    {
        id: 'sub-3',
        name: 'Database Systems',
        code: 'CS305',
        credits: 3,
        color: '#5A7A6E'
    },
    {
        id: 'sub-4',
        name: 'Software Engineering',
        code: 'CS401',
        credits: 3,
        color: '#4A6B5F'
    }
];

export const demoClasses = [
    {
        id: 'class-1',
        subjectId: 'sub-1',
        subjectName: 'Data Structures',
        day: 'Monday',
        startTime: '09:00',
        endTime: '10:30',
        location: 'Room 101',
        type: 'Lecture'
    },
    {
        id: 'class-2',
        subjectId: 'sub-2',
        subjectName: 'Algorithms',
        day: 'Monday',
        startTime: '11:00',
        endTime: '12:30',
        location: 'Room 205',
        type: 'Lecture'
    },
    {
        id: 'class-3',
        subjectId: 'sub-1',
        subjectName: 'Data Structures',
        day: 'Tuesday',
        startTime: '14:00',
        endTime: '15:30',
        location: 'Lab 301',
        type: 'Lab'
    },
    {
        id: 'class-4',
        subjectId: 'sub-3',
        subjectName: 'Database Systems',
        day: 'Wednesday',
        startTime: '10:00',
        endTime: '11:30',
        location: 'Room 102',
        type: 'Lecture'
    },
    {
        id: 'class-5',
        subjectId: 'sub-4',
        subjectName: 'Software Engineering',
        day: 'Thursday',
        startTime: '09:00',
        endTime: '10:30',
        location: 'Room 201',
        type: 'Lecture'
    }
];

export const demoTasks = [
    {
        id: 'task-1',
        title: 'Binary Search Tree Implementation',
        subjectId: 'sub-1',
        subjectName: 'Data Structures',
        type: 'Assignment',
        dueDate: '2026-11-05',
        dueTime: '23:59',
        estimatedHours: 8,
        priority: 'High',
        status: 'In Progress',
        description: 'Implement a binary search tree with insert, delete, and search operations.'
    },
    {
        id: 'task-2',
        title: 'Dynamic Programming Quiz',
        subjectId: 'sub-2',
        subjectName: 'Algorithms',
        type: 'Quiz',
        dueDate: '2026-11-07',
        dueTime: '14:00',
        estimatedHours: 2,
        priority: 'High',
        status: 'Not Started',
        description: 'Quiz covering dynamic programming concepts and problem-solving.'
    },
    {
        id: 'task-3',
        title: 'Database Design Project',
        subjectId: 'sub-3',
        subjectName: 'Database Systems',
        type: 'Project',
        dueDate: '2026-11-15',
        dueTime: '17:00',
        estimatedHours: 20,
        priority: 'High',
        status: 'In Progress',
        description: 'Design and implement a complete database system for a library management system.'
    },
    {
        id: 'task-4',
        title: 'Midterm Exam - Software Engineering',
        subjectId: 'sub-4',
        subjectName: 'Software Engineering',
        type: 'Exam',
        dueDate: '2026-11-10',
        dueTime: '09:00',
        estimatedHours: 3,
        priority: 'High',
        status: 'Not Started',
        description: 'Midterm examination covering software development lifecycle and methodologies.'
    },
    {
        id: 'task-5',
        title: 'Graph Algorithms Assignment',
        subjectId: 'sub-2',
        subjectName: 'Algorithms',
        type: 'Assignment',
        dueDate: '2026-11-12',
        dueTime: '23:59',
        estimatedHours: 10,
        priority: 'Medium',
        status: 'Not Started',
        description: 'Implement Dijkstra\'s algorithm and analyze its time complexity.'
    }
];

export const demoStudySessions = [
    {
        id: 'session-1',
        taskId: 'task-1',
        taskTitle: 'Binary Search Tree Implementation',
        date: '2026-11-01',
        time: '16:00',
        duration: 2,
        location: 'Library',
        status: 'Scheduled'
    },
    {
        id: 'session-2',
        taskId: 'task-3',
        taskTitle: 'Database Design Project',
        date: '2026-11-02',
        time: '10:00',
        duration: 3,
        location: 'Study Room A',
        status: 'Scheduled'
    },
    {
        id: 'session-3',
        taskId: 'task-4',
        taskTitle: 'Midterm Exam - Software Engineering',
        date: '2026-11-03',
        time: '14:00',
        duration: 2,
        location: 'Library',
        status: 'Scheduled'
    }
];

export const demoWorkloadSummary = {
    totalUnfinishedHours: 43,
    availableWeeklyHours: 29,
    shortfall: 14,
    todayWorkload: {
        classHours: 3,
        studyHours: 2,
        totalHours: 5
    },
    weeklyBreakdown: [
        { day: 'Monday', workload: 5, available: 4, overloaded: true },
        { day: 'Tuesday', workload: 4, available: 4, overloaded: false },
        { day: 'Wednesday', workload: 6, available: 3, overloaded: true },
        { day: 'Thursday', workload: 5, available: 4, overloaded: true },
        { day: 'Friday', workload: 4, available: 3, overloaded: true },
        { day: 'Saturday', workload: 8, available: 6, overloaded: true },
        { day: 'Sunday', workload: 7, available: 5, overloaded: true }
    ]
};
