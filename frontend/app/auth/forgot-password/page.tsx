"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
      } else {
        setError(data.error || "An error occurred. Please try again.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-purple-100 to-blue-50 p-4">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border border-purple-200/50 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-slate-600">
              We've sent you a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <Mail className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-800 font-medium">Email Sent!</p>
                <p className="text-green-700 text-sm mt-1">
                  If an account with <strong>{email}</strong> exists, we've sent a password reset link.
                </p>
              </div>

              <div className="text-sm text-slate-600 space-y-2">
                <p>• Check your inbox and spam folder</p>
                <p>• The link will expire in 1 hour</p>
                <p>• Click the link to reset your password</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/auth/signin">
                <Button variant="outline" className="w-full border-purple-200 hover:bg-purple-50">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sign In
                </Button>
              </Link>

              <Button
                onClick={() => {
                  setSuccess(false)
                  setEmail("")
                }}
                variant="ghost"
                className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                Send Another Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-purple-100 to-blue-50 p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border border-purple-200/50 shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent">
            Forgot Password?
          </CardTitle>
          <CardDescription className="text-slate-600">
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-purple-200 focus:border-purple-400"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Reset Link...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Reset Link
                </>
              )}
            </Button>
          </form>

          <div className="text-center">
            <Link href="/auth/signin" className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
