const { createClient } = require("@supabase/supabase-js");

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://nisfujowurqlqozclvjx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pc2Z1am93dXJxbHFvemNsdmp4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTkzMzcyNCwiZXhwIjoyMDQ1NTA5NzI0fQ.cCoqkQuxAs8XwdoMer86bF4GqTupGbzX-WQdAaICLPM"
);

module.exports = supabase;
