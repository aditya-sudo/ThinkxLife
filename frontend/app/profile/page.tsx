"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Edit3,
  Save,
  X,
  Settings,
  Shield,
  Bell,
  Loader2,
  Heart,
  LogOut,
  ExternalLink,
  Sparkles,
  Users,
  Palette,
  Brain,
  Lightbulb,
} from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface UserProfile {
  id: string
  name: string | null
  email: string
  image: string | null
  dateOfBirth: string | null
  createdAt: string
  updatedAt: string
}

// Interest categories based on Think Round's mission and AI focus
const interestCategories = [
  {
    category: "Arts & Creativity",
    icon: Palette,
    interests: [
      "Visual Arts",
      "Digital Art",
      "Photography",
      "Music",
      "Creative Writing",
      "Performance Art",
      "Art Education"
    ]
  },
  {
    category: "AI & Technology",
    icon: Brain,
    interests: [
      "Artificial Intelligence",
      "Machine Learning",
      "AI Ethics",
      "Technology for Good",
      "Digital Innovation",
      "AI in Arts",
      "Future of Work"
    ]
  },
  {
    category: "Community & Social Impact",
    icon: Users,
    interests: [
      "Community Building",
      "Social Justice",
      "Environmental Sustainability",
      "Education",
      "Youth Programs",
      "Intergenerational Connection",
      "Nonprofit Work"
    ]
  },
  {
    category: "Human Connection",
    icon: Heart,
    interests: [
      "Family Programs",
      "Cultural Exchange",
      "Mentorship",
      "Volunteer Work",
      "Human Rights",
      "Global Citizenship",
      "Peace Building"
    ]
  }
]

export default function ProfilePage() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dateOfBirth: "",
    location: "",
    website: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push("/auth/signin")
        return
      }
      fetchProfile()
    })()
  }, [router])

  const fetchProfile = async () => {
    console.log("Fetching profile...")
    try {
      const response = await fetch("/api/profile", { cache: "no-store" })
      console.log("Profile API response:", response.status, response.ok)

      if (response.ok) {
        const data = await response.json()
        console.log("Profile data received:", data)
         setProfile(data.user)
        setFormData({
          name: data.user.name || "",
          age: data.user.dateOfBirth ? String(calculateAge(data.user.dateOfBirth)) : "",
          dateOfBirth: data.user.dateOfBirth ? data.user.dateOfBirth.split('T')[0] : "",
          location: "",
          website: "",
          newPassword: "",
          confirmPassword: "",
        })
        setError("") // Clear any previous errors
      } else {
        let errorMessage = `Failed to load profile (${response.status})`
        try {
          const errorData = await response.json()
          console.error("Profile API error:", response.status, errorData)
          if (errorData.error) {
            errorMessage = `${errorData.error}${errorData.details ? `: ${errorData.details}` : ''}`
          }
        } catch (parseError) {
          console.error("Could not parse error response:", parseError)
          const errorText = await response.text()
          console.error("Raw error response:", errorText)
        }
        setError(errorMessage)
      }
    } catch (error) {
      console.error("Profile fetch error:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setError(`Network error: ${errorMessage}. Please check your connection and try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name || undefined,
          age: formData.age ? Number(formData.age) : undefined,
          password: formData.newPassword && formData.newPassword === formData.confirmPassword ? formData.newPassword : undefined,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setProfile(data.user)
        setSuccess("Profile updated successfully!")
        setIsEditing(false)
        setFormData(prev => ({ ...prev, newPassword: "", confirmPassword: "" }))
        // Update session if name changed
        // no session update needed; reads from API
      } else {
        setError(data.error || "Failed to update profile")
      }
    } catch {
      setError("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.name || "",
        age: profile.dateOfBirth ? String(calculateAge(profile.dateOfBirth)) : "",
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : "",
      }))
    }
    setIsEditing(false)
    setError("")
    setSuccess("")
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/auth/signin")
  }

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return null
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const handleNewsletterSubscribe = () => {
    window.open('https://www.thinkround.org/subscribe', '_blank')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-100 to-blue-50 pt-24 pb-8 flex items-center justify-center">
        <div className="text-center">
          <div className="p-4 bg-purple-100 rounded-full inline-block mb-4">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Loading Your Profile</h2>
          <p className="text-slate-600">Please wait while we fetch your information...</p>
        </div>
      </div>
    )
  }

  // Supabase handles redirect in effect

  if (!profile && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-100 to-blue-50 pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-white/80 backdrop-blur-sm border border-red-200/50 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="p-4 bg-red-100 rounded-full inline-block mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-red-800 mb-4">Profile Loading Error</h2>
              <p className="text-red-700 mb-2">We couldn't load your profile at this time.</p>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800 font-medium mb-2">Error Details:</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
              <div className="space-y-3">
                <Button 
                  onClick={() => {
                    setError("")
                    setIsLoading(true)
                    fetchProfile()
                  }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white mr-4"
                >
                  <Loader2 className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="border-slate-300 text-slate-600"
                >
                  <User className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </div>
              <div className="mt-6 pt-6 border-t border-red-200">
                <p className="text-slate-600 text-sm mb-2">Need help?</p>
                <p className="text-slate-500 text-xs">
                  If this problem persists, try signing out and signing back in, or contact support.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U"
    return name.split(" ").map(n => n[0]).join("").toUpperCase()
  }

  const userAge = calculateAge(formData.dateOfBirth)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-100 to-blue-50 pt-24 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Welcome Message */}
        <Card className="mb-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Welcome to ThinkxLife, {formData.name || profile?.name || "Friend"}! 🎉
                </h2>
                <p className="text-purple-100 text-lg">
                  Thank you for creating your account! By joining ThinkxLife, you're now a valued member of
                  <strong className="text-white"> Think Round, Inc.</strong> - where Earth is home and humans are family.
                </p>
                <p className="text-purple-100 mt-2">
                  Together, we're building a community that bridges art, technology, and human connection for a better world.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent">
                My Profile
              </h1>
              <p className="text-slate-600 mt-1">Manage your account settings and preferences</p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-white/80 backdrop-blur-sm border border-purple-200/50 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={""} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg">
                        {getInitials(profile?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
             <CardTitle className="text-xl">
               {profile?.name || "User"}
               {userAge && (
                          <span className="text-sm font-normal text-slate-500 ml-2">
                            (Age {userAge})
                          </span>
               )}
             </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {profile?.email}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                    className={isEditing ? "border-red-200 text-red-600 hover:bg-red-50" : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"}
                  >
                    {isEditing ? (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      min={1}
                      max={120}
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      disabled={!isEditing}
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Set a new password (min 6 chars)"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      disabled={!isEditing}
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      disabled={!isEditing}
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>
                </div>

                

                

                

                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-white/80 backdrop-blur-sm border border-purple-200/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                

                

                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Settings
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                <div className="pt-6 border-t border-purple-200/30">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-slate-700">
                      <Shield className="w-4 h-4" />
                      Account Information
                    </Label>
                    <div className="text-sm text-slate-600 space-y-1">
                      <p>Member since: {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "Unknown"}</p>
                      <p>Last updated: {profile?.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : "Unknown"}</p>
                      <p className="text-purple-600 font-medium">Think Round, Inc. Member</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
