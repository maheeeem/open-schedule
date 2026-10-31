// Authentication service (placeholder for Supabase integration)

export const authService = {
    async register(email, password, userData) {
        console.log('Register:', email, userData);
        // Supabase auth registration will be implemented here
    },

    async login(email, password) {
        console.log('Login:', email);
        // Supabase auth login will be implemented here
    },

    async logout() {
        console.log('Logout');
        // Supabase auth logout will be implemented here
    },

    async getCurrentUser() {
        console.log('Get current user');
        // Supabase get current user will be implemented here
    }
};
