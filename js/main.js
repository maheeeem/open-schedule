
import { supabase } from "./config/supabaseClient.js";
console.log("Supabase client initialized:", Boolean(supabase));

// Main entry point for Open Schedule application
import { initApp } from './ui/app.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await initApp();
    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
});
