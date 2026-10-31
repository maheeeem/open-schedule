// Application initialization and UI management
import { initNavigation, navigateTo } from './navigation.js';
import { initProfileMenu } from './pages.js';

export function initApp() {
    console.log('Open Schedule application initialized');
    
    // Set current date
    setCurrentDate();
    
    // Initialize UI components
    initNavigation();
    initProfileMenu();
    
    // Load dashboard by default
    navigateTo('dashboard');
}

function setCurrentDate() {
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        const today = new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        currentDateElement.textContent = today;
    }
}
