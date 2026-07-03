import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// True once NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set
// in .env.local. Lets pages fall back to mock data until the project is wired.
export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  )
}

// For use in Server Components, Server Functions and Route Handlers.
// cookies() is async in this Next.js version, so this factory is too.
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Called from a Server Component, where cookies cannot be written.
            // Safe to ignore as long as proxy.ts refreshes sessions.
          }
        },
      },
    },
  )
}
