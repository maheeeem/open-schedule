// Navigation module for page switching and active state management

let currentPage = 'dashboard';

export function initNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-nav-link');
    const dropdownItems = document.querySelectorAll('.dropdown-item[data-page]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            navigateTo(page);
        });
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const page = item.getAttribute('data-page');
            navigateTo(page);
            closeProfileDropdown();
        });
    });
}

export function navigateTo(page) {
    if (page === currentPage) return;
    
    currentPage = page;
    updateActiveState(page);
    updatePageTitle(page);
    loadPageContent(page);
}

function updateActiveState(page) {
    const navLinks = document.querySelectorAll('.sidebar-nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function updatePageTitle(page) {
    const pageTitle = document.getElementById('pageTitle');
    const titles = {
        'dashboard': 'Dashboard',
        'subjects': 'Subjects',
        'tasks': 'Academic Tasks',
        'timetable': 'Class Timetable',
        'study-sessions': 'Study Sessions',
        'weekly-review': 'Weekly Review',
        'profile': 'Profile & Settings'
    };
    
    if (pageTitle && titles[page]) {
        pageTitle.textContent = titles[page];
    }
}

function loadPageContent(page) {
    const pageContent = document.getElementById('pageContent');
    
    // Dynamic import based on page
    switch (page) {
        case 'dashboard':
            import('./pages/dashboard.js').then(module => {
                pageContent.innerHTML = module.renderDashboard();
            });
            break;
        case 'subjects':
            import('./pages/subjects.js').then(module => {
                pageContent.innerHTML = module.renderSubjects();
            });
            break;
        case 'tasks':
            import('./pages/tasks.js').then(module => {
                pageContent.innerHTML = module.renderTasks();
            });
            break;
        case 'timetable':
            import('./pages/timetable.js').then(module => {
                pageContent.innerHTML = module.renderTimetable();
            });
            break;
        case 'study-sessions':
            import('./pages/study-sessions.js').then(module => {
                pageContent.innerHTML = module.renderStudySessions();
            });
            break;
        case 'weekly-review':
            import('./pages/weekly-review.js').then(module => {
                pageContent.innerHTML = module.renderWeeklyReview();
            });
            break;
        case 'profile':
            import('./pages/profile.js').then(module => {
                pageContent.innerHTML = module.renderProfile();
            });
            break;
        default:
            pageContent.innerHTML = '<p>Page not found</p>';
    }
}

export function getCurrentPage() {
    return currentPage;
}
