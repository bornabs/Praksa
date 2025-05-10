import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tklacpghuypvbertalyx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrbGFjcGdodXlwdmJlcnRhbHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MDE1ODMsImV4cCI6MjA2MjM3NzU4M30.8ibcYGQG69rnr9FxdBceR6772hhz6z2lx52d5Xm_HMM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);