# Open Schedule Requirements

## Project Overview

Open Schedule is an academic workload and study-scheduling system for university students. It serves as a decision-support tool to help students manage their time effectively without automatically making scheduling decisions for them.

## Technology Requirements

### Fixed Technology Stack

- **HTML5** - For markup and structure
- **CSS3** - For styling and layout
- **Vanilla JavaScript with ES modules** - For frontend logic
- **Supabase Auth** - For user authentication
- **Supabase PostgreSQL** - For data persistence
- **Supabase JavaScript client** - For database interactions

### Excluded Technologies

- React, Angular, Vue, Next.js
- TypeScript
- Tailwind CSS
- Separate Java Spring Boot backend

## Functional Requirements

### 1. Authentication

- **User Registration**
  - Students can create an account with email and password
  - Basic profile information collection (name, university, program)

- **User Login**
  - Students can log in with email and password
  - Session management with Supabase Auth

- **User Logout**
  - Students can securely log out
  - Session termination

### 2. Profile Management

- **Profile Information**
  - View and edit personal information (name, email, university, program)
  - Update password

- **Study Hours Configuration**
  - Set available study hours per day (Monday-Sunday)
  - Set total available study hours per week
  - View current study hours allocation

### 3. Academic Subjects Management

- **Create Subjects**
  - Add new academic subjects
  - Specify subject name, code, credits, and color for visual identification

- **View Subjects**
  - List all enrolled subjects
  - View subject details

- **Edit Subjects**
  - Update subject information
  - Delete subjects (with confirmation)

### 4. Class Management

- **Create Classes**
  - Add recurring weekly classes
  - Specify subject, day of week, start time, end time, location
  - Set class type (lecture, tutorial, lab, seminar)

- **View Classes**
  - View weekly class schedule
  - Filter by subject or day

- **Edit Classes**
  - Update class details
  - Delete classes (with confirmation)

- **Conflict Detection**
  - Detect overlapping classes
  - Warn user when creating conflicting classes

### 5. Academic Tasks Management

- **Task Types**
  - Assignments
  - Quizzes
  - Projects
  - Exams

- **Create Tasks**
  - Add new tasks with:
    - Title
    - Subject
    - Type (assignment/quiz/project/exam)
    - Due date and time
    - Estimated completion time (hours)
    - Priority level (low/medium/high)
    - Description
    - Status (not started/in progress/completed)

- **View Tasks**
  - List all tasks
  - Filter by subject, type, status, due date
  - Sort by due date, priority, or estimated time

- **Edit Tasks**
  - Update task details
  - Mark tasks as completed
  - Delete tasks (with confirmation)

### 6. Workload Analysis

- **Seven-Day Workload View**
  - Display total workload for the next 7 days
  - Break down by:
    - Class hours
    - Study session hours
    - Task completion hours
  - Visual representation (charts or graphs)

- **Workload vs Available Hours Comparison**
  - Compare daily workload with available study hours
  - Highlight overloaded days
  - Show underutilized days

### 7. Task Prioritization

- **Priority Ranking**
  - Display explainable priority ranking of unfinished tasks
  - Ranking factors:
    - Due date proximity
    - Task type (exams > projects > assignments > quizzes)
    - Estimated completion time
    - User-set priority level
  - Explain why each task has its ranking

### 8. Study Sessions

- **Create Study Sessions**
  - Schedule study sessions for specific tasks
  - Specify:
    - Task to study for
    - Date and time
    - Duration
    - Location

- **View Study Sessions**
  - List upcoming study sessions
  - View in weekly calendar view

- **Edit Study Sessions**
  - Update session details
  - Cancel sessions
  - Mark sessions as completed

- **Conflict Detection**
  - Detect conflicts with classes
  - Detect conflicts with other study sessions
  - Warn user when creating conflicting sessions

### 9. Weekly Academic Review

- **Weekly Summary**
  - View completed tasks
  - View attended classes
  - View completed study sessions
  - Time spent on each subject

- **Performance Insights**
  - Compare planned vs actual study time
  - Identify patterns in productivity

## Non-Functional Requirements

### Clean Code Principles

- **Separation of Concerns**
  - HTML, CSS, and JavaScript in separate files
  - UI, data services, and business logic separated
  - No monolithic files

- **Code Quality**
  - Descriptive variable and function names
  - Beginner-readable code
  - No unnecessary abstractions
  - No duplicate functions
  - Minimal dependencies

- **Modularity**
  - Use JavaScript ES modules
  - Logical file organization
  - Clear module boundaries

### Performance

- Fast page loads
- Responsive UI
- Efficient database queries

### Usability

- Intuitive user interface
- Clear error messages
- Helpful feedback for user actions
- Mobile-responsive design

### Security

- Secure authentication via Supabase Auth
- Proper data validation
- Protection against common web vulnerabilities

## Data Requirements

### User Data

- Email
- Password (hashed by Supabase)
- Name
- University
- Program
- Study hours configuration (daily and weekly)

### Subject Data

- Subject ID
- Name
- Code
- Credits
- Color (for UI)
- User ID (foreign key)

### Class Data

- Class ID
- Subject ID (foreign key)
- Day of week
- Start time
- End time
- Location
- Type (lecture/tutorial/lab/seminar)
- User ID (foreign key)

### Task Data

- Task ID
- Title
- Subject ID (foreign key)
- Type (assignment/quiz/project/exam)
- Due date and time
- Estimated completion time (hours)
- Priority level (low/medium/high)
- Description
- Status (not started/in progress/completed)
- User ID (foreign key)

### Study Session Data

- Session ID
- Task ID (foreign key)
- Date and time
- Duration
- Location
- Status (scheduled/completed/cancelled)
- User ID (foreign key)

## Constraints

- The system must not automatically reschedule tasks
- The system must not decide what students should skip
- The system is a decision-support tool, not an automated scheduler
- All scheduling decisions are made by the student
