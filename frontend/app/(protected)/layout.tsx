import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect("/auth/signin")
  return <>{children}</>
}


