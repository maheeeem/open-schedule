# Open Schedule

Academic Workload and Study-Scheduling System

## Overview

Open Schedule is a university project that helps students manage their academic workload and study schedules. It is a decision-support tool that provides insights and recommendations without automatically rescheduling tasks.

## Technology Stack

- **HTML5** - Markup
- **CSS3** - Styling
- **Vanilla JavaScript (ES modules)** - Frontend logic
- **Supabase Auth** - Authentication
- **Supabase PostgreSQL** - Database
- **Supabase JavaScript client** - Database client

**Excluded technologies:** React, Angular, Vue, Next.js, TypeScript, Tailwind CSS, Java Spring Boot backend

## Features

Students can:

- Register, log in and log out
- Manage their profile and available study hours
- Manage academic subjects
- Manage recurring weekly classes
- Manage assignments, quizzes, projects and exams
- Analyse their seven-day academic workload
- Compare workload with available study hours
- View an explainable priority ranking of unfinished tasks
- Create, update and cancel study sessions
- Detect class and study-session conflicts
- View a weekly academic review

## Architecture

The project follows a clean-code architecture with separation of concerns:

```
open-schedule/
├── css/              # Stylesheets
├── js/
│   ├── ui/           # UI components and DOM manipulation
│   ├── services/     # Data services (Supabase interactions)
│   ├── logic/        # Business logic and calculations
│   └── utils/        # Utility functions
├── supabase/
│   └── migrations/   # Database migration files
├── tests/            # Test files
├── docs/             # Documentation
└── index.html        # Main entry point
```

## How to Run

1. Clone the repository
2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari)
3. The application will load with ES modules support

Note: Supabase configuration is not yet set up. Authentication and database features will be available after Supabase setup.

## Development Status

See [docs/progress-log.md](docs/progress-log.md) for detailed development progress.

## Requirements

See [docs/requirements.md](docs/requirements.md) for detailed project requirements.
