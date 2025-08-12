"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import GoogleAuthGate from "@/components/auth/google-auth-gate"

export default function AuthCallback() {
  const router = useRouter()
  const [showGate, setShowGate] = useState(false)

  useEffect(() => {
    ;(async () => {
      const supabase = createClientComponentClient({
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      })
      try {
        await supabase.auth.exchangeCodeForSession(window.location.href)
      } catch {}
      // Probe profile; if missing, trigger gate
      try {
        const res = await fetch("/api/profile", { cache: "no-store" })
        if (res.status === 404) {
          setShowGate(true)
          return
        }
      } catch {}
      router.replace("/dashboard")
    })()
  }, [router])

  return showGate ? (
    <GoogleAuthGate open={true} onClose={() => router.replace("/dashboard")} />
  ) : (
    <p className="p-6 text-center">Signing you in…</p>
  )
}


