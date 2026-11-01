// Registration page rendering module
import { authService } from '../../../services/authService.js';
import { validation } from '../../../utils/validation.js';

export function renderRegister() {
    return `
        <div class="auth-container">
            <div class="auth-card">
                <div class="auth-header">
                    <h1 class="auth-title">Create Account</h1>
                    <p class="auth-subtitle">Register to manage your academic schedule</p>
                </div>
                
                <form id="registerForm" class="auth-form" novalidate>
                    <div class="form-group">
                        <label class="form-label" for="registerDisplayName">Display Name</label>
                        <input 
                            type="text" 
                            id="registerDisplayName" 
                            class="form-input" 
                            placeholder="Alex Johnson"
                            required
                        >
                        <div id="displayNameError" class="form-error" style="display: none;"></div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="registerEmail">Email</label>
                        <input 
                            type="email" 
                            id="registerEmail" 
                            class="form-input" 
                            placeholder="your.email@university.edu"
                            required
                        >
                        <div id="emailError" class="form-error" style="display: none;"></div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="registerPassword">Password</label>
                        <input 
                            type="password" 
                            id="registerPassword" 
                            class="form-input" 
                            placeholder="Create a strong password"
                            required
                        >
                        <div id="passwordRequirements" style="margin-top: 8px; font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                            <p style="margin-bottom: 4px; font-weight: 600;">Password must contain:</p>
                            <ul style="margin: 0; padding-left: 20px;">
                                <li id="reqLength" style="color: var(--color-error);">✗ At least 8 characters</li>
                                <li id="reqUppercase" style="color: var(--color-error);">✗ At least one uppercase letter (A-Z)</li>
                                <li id="reqLowercase" style="color: var(--color-error);">✗ At least one lowercase letter (a-z)</li>
                                <li id="reqNumber" style="color: var(--color-error);">✗ At least one number (0-9)</li>
                                <li id="reqSpecial" style="color: var(--color-error);">✗ At least one special character (!@#$%^&*())</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="registerConfirmPassword">Confirm Password</label>
                        <input 
                            type="password" 
                            id="registerConfirmPassword" 
                            class="form-input" 
                            placeholder="Confirm your password"
                            required
                        >
                        <div id="confirmPasswordError" class="form-error" style="display: none;"></div>
                    </div>
                    
                    <div id="registerError" class="form-error" style="display: none;"></div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%;" id="registerBtn" disabled>
                        <span class="btn-text">Create Account</span>
                        <span class="btn-loading" style="display: none;">
                            <span class="spinner" style="width: 16px; height: 16px; margin-right: 8px;"></span>
                            Creating account...
                        </span>
                    </button>
                </form>
                
                <div class="auth-footer">
                    <p class="auth-footer-text">
                        Already have an account? 
                        <a href="#" class="auth-link" id="goToLogin">Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    `;
}

export function initRegisterForm() {
    const form = document.getElementById('registerForm');
    const displayNameInput = document.getElementById('registerDisplayName');
    const emailInput = document.getElementById('registerEmail');
    const passwordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('registerConfirmPassword');
    const emailErrorDiv = document.getElementById('emailError');
    const confirmPasswordErrorDiv = document.getElementById('confirmPasswordError');
    const errorDiv = document.getElementById('registerError');
    const registerBtn = document.getElementById('registerBtn');
    const btnText = registerBtn.querySelector('.btn-text');
    const btnLoading = registerBtn.querySelector('.btn-loading');
    const goToLoginLink = document.getElementById('goToLogin');

    // Password requirement elements
    const reqLength = document.getElementById('reqLength');
    const reqUppercase = document.getElementById('reqUppercase');
    const reqLowercase = document.getElementById('reqLowercase');
    const reqNumber = document.getElementById('reqNumber');
    const reqSpecial = document.getElementById('reqSpecial');

    // Real-time email validation
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            const result = validation.validateEmail(email);
            
            if (!result.valid) {
                emailErrorDiv.textContent = result.error;
                emailErrorDiv.style.display = 'block';
                emailInput.style.borderColor = 'var(--color-error)';
            } else {
                emailErrorDiv.style.display = 'none';
                emailInput.style.borderColor = 'var(--color-border)';
            }
            
            validateForm();
        });

        emailInput.addEventListener('input', () => {
            if (emailErrorDiv.style.display === 'block') {
                const email = emailInput.value.trim();
                const result = validation.validateEmail(email);
                
                if (result.valid) {
                    emailErrorDiv.style.display = 'none';
                    emailInput.style.borderColor = 'var(--color-border)';
                }
            }
            validateForm();
        });
    }

    // Real-time password validation
    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            
            // Update requirement indicators
            updatePasswordRequirement(reqLength, validation.isPasswordLengthValid(password));
            updatePasswordRequirement(reqUppercase, validation.hasUppercase(password));
            updatePasswordRequirement(reqLowercase, validation.hasLowercase(password));
            updatePasswordRequirement(reqNumber, validation.hasNumber(password));
            updatePasswordRequirement(reqSpecial, validation.hasSpecialCharacter(password));
            
            // Also validate confirmation if it has a value
            if (confirmPasswordInput.value) {
                const confirmResult = validation.validatePasswordConfirmation(password, confirmPasswordInput.value);
                if (!confirmResult.valid) {
                    confirmPasswordErrorDiv.textContent = confirmResult.error;
                    confirmPasswordErrorDiv.style.display = 'block';
                } else {
                    confirmPasswordErrorDiv.style.display = 'none';
                }
            }
            
            validateForm();
        });
    }

    // Real-time password confirmation validation
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            const result = validation.validatePasswordConfirmation(password, confirmPassword);
            
            if (!result.valid && confirmPassword) {
                confirmPasswordErrorDiv.textContent = result.error;
                confirmPasswordErrorDiv.style.display = 'block';
                confirmPasswordInput.style.borderColor = 'var(--color-error)';
            } else {
                confirmPasswordErrorDiv.style.display = 'none';
                confirmPasswordInput.style.borderColor = 'var(--color-border)';
            }
            
            validateForm();
        });
    }

    // Display name validation
    if (displayNameInput) {
        displayNameInput.addEventListener('input', validateForm);
    }

    function updatePasswordRequirement(element, isValid) {
        if (element) {
            element.style.color = isValid ? 'var(--color-success)' : 'var(--color-error)';
        }
    }

    function validateForm() {
        const displayName = displayNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        const emailValid = validation.validateEmail(email).valid;
        const passwordValid = validation.validatePassword(password).valid;
        const confirmValid = validation.validatePasswordConfirmation(password, confirmPassword).valid;
        const displayNameValid = displayName.length > 0;

        registerBtn.disabled = !(displayNameValid && emailValid && passwordValid && confirmValid);
    }

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const displayName = displayNameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            // Validation
            const emailResult = validation.validateEmail(email);
            if (!emailResult.valid) {
                showError(emailResult.error);
                return;
            }
            
            const passwordResult = validation.validatePassword(password);
            if (!passwordResult.valid) {
                showError(passwordResult.error);
                return;
            }
            
            const confirmResult = validation.validatePasswordConfirmation(password, confirmPassword);
            if (!confirmResult.valid) {
                showError(confirmResult.error);
                return;
            }
            
            if (!displayName) {
                showError('Display name is required');
                return;
            }
            
            // Show loading state
            registerBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            errorDiv.style.display = 'none';
            
            // Attempt registration
            const result = await authService.register(email, password, displayName);
            
            // Reset button state
            registerBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            
            if (result.success) {
                // Auth state change will trigger app.js to show dashboard
                console.log('Registration successful');
                errorDiv.style.display = 'block';
                errorDiv.style.color = 'var(--color-success)';
                errorDiv.textContent = 'Account created successfully! You can now sign in.';
                
                // Switch to login after 2 seconds
                setTimeout(() => {
                    const loginEvent = new CustomEvent('navigateToLogin');
                    document.dispatchEvent(loginEvent);
                }, 2000);
            } else {
                showError(result.error || 'Registration failed. Please try again.');
            }
        });
    }

    if (goToLoginLink) {
        goToLoginLink.addEventListener('click', (event) => {
            event.preventDefault();
            // Trigger navigation to login page
            const navigationEvent = new CustomEvent('navigateToLogin');
            document.dispatchEvent(navigationEvent);
        });
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--color-error)';
        errorDiv.style.display = 'block';
    }
}
