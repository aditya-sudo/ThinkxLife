"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
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

interface UserProfile {
  id: string
  name: string | null
  email: string
  image: string | null
  firstName: string | null
  lastName: string | null
  bio: string | null
  phone: string | null
  dateOfBirth: string | null
  location: string | null
  website: string | null
  theme: string | null
  notifications: boolean
  newsletter: boolean
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
  const { data: session, status, update } = useSession()
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
    firstName: "",
    lastName: "",
    bio: "",
    phone: "",
    dateOfBirth: "",
    location: "",
    website: "",
    theme: "light",
    notifications: true,
    newsletter: false,
  })

  // Debug logging
  console.log("Profile Page Debug:", {
    status,
    session: session ? "exists" : "null",
    profile: profile ? "exists" : "null",
    isLoading,
    error
  })

  useEffect(() => {
    console.log("useEffect triggered:", { status })

    if (status === "unauthenticated") {
      console.log("User not authenticated, redirecting to signin")
      router.push("/auth/signin")
      return
    }

    if (status === "authenticated") {
      console.log("User authenticated, fetching profile")
      fetchProfile()
    }
  }, [status, router])

  const fetchProfile = async () => {
    console.log("Fetching profile...")
    try {
      const response = await fetch("/api/profile")
      console.log("Profile API response:", response.status, response.ok)

      if (response.ok) {
        const data = await response.json()
        console.log("Profile data received:", data)
        setProfile(data.user)
        setFormData({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          bio: data.user.bio || "",
          phone: data.user.phone || "",
          dateOfBirth: data.user.dateOfBirth ? data.user.dateOfBirth.split('T')[0] : "",
          location: data.user.location || "",
          website: data.user.website || "",
          theme: data.user.theme || "light",
          notifications: data.user.notifications,
          newsletter: data.user.newsletter,
        })
      } else {
        const errorData = await response.text()
        console.error("Profile API error:", response.status, errorData)
        setError(`Failed to load profile: ${response.status}`)
      }
    } catch (error) {
      console.error("Profile fetch error:", error)
      setError("Failed to load profile")
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
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setProfile(data.user)
        setSuccess("Profile updated successfully!")
        setIsEditing(false)
        // Update session if name changed
        if (formData.firstName || formData.lastName) {
          await update({
            name: `${formData.firstName} ${formData.lastName}`.trim()
          })
        }
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
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        bio: profile.bio || "",
        phone: profile.phone || "",
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : "",
        location: profile.location || "",
        website: profile.website || "",
        theme: profile.theme || "light",
        notifications: profile.notifications,
        newsletter: profile.newsletter,
      })
    }
    setIsEditing(false)
    setError("")
    setSuccess("")
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
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

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-purple-100 to-blue-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-purple-100 to-blue-50">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Please sign in to view your profile</p>
          <Button onClick={() => router.push("/auth/signin")}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  if (!profile && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-purple-100 to-blue-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load profile</p>
          {error && <p className="text-slate-600 mb-4">{error}</p>}
          <Button onClick={() => fetchProfile()}>
            Retry
          </Button>
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
                  Welcome to ThinkxLife, {formData.firstName || profile?.name || "Friend"}! 🎉
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
                      <AvatarImage src={session.user?.image || ""} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg">
                        {getInitials(session.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">
                        {profile?.firstName && profile?.lastName
                          ? `${profile.firstName} ${profile.lastName}`
                          : profile?.name || "User"
                        }
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
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      disabled={!isEditing}
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      disabled={!isEditing}
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                    className="border-purple-200 focus:border-purple-400 min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      disabled={!isEditing}
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      disabled={!isEditing}
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      disabled={!isEditing}
                      placeholder="https://..."
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>
                </div>

                {/* Interests Section */}
                {isEditing && (
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Your Interests
                    </Label>
                    <p className="text-sm text-slate-600">
                      Select areas that interest you to help us connect you with relevant programs and opportunities.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {interestCategories.map((category) => (
                        <Card key={category.category} className="border-purple-200/50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm flex items-center gap-2">
                              <category.icon className="w-4 h-4 text-purple-600" />
                              {category.category}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            {category.interests.map((interest) => (
                              <div key={interest} className="flex items-center space-x-2">
                                <Checkbox
                                  id={interest}
                                  checked={selectedInterests.includes(interest)}
                                  onCheckedChange={() => handleInterestToggle(interest)}
                                />
                                <Label htmlFor={interest} className="text-sm">
                                  {interest}
                                </Label>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

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
                  Manage your preferences and account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Email Notifications
                      </Label>
                      <p className="text-sm text-slate-600">
                        Receive email notifications about your account activity
                      </p>
                    </div>
                    <Switch
                      checked={formData.notifications}
                      onCheckedChange={(checked) => setFormData({ ...formData, notifications: checked })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Newsletter
                      </Label>
                      <p className="text-sm text-slate-600">
                        Subscribe to our newsletter for updates and news
                      </p>
                    </div>
                    <Switch
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => setFormData({ ...formData, newsletter: checked })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Think Round Newsletter Subscription */}
                <div className="border-t border-purple-200/30 pt-6">
                  <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="flex items-center gap-2 text-purple-700 font-semibold">
                            <Heart className="w-4 h-4" />
                            Think Round, Inc. Newsletter
                          </Label>
                          <p className="text-sm text-slate-600">
                            Stay connected with Think Round's community programs, art exhibitions, and events
                          </p>
                        </div>
                        <Button
                          onClick={handleNewsletterSubscribe}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Subscribe
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
