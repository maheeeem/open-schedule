// Profile service for fetching and managing student profiles
import { supabase } from '../config/supabaseClient.js';

export const profileService = {
    /**
     * Fetch the current student's profile from PostgreSQL
     * @param {string} userId - The authenticated user's ID
     * @returns {Promise<Object>} Profile data or error
     */
    async getProfile(userId) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
                return { success: false, error: error.message };
            }

            return { success: true, data };
        } catch (error) {
            console.error('Error fetching profile:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Update the current student's profile
     * @param {string} userId - The authenticated user's ID
     * @param {Object} updates - Profile fields to update
     * @returns {Promise<Object>} Update result
     */
    async updateProfile(userId, updates) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('user_id', userId)
                .select()
                .single();

            if (error) {
                console.error('Error updating profile:', error);
                return { success: false, error: error.message };
            }

            return { success: true, data };
        } catch (error) {
            console.error('Error updating profile:', error);
            return { success: false, error: error.message };
        }
    }
};
