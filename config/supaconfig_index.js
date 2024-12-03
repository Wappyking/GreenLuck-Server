const { createClient } = require("@supabase/supabase-js");

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://nisfujowurqlqozclvjx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pc2Z1am93dXJxbHFvemNsdmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5MzM3MjQsImV4cCI6MjA0NTUwOTcyNH0.XKkGp571toHwkbc3b3HHrje1kPA-enQeewn9daskd08"
);

module.exports = supabase;
