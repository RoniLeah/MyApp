import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://bwfqsfqtvmfjobuspsvq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3ZnFzZnF0dm1mam9idXNwc3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjc3MDksImV4cCI6MjA3MTcwMzcwOX0.RMI8b88eAyMsbWIFBM0iDw_aX9k6mT9wKBgVJeUE4hU';

export const supabase = createClient(supabaseUrl, supabaseKey);