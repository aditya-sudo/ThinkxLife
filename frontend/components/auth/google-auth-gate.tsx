"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, Eye, EyeOff } from "lucide-react"

interface Props {
  open: boolean
  onClose: () => void
}

export default function GoogleAuthGate({ open, onClose }: Props) {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!open) {
      setName("")
      setAge("")
      setPassword("")
      setConfirm("")
      setError("")
    }
  }, [open])

  const handleSubmit = async () => {
    setError("")
    if (!name.trim()) return setError("Name is required")
    const nAge = Number(age)
    if (!nAge || nAge < 1 || nAge > 120) return setError("Enter a valid age")
    if (password.length < 6) return setError("Password must be at least 6 characters")
    if (password !== confirm) return setError("Passwords do not match")

    setLoading(true)
    try {
      // Ensure we have a Supabase session (user signed in with Google)
      const { data: auth } = await supabase.auth.getUser()
      if (!auth.user) {
        setError("Google authentication required")
        return
      }

      const res = await fetch("/api/auth/complete-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), age: nAge, password })
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || "Failed to complete signup")
      }
      onClose()
      window.location.href = "/profile"
    } catch (e: any) {
      setError(e.message || "Failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete your signup</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="space-y-2">
            <Label htmlFor="name">Username</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter a username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" min={1} max={120} value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pwd">Create Password</Label>
            <div className="relative">
              <Input id="pwd" type={showPwd ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpwd">Confirm Password</Label>
            <div className="relative">
              <Input id="cpwd" type={showConfirm ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <Button disabled={loading} onClick={handleSubmit} className="w-full">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


