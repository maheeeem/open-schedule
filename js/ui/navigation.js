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

    // Listen for custom auth navigation events
    document.addEventListener('navigateToLogin', () => {
        showLoginPage();
    });

    document.addEventListener('navigateToRegister', () => {
        showRegisterPage();
    });
}

export function navigateTo(page) {
    if (page === currentPage) return;
    
    currentPage = page;
    updateActiveState(page);
    updatePageTitle(page);
    loadPageContent(page);
}

export function showLoginPage() {
    currentPage = 'login';
    const pageContent = document.getElementById('pageContent');
    
    import('./pages/auth/login.js').then(module => {
        pageContent.innerHTML = module.renderLogin();
        module.initLoginForm();
    }).catch(error => {
        console.error('Failed to load login page:', error);
        pageContent.innerHTML = '<p>Error loading login page. Please refresh.</p>';
    });
}

export function showRegisterPage() {
    currentPage = 'register';
    const pageContent = document.getElementById('pageContent');
    
    import('./pages/auth/register.js').then(module => {
        pageContent.innerHTML = module.renderRegister();
        module.initRegisterForm();
    }).catch(error => {
        console.error('Failed to load register page:', error);
        pageContent.innerHTML = '<p>Error loading register page. Please refresh.</p>';
    });
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
                module.initSubjectsPage();
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
                module.initProfilePage();
            });
            break;
        default:
            pageContent.innerHTML = '<p>Page not found</p>';
    }
}

export function getCurrentPage() {
    return currentPage;
}
