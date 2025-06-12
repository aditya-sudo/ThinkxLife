"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserInfoForm from "@/components/user-info-form";
import AceQuestionnaire from "@/components/ace-questionnaire";
import AceResults from "@/components/ace-results";
import ChatInterface from "@/components/chat-interface";
import AgeRestriction from "@/components/age-restriction";
import Disclaimer from "@/components/disclaimer";
import { Loader2 } from "lucide-react";

type UserInfo = {
  name: string;
  age: number | null;
};

type Answer = "yes" | "no" | "skip" | null;

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  [key: string]: any;
}

export default function ChatbotPage() {
  const { data: _session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<
    | "loading"
    | "disclaimer"
    | "userInfo"
    | "questionnaire"
    | "results"
    | "chat"
    | "ageRestriction"
  >("loading");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [aceScore, setAceScore] = useState<number>(0);
  const [_aceAnswers, setAceAnswers] = useState<Answer[]>([]);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const data = await response.json();
        setProfile(data.user);

        // Calculate age from date of birth if available
        const age = calculateAge(data.user.dateOfBirth);
        const name = data.user.firstName || data.user.name || "Friend";

        if (age !== null && age >= 18) {
          // User has valid age in profile, skip user info form
          setUserInfo({ name, age });
          setStep("disclaimer");
        } else if (age !== null && age < 18) {
          // User is under 18
          setStep("ageRestriction");
        } else {
          // No age in profile, need to collect it
          setStep("disclaimer");
        }
      } else {
        setStep("disclaimer");
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      setStep("disclaimer");
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, router, fetchProfile]);

  const calculateAge = (birthDate: string | null) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleAcceptDisclaimer = () => {
    if (userInfo) {
      // User info already available from profile
      setStep("questionnaire");
    } else {
      // Need to collect user info
      setStep("userInfo");
    }
  };

  const handleUserInfoSubmit = (data: UserInfo) => {
    setUserInfo(data);
    setStep("questionnaire");
  };

  const handleAgeRestriction = () => {
    setStep("ageRestriction");
  };

  const handleQuestionnaireComplete = (score: number, answers: Answer[]) => {
    setAceScore(score);
    setAceAnswers(answers);
    setStep("results");
  };

  const _handleStartChat = () => {
    setStep("chat");
  };

  const getInitialMessage = () => {
    const userName = userInfo?.name || profile?.firstName || "friend";
    if (aceScore <= 3) {
      return `🌞 Hey ${userName}! What can we explore together today?`;
    } else if (aceScore <= 6) {
      return `🌻 Hello strong spirit, ${userName}. What would you like to talk about today?`;
    } else {
      return `🌸 Hello brave soul, ${userName}. I'm here for you — what's on your mind today?`;
    }
  };

  if (status === "loading" || step === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading Zoe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-cyan-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {step === "disclaimer" && (
          <Disclaimer onAccept={handleAcceptDisclaimer} />
        )}

        {step === "userInfo" && (
          <UserInfoForm
            onSubmit={handleUserInfoSubmit}
            onAgeRestriction={handleAgeRestriction}
            profile={profile}
          />
        )}

        {step === "ageRestriction" && <AgeRestriction />}

        {step === "questionnaire" && userInfo && (
          <AceQuestionnaire
            onComplete={handleQuestionnaireComplete}
            userName={userInfo.name}
          />
        )}

        {step === "results" && userInfo && (
          <AceResults
            score={aceScore}
            userName={userInfo.name}
            onStartChat={() => setStep("chat")}
          />
        )}

        {step === "chat" && userInfo && (
          <ChatInterface
            initialMessage={getInitialMessage()}
            userName={userInfo.name}
          />
        )}
      </div>
    </div>
  );
}
