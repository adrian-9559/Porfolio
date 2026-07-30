"use client";
import { useState } from "react";
import {
  BlogH2,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogUl,
  BlogLi,
  BlogCallout,
} from "@/components/blog/shared";

function ExerciseCard({
  num,
  title,
  level,
  description,
  hint,
  solution,
}: {
  num: number;
  title: string;
  level: "Easy" | "Intermediate" | "Hard";
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    Easy: "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermediate: "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Hard: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
  }[level];

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{num}</span>
          <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">{title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor}`}>{level}</span>
          <span className="text-[#aeaeb2] text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
          <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">{description}</p>
          {hint && (
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl px-3 py-2 text-xs text-blue-800 dark:text-blue-300">
              <strong>Hint:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
        </div>
      )}
    </div>
  );
}

export default function SupabaseGuideContentEn() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366] mb-4">
        <span className="flex items-center gap-1">
          <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
          Tutorial
        </span>
        <span className="w-1 h-1 rounded-full bg-[#aeaeb2]" />
        <span className="flex items-center gap-1">
          <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
          10 min
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3" style={{ letterSpacing: "-0.03em" }}>
        Supabase: Backend as a Service with PostgreSQL
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Supabase is the open-source alternative to Firebase. It combines PostgreSQL, Auth, Realtime, Storage, and Edge Functions in one unified platform. A complete backend without managing servers.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="what-is">What is Supabase?</BlogH2>

      <BlogP>
        Launched in 2020, Supabase gives you a complete backend powered by PostgreSQL. Every project is a dedicated PostgreSQL instance with automatic REST and GraphQL APIs, authentication, real-time subscriptions, file storage, and serverless functions.
      </BlogP>

      <BlogCallout type="info">
        Unlike Firebase (which uses NoSQL), Supabase uses PostgreSQL with Row Level Security. This means you get all the advantages of SQL — JOINs, transactions, migrations — combined with row-level security.
      </BlogCallout>

      <BlogH2 id="create-project">Creating a Project</BlogH2>

      <BlogP>
        1. Go to <BlogInlineCode>supabase.com</BlogInlineCode> and login with GitHub.
      </BlogP>
      <BlogP>
        2. "New project" → name, secure password (save it), region (e.g. <BlogInlineCode>eu-west-1</BlogInlineCode> for Europe).
      </BlogP>
      <BlogP>
        3. You get two keys: <BlogInlineCode>SUPABASE_URL</BlogInlineCode> (https://your-project.supabase.co) and <BlogInlineCode>SUPABASE_ANON_KEY</BlogInlineCode> (public API key).
      </BlogP>

      <BlogH2 id="database">Database: Table Editor & SQL Editor</BlogH2>

      <BlogP>You can create tables visually with the Table Editor or directly with SQL:</BlogP>

      <BlogCode>{`-- SQL Editor inside the Supabase dashboard
CREATE TABLE tasks (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Policy: each user sees only their own tasks
CREATE POLICY "Users see only their tasks"
  ON tasks FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: each user creates their own tasks
CREATE POLICY "Users create their tasks"
  ON tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);`}</BlogCode>

      <BlogCallout type="warn">
        Without RLS policies, anyone with the anon key can read and write the entire table. RLS is mandatory for sensitive data.
      </BlogCallout>

      <BlogH2 id="auth">Auth</BlogH2>

      <BlogP>Supabase Auth handles registration, login, magic links, OAuth (Google, GitHub, Apple, etc.) and sessions with JWT:</BlogP>

      <BlogCode>{`import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'ana@email.com',
  password: 'my-secure-password'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'ana@email.com',
  password: 'my-secure-password'
})

// Get current session
const { data: { session } } = await supabase.auth.getSession()
console.log(session.user.id) // The user_id used by RLS`}</BlogCode>

      <BlogP>RLS policies use <BlogInlineCode>auth.uid()</BlogInlineCode> automatically to identify the authenticated user. You do not need to pass the ID manually.</BlogP>

      <BlogH2 id="realtime">Realtime</BlogH2>

      <BlogP>Subscribe to changes in any PostgreSQL table via WebSockets. When someone inserts, updates, or deletes a row, all connected clients receive the change instantly:</BlogP>

      <BlogCode>{`const channel = supabase
  .channel('tasks_realtime')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'tasks' },
    (payload) => {
      console.log('Change received:', payload)
      // payload.new → new data
      // payload.old → old data
      // payload.eventType → INSERT / UPDATE / DELETE
    }
  )
  .subscribe()`}</BlogCode>

      <BlogP>To use Realtime, enable it from the Supabase UI: Database → Replication → select the table.</BlogP>

      <BlogH2 id="storage">Storage</BlogH2>

      <BlogP>Upload files to buckets with access policies also managed via RLS:</BlogP>

      <BlogCode>{`// Upload file
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('public/ana.jpg', file)

// Get public URL
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('public/ana.jpg')`}</BlogCode>

      <BlogP>Storage policies are written in SQL just like table policies:</BlogP>

      <BlogCode>{`CREATE POLICY "Each user uploads their own files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid() = owner);`}</BlogCode>

      <BlogH2 id="edge-functions">Edge Functions</BlogH2>

      <BlogP>Serverless functions written in Deno / TypeScript. Deploy them with the Supabase CLI:</BlogP>

      <BlogCode>{`# Install CLI
brew install supabase/tap/supabase

# Create function
supabase functions new my-webhook

# Deploy
supabase functions deploy my-webhook`}</BlogCode>

      <BlogP>
        Ideal for webhooks, image processing, external API integrations, and logic you do not want on the client.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="exercises">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard num={1} title="Create table with SQL Editor" level="Easy" description="Create a 'notes' table with id (auto-increment), title, content, user_id (UUID), and created_at. Enable RLS." hint="Use GENERATED ALWAYS AS IDENTITY and REFERENCES auth.users(id)." solution={`CREATE TABLE notes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;`} />

        <ExerciseCard num={2} title="RLS SELECT policy" level="Easy" description="Create an RLS policy so each user can only SELECT their own notes." hint="Use auth.uid() in the USING condition." solution={`CREATE POLICY "Users see their notes"
  ON notes FOR SELECT
  USING (auth.uid() = user_id);`} />

        <ExerciseCard num={3} title="Auth: sign up + sign in" level="Intermediate" description="Write the client code to register a new user with email and password, then sign in." hint="Use supabase.auth.signUp and signInWithPassword." solution={`const { data, error } = await supabase.auth.signUp({
  email: 'test@email.com',
  password: 'password123'
});

const { data: loginData } = await supabase.auth.signInWithPassword({
  email: 'test@email.com',
  password: 'password123'
});`} />

        <ExerciseCard num={4} title="Realtime: subscribe to changes" level="Intermediate" description="Subscribe to changes in the 'notes' table and log each new insert to the console." hint="Use channel + on('postgres_changes', { event: 'INSERT' })." solution={`const channel = supabase
  .channel('notes_realtime')
  .on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'notes' },
    (payload) => console.log('New note:', payload.new)
  )
  .subscribe();`} />

        <ExerciseCard num={5} title="Basic Edge Function" level="Hard" description="Create an Edge Function that receives a userId parameter and returns the note count for that user." hint="Use Deno + supabase-js inside the function. Connect with service_role key." solution={`import { createClient } from "jsr:@supabase/supabase-js@2"

Deno.serve(async (req) => {
  const { userId } = await req.json()
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )
  const { count } = await supabase
    .from("notes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
  return new Response(JSON.stringify({ count }), { headers: { "Content-Type": "application/json" } })
})`} />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Supabase is ideal for projects that need a full backend without managing servers. The combination of PostgreSQL + RLS + Realtime makes it especially powerful for real-time applications like chats, dashboards, and collaborative tools.
      </BlogP>
    </article>
  );
}