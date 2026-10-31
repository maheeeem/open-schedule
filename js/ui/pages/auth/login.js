// Login page rendering module
import { authService } from '../../../services/authService.js';

export function renderLogin() {
    return `
        <div class="auth-container">
            <div class="auth-card">
                <div class="auth-header">
                    <h1 class="auth-title">Welcome Back</h1>
                    <p class="auth-subtitle">Sign in to access your academic schedule</p>
                </div>
                
                <form id="loginForm" class="auth-form">
                    <div class="form-group">
                        <label class="form-label" for="loginEmail">Email</label>
                        <input 
                            type="email" 
                            id="loginEmail" 
                            class="form-input" 
                            placeholder="your.email@university.edu"
                            required
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="loginPassword">Password</label>
                        <input 
                            type="password" 
                            id="loginPassword" 
                            class="form-input" 
                            placeholder="Enter your password"
                            required
                        >
                    </div>
                    
                    <div id="loginError" class="form-error" style="display: none;"></div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%;" id="loginBtn">
                        <span class="btn-text">Sign In</span>
                        <span class="btn-loading" style="display: none;">
                            <span class="spinner" style="width: 16px; height: 16px; margin-right: 8px;"></span>
                            Signing in...
                        </span>
                    </button>
                </form>
                
                <div class="auth-footer">
                    <p class="auth-footer-text">
                        Don't have an account? 
                        <a href="#" class="auth-link" id="goToRegister">Register</a>
                    </p>
                </div>
            </div>
        </div>
    `;
}

export function initLoginForm() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const errorDiv = document.getElementById('loginError');
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoading = loginBtn.querySelector('.btn-loading');
    const goToRegisterLink = document.getElementById('goToRegister');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            
            if (!email || !password) {
                showError('Please fill in all fields');
                return;
            }
            
            // Show loading state
            loginBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            errorDiv.style.display = 'none';
            
            // Attempt login
            const result = await authService.login(email, password);
            
            // Reset button state
            loginBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            
            if (result.success) {
                // Auth state change will trigger app.js to show dashboard
                console.log('Login successful');
            } else {
                showError(result.error || 'Login failed. Please try again.');
            }
        });
    }

    if (goToRegisterLink) {
        goToRegisterLink.addEventListener('click', (event) => {
            event.preventDefault();

            // Trigger navigation to register page
            const navigationEvent = new CustomEvent('navigateToRegister');
            document.dispatchEvent(navigationEvent);
        });
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}
