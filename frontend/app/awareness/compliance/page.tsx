"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, FileCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const checklists = [
  {
    title: "GDPR Essentials",
    description:
      "Data subject rights, consent flows, and breach notification templates.",
    link: "/checklists/gdpr",
    icon: FileCheck,
  },
  {
    title: "CCPA Overview",
    description:
      "Consumer privacy rights in California: opt-out flows and data deletion.",
    link: "/checklists/ccpa",
    icon: FileCheck,
  },
  {
    title: "EU AI Act Primer",
    description:
      "Risk levels, documentation requirements, and conformity assessment steps.",
    link: "/checklists/eu-ai-act",
    icon: FileCheck,
  },
  {
    title: "Custom Compliance",
    description:
      "Build your own checklist based on your specific needs and requirements.",
    link: "/checklists/custom",
    icon: FileCheck,
  },
];

export default function ComplianceHub() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Banner */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Regulatory Checklists
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Stay compliant with comprehensive guides for AI regulations
        </p>
      </div>

      {/* Search and Download Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <Select>
          <SelectTrigger className="w-full md:w-[280px]">
            <SelectValue placeholder="Search by Regulation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gdpr">GDPR</SelectItem>
            <SelectItem value="ccpa">CCPA</SelectItem>
            <SelectItem value="eu-ai">EU AI Act</SelectItem>
            <SelectItem value="hipaa">HIPAA</SelectItem>
          </SelectContent>
        </Select>

        <Button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700">
          <Download className="w-4 h-4 mr-2" />
          Download All PDFs
        </Button>
      </div>

      {/* Checklist Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {checklists.map((checklist, index) => (
          <div
            key={index}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <checklist.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {checklist.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {checklist.description}
                  </p>
                  <Link href={checklist.link}>
                    <Button variant="outline" className="hover:bg-purple-50">
                      View Checklist →
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Back to Home CTA */}
      <div className="text-center">
        <Link href="/ai-awareness">
          <Button variant="outline" className="hover:bg-purple-50">
            ← Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
