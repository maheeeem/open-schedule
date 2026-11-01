// Subject service for database operations
import { supabase } from '../config/supabaseClient.js';
import { getCurrentUser } from '../ui/app.js';

export const subjectService = {
    /**
     * Get all subjects for the current user
     * @param {Object} filters - Optional filters (search, status)
     * @returns {Promise<Object>} { success: boolean, data: Array, error: string }
     */
    async getSubjects(filters = {}) {
        try {
            const currentUser = getCurrentUser();
            if (!currentUser) {
                return { success: false, error: 'User not authenticated' };
            }

            let query = supabase
                .from('subjects')
                .select('*')
                .eq('user_id', currentUser.id);

            // Apply status filter
            if (filters.status === 'active') {
                query = query.eq('is_active', true);
            } else if (filters.status === 'archived') {
                query = query.eq('is_active', false);
            }

            // Apply search filter
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                query = query.or(`subject_name.ilike.%${searchTerm}%,course_code.ilike.%${searchTerm}%`);
            }

            const { data, error } = await query.order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching subjects:', error);
                return { success: false, error: error.message };
            }

            return { success: true, data: data || [] };
        } catch (error) {
            console.error('Error fetching subjects:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * new part added
     * Get a single subject by ID
     * @param {string} subjectId - Subject ID
     * @returns {Promise<Object>} { success: boolean, data: Object, error: string }
     */
    async getSubjectById(subjectId) {
        try {
            const currentUser = getCurrentUser();
            if (!currentUser) {
                return { success: false, error: 'User not authenticated' };
            }

            const { data, error } = await supabase
                .from('subjects')
                .select('*')
                .eq('id', subjectId)
                .eq('user_id', currentUser.id)
                .single();

            if (error) {
                console.error('Error fetching subject:', error);
                return { success: false, error: error.message };
            }

            return { success: true, data };
        } catch (error) {
            console.error('Error fetching subject:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Create a new subject
     * @param {Object} subjectData - Subject data (subject_name, course_code)
     * @returns {Promise<Object>} { success: boolean, data: Object, error: string }
     */
    async createSubject(subjectData) {
        try {
            const currentUser = getCurrentUser();
            if (!currentUser) {
                return { success: false, error: 'User not authenticated' };
            }

            // Check for duplicate course code if provided
            if (subjectData.course_code && subjectData.course_code.trim()) {
                const { data: existing, error: checkError } = await supabase
                    .from('subjects')
                    .select('id')
                    .eq('user_id', currentUser.id)
                    .eq('course_code', subjectData.course_code.trim())
                    .eq('is_active', true)
                    .single();

                if (existing) {
                    return { success: false, error: 'A subject with this course code already exists' };
                }
            }

            const newSubject = {
                user_id: currentUser.id,
                subject_name: subjectData.subject_name.trim(),
                course_code: subjectData.course_code ? subjectData.course_code.trim() : null,
                is_active: true
            };

            const { data, error } = await supabase
                .from('subjects')
                .insert(newSubject)
                .select()
                .single();

            if (error) {
                console.error('Error creating subject:', error);
                return { success: false, error: error.message };
            }

            return { success: true, data };
        } catch (error) {
            console.error('Error creating subject:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Update an existing subject
     * @param {string} subjectId - Subject ID
     * @param {Object} subjectData - Updated subject data
     * @returns {Promise<Object>} { success: boolean, data: Object, error: string }
     */
    async updateSubject(subjectId, subjectData) {
        try {
            const currentUser = getCurrentUser();
            if (!currentUser) {
                return { success: false, error: 'User not authenticated' };
            }

            // Check for duplicate course code if provided and changed
            if (subjectData.course_code && subjectData.course_code.trim()) {
                const { data: existing, error: checkError } = await supabase
                    .from('subjects')
                    .select('id')
                    .eq('user_id', currentUser.id)
                    .eq('course_code', subjectData.course_code.trim())
                    .eq('is_active', true)
                    .neq('id', subjectId)
                    .single();

                if (existing) {
                    return { success: false, error: 'A subject with this course code already exists' };
                }
            }

            const updateData = {};
            if (subjectData.subject_name !== undefined) {
                updateData.subject_name = subjectData.subject_name.trim();
            }
            if (subjectData.course_code !== undefined) {
                updateData.course_code = subjectData.course_code ? subjectData.course_code.trim() : null;
            }

            const { data, error } = await supabase
                .from('subjects')
                .update(updateData)
                .eq('id', subjectId)
                .eq('user_id', currentUser.id)
                .select()
                .single();

            if (error) {
                console.error('Error updating subject:', error);
                return { success: false, error: error.message };
            }

            return { success: true, data };
        } catch (error) {
            console.error('Error updating subject:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Archive a subject (soft delete)
     * @param {string} subjectId - Subject ID
     * @returns {Promise<Object>} { success: boolean, error: string }
     */
    async archiveSubject(subjectId) {
        try {
            const currentUser = getCurrentUser();
            if (!currentUser) {
                return { success: false, error: 'User not authenticated' };
            }

            const { error } = await supabase
                .from('subjects')
                .update({ is_active: false })
                .eq('id', subjectId)
                .eq('user_id', currentUser.id);

            if (error) {
                console.error('Error archiving subject:', error);
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch (error) {
            console.error('Error archiving subject:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Restore an archived subject
     * @param {string} subjectId - Subject ID
     * @returns {Promise<Object>} { success: boolean, error: string }
     */
    async restoreSubject(subjectId) {
        try {
            const currentUser = getCurrentUser();
            if (!currentUser) {
                return { success: false, error: 'User not authenticated' };
            }

            // Check for duplicate course code if restoring
            const subject = await this.getSubjectById(subjectId);
            if (subject.success && subject.data.course_code) {
                const { data: existing } = await supabase
                    .from('subjects')
                    .select('id')
                    .eq('user_id', currentUser.id)
                    .eq('course_code', subject.data.course_code)
                    .eq('is_active', true)
                    .neq('id', subjectId)
                    .single();

                if (existing) {
                    return { success: false, error: 'A subject with this course code already exists' };
                }
            }

            const { error } = await supabase
                .from('subjects')
                .update({ is_active: true })
                .eq('id', subjectId)
                .eq('user_id', currentUser.id);

            if (error) {
                console.error('Error restoring subject:', error);
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch (error) {
            console.error('Error restoring subject:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Permanently delete a subject
     * @param {string} subjectId - Subject ID
     * @returns {Promise<Object>} { success: boolean, error: string }
     */
    async deleteSubject(subjectId) {
        try {
            const currentUser = getCurrentUser();
            if (!currentUser) {
                return { success: false, error: 'User not authenticated' };
            }

            // Check for associated records (tasks, classes)
            // This assumes there are tasks and classes tables with subject_id foreign key
            // If these tables don't exist yet, we'll skip this check
            
            const { error } = await supabase
                .from('subjects')
                .delete()
                .eq('id', subjectId)
                .eq('user_id', currentUser.id);

            if (error) {
                console.error('Error deleting subject:', error);
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch (error) {
            console.error('Error deleting subject:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Check if a subject has associated records
     * @param {string} subjectId - Subject ID
     * @returns {Promise<Object>} { success: boolean, hasRecords: boolean, error: string }
     */
    async hasAssociatedRecords(subjectId) {
        try {
            const currentUser = getCurrentUser();
            if (!currentUser) {
                return { success: false, error: 'User not authenticated' };
            }

            // Check for tasks (if table exists)
            let hasTasks = false;
            try {
                const { data: tasks, error: tasksError } = await supabase
                    .from('tasks')
                    .select('id')
                    .eq('subject_id', subjectId)
                    .eq('user_id', currentUser.id)
                    .limit(1);
                
                if (!tasksError && tasks && tasks.length > 0) {
                    hasTasks = true;
                }
            } catch (e) {
                // Tasks table might not exist yet, ignore
            }

            // Check for classes (if table exists)
            let hasClasses = false;
            try {
                const { data: classes, error: classesError } = await supabase
                    .from('classes')
                    .select('id')
                    .eq('subject_id', subjectId)
                    .eq('user_id', currentUser.id)
                    .limit(1);
                
                if (!classesError && classes && classes.length > 0) {
                    hasClasses = true;
                }
            } catch (e) {
                // Classes table might not exist yet, ignore
            }

            return { 
                success: true, 
                hasRecords: hasTasks || hasClasses,
                hasTasks,
                hasClasses
            };
        } catch (error) {
            console.error('Error checking associated records:', error);
            return { success: false, error: error.message };
        }
    }
};
