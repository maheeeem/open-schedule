// Authentication service using Supabase Auth
import { supabase } from '../config/supabaseClient.js';

export const authService = {
    /**
     * Register a new student
     * @param {string} email - Student email
     * @param {string} password - Student password
     * @param {string} displayName - Student display name
     * @returns {Promise<Object>} Registration
     */
    async register(email, password, displayName) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        display_name: displayName
                    }
                }
            });

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /**
     * Login a student
     * @param {string} email - Student email
     * @param {string} password - Student password
     * @returns {Promise<Object>} Login
     */
    async login(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /**
     * Logout the current student
     * @returns {Promise<Object>} Logout
     */
    async logout() {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /**
     * Get the currently authenticated user
     * @returns {Promise<Object|null>} User object or null
     */
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                console.error('Error getting current user:', error);
                return null;
            }

            return user;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    },

    /**
     * Get the current session
     * @returns {Promise<Object|null>} Session object or null
     */
    async getSession() {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error) {
                console.error('Error getting session:', error);
                return null;
            }

            return session;
        } catch (error) {
            console.error('Error getting session:', error);
            return null;
        }
    },

    /**
     * Listen for authentication state changes
     * @param {Function} callback - Callback function with (event, session)
     * @returns {Object} Subscription object
     */
    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange(callback);
    }
};
