// Application initialization and UI management
import { initNavigation, navigateTo, showLoginPage } from './navigation.js';
import { initProfileMenu } from './pages.js';
import { authService } from '../services/authService.js';
import { profileService } from '../services/profileService.js';

let currentUser = null;
let userProfile = null;

export async function initApp() {
    console.log('Open Schedule application initialized');
    
    // Set current date
    setCurrentDate();
    
    // Initialize UI components
    initNavigation();
    initProfileMenu();
    
    // Check authentication state
    try {
        await checkAuthState();
    } catch (error) {
        console.error('Error checking auth state:', error);
        // Fallback to login view on error
        showUnauthenticatedView();
    }
    
    // Listen for authentication state changes
    authService.onAuthStateChange((event, session) => {
        handleAuthStateChange(event, session);
    });
}

async function checkAuthState() {
    const session = await authService.getSession();
    
    if (session) {
        currentUser = session.user;
        await loadUserProfile();
        showAuthenticatedView();
    } else {
        showUnauthenticatedView();
    }
}

function handleAuthStateChange(event, session) {
    console.log('Auth state changed:', event);
    
    if (event === 'SIGNED_IN' && session) {
        currentUser = session.user;
        loadUserProfile().then(() => {
            showAuthenticatedView();
        });
    } else if (event === 'SIGNED_OUT') {
        currentUser = null;
        userProfile = null;
        showUnauthenticatedView();
    }
}

async function loadUserProfile() {
    if (!currentUser) return;
    
    const result = await profileService.getProfile(currentUser.id);
    
    if (result.success) {
        userProfile = result.data;
        console.log('Profile loaded:', userProfile);
        updateProfileDisplay();
    } else {
        console.error('Failed to load profile:', result.error);
    }
}

function showAuthenticatedView() {
    // Show sidebar and header
    const sidebar = document.querySelector('.app-sidebar');
    const header = document.querySelector('.app-header');
    const mainWrapper = document.querySelector('.app-main-wrapper');
    
    if (sidebar) sidebar.style.display = 'flex';
    if (header) header.style.display = 'block';
    if (mainWrapper) mainWrapper.style.marginLeft = '260px';
    
    // Load dashboard
    navigateTo('dashboard');
}

function showUnauthenticatedView() {
    // Hide sidebar and header
    const sidebar = document.querySelector('.app-sidebar');
    const header = document.querySelector('.app-header');
    const mainWrapper = document.querySelector('.app-main-wrapper');
    
    if (sidebar) sidebar.style.display = 'none';
    if (header) header.style.display = 'none';
    if (mainWrapper) mainWrapper.style.marginLeft = '0';
    
    // Show login page
    showLoginPage();
}

function updateProfileDisplay() {
    if (!userProfile) return;
    
    // Update profile avatar
    const profileAvatar = document.querySelector('.profile-avatar');
    if (profileAvatar) {
        const initials = userProfile.display_name
            .split(' ')
            .map(name => name[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
        profileAvatar.textContent = initials;
    }
    
    // Update profile dropdown
    const dropdownName = document.querySelector('.dropdown-name');
    const dropdownEmail = document.querySelector('.dropdown-email');
    
    if (dropdownName) dropdownName.textContent = userProfile.display_name;
    if (dropdownEmail) dropdownEmail.textContent = currentUser.email;
}

export function getCurrentUser() {
    return currentUser;
}

export function getUserProfile() {
    return userProfile;
}

export async function handleLogout() {
    const result = await authService.logout();
    
    if (result.success) {
        console.log('Logout successful');
    } else {
        console.error('Logout failed:', result.error);
    }
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
