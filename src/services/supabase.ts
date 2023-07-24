import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://bzirqgtvynhvojxeplnd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6aXJxZ3R2eW5odm9qeGVwbG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwNDMyMzksImV4cCI6MjAwNTYxOTIzOX0.EL_CazP3L7soW5ApQtd-lRpcBYnlclgJvpuCXqGLDKc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
