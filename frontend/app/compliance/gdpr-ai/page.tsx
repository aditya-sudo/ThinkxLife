"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Download, Printer, Share2, Shield, AlertTriangle, BookOpen, ExternalLink, CheckCircle } from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  required: boolean;
  category: string;
  guidance: string;
  evidence: string[];
}

const gdprAIChecklist: ChecklistItem[] = [
  {
    id: "data-inventory",
    title: "AI Training Data Inventory",
    description: "Create and maintain a comprehensive inventory of all personal data used in AI training and processing.",
    required: true,
    category: "Data Governance",
    guidance: "Document data sources, categories of personal data, processing purposes, and retention periods for all AI training datasets.",
    evidence: ["Data inventory spreadsheet", "Data flow diagrams", "Processing records"]
  },
  {
    id: "lawful-basis",
    title: "Establish Lawful Basis for AI Processing",
    description: "Identify and document the lawful basis for processing personal data in AI systems under Article 6 GDPR.",
    required: true,
    category: "Legal Compliance",
    guidance: "Determine appropriate lawful basis (consent, legitimate interest, contract, etc.) and document the assessment.",
    evidence: ["Legal basis assessment", "Privacy notices", "Consent records"]
  },
  {
    id: "automated-decision-making",
    title: "Automated Decision-Making Compliance",
    description: "Implement safeguards for automated decision-making under Article 22 GDPR.",
    required: true,
    category: "Individual Rights",
    guidance: "Provide meaningful information about the logic involved and implement human review processes for significant decisions.",
    evidence: ["Decision-making documentation", "Human review procedures", "Appeal mechanisms"]
  },
  {
    id: "data-minimization",
    title: "Data Minimization for AI Systems",
    description: "Ensure AI systems process only necessary personal data for specified purposes.",
    required: true,
    category: "Data Protection Principles",
    guidance: "Regularly review and minimize data collection, implement data reduction techniques, and document necessity assessments.",
    evidence: ["Data minimization assessment", "Feature selection documentation", "Regular review logs"]
  },
  {
    id: "consent-mechanisms",
    title: "AI-Specific Consent Collection",
    description: "Implement clear, specific consent mechanisms for AI processing where consent is the lawful basis.",
    required: false,
    category: "Consent Management",
    guidance: "Provide granular consent options, clear information about AI processing, and easy withdrawal mechanisms.",
    evidence: ["Consent forms", "Consent management system", "Withdrawal procedures"]
  },
  {
    id: "privacy-impact-assessment",
    title: "AI Privacy Impact Assessment (PIA)",
    description: "Conduct comprehensive privacy impact assessments for high-risk AI processing activities.",
    required: true,
    category: "Risk Assessment",
    guidance: "Assess privacy risks, implement mitigation measures, and document the assessment process and outcomes.",
    evidence: ["Completed PIA document", "Risk mitigation plan", "Stakeholder consultation records"]
  },
  {
    id: "data-subject-rights",
    title: "Data Subject Rights Implementation",
    description: "Implement procedures to handle data subject rights requests in AI contexts.",
    required: true,
    category: "Individual Rights",
    guidance: "Establish processes for access, rectification, erasure, and portability requests affecting AI systems.",
    evidence: ["Rights handling procedures", "Response templates", "Technical implementation documentation"]
  },
  {
    id: "cross-border-transfers",
    title: "International Data Transfer Compliance",
    description: "Ensure compliance for cross-border data transfers in AI development and deployment.",
    required: false,
    category: "Data Transfers",
    guidance: "Implement appropriate safeguards (adequacy decisions, SCCs, BCRs) for international AI data processing.",
    evidence: ["Transfer impact assessments", "Standard contractual clauses", "Adequacy decision documentation"]
  }
];

const categories = [...new Set(gdprAIChecklist.map(item => item.category))];

export default function GDPRAICompliancePage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleCheck = (itemId: string) => {
    setCheckedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredItems = selectedCategory === "all"
    ? gdprAIChecklist
    : gdprAIChecklist.filter(item => item.category === selectedCategory);

  const completionPercentage = Math.round((checkedItems.length / gdprAIChecklist.length) * 100);
  const requiredItems = gdprAIChecklist.filter(item => item.required);
  const requiredCompleted = checkedItems.filter(id =>
    requiredItems.some(item => item.id === id)
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">GDPR AI Compliance Checklist</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive compliance framework for AI systems processing personal data under GDPR
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-2">
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print Checklist
            </Button>
            <Button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'GDPR AI Compliance Checklist',
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => window.open("https://gdpr.eu/checklist/", "_blank")}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Official GDPR Guide
            </Button>
            <Button
              onClick={() => window.open("https://edpb.europa.eu/our-work-tools/documents/public-consultations_en", "_blank")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              EDPB Resources
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Overall Progress</h3>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">{completionPercentage}%</div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {checkedItems.length} of {gdprAIChecklist.length} items completed
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Required Items</h3>
              <AlertTriangle className="h-6 w-6 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {requiredCompleted}/{requiredItems.length}
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-orange-600 rounded-full transition-all duration-300"
                style={{ width: `${(requiredCompleted / requiredItems.length) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">Critical compliance items</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
              <BookOpen className="h-6 w-6 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">{categories.length}</div>
            <p className="text-sm text-gray-600">Compliance areas covered</p>
            <div className="mt-3">
              <select
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </Card>
        </div>

        {/* Checklist Items */}
        <div className="space-y-4 mb-8">
          {filteredItems.map((item, index) => (
            <Card key={item.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Checkbox
                    id={item.id}
                    checked={checkedItems.includes(item.id)}
                    onCheckedChange={() => handleCheck(item.id)}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.title}
                        {item.required && (
                          <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            Required
                          </span>
                        )}
                      </h3>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3">{item.description}</p>

                  <div className="bg-blue-50 p-3 rounded-lg mb-3">
                    <h4 className="font-semibold text-blue-800 text-sm mb-1">Implementation Guidance:</h4>
                    <p className="text-blue-700 text-sm">{item.guidance}</p>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-800 text-sm mb-2">Evidence & Documentation:</h4>
                    <ul className="space-y-1">
                      {item.evidence.map((evidence, evidenceIndex) => (
                        <li key={evidenceIndex} className="text-green-700 text-sm flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {evidence}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Sources and Legal References */}
        <Card className="p-8 mb-8">
          <div className="flex items-center mb-6">
            <ExternalLink className="h-8 w-8 text-gray-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Legal References & Sources</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">GDPR Articles</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Article 6: Lawfulness of processing</li>
                <li>• Article 13-14: Information to be provided to data subjects</li>
                <li>• Article 22: Automated individual decision-making, including profiling</li>
                <li>• Article 25: Data protection by design and by default</li>
                <li>• Article 35: Data protection impact assessment</li>
                <li>• Articles 12-23: Data subject rights</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Regulatory Guidance</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• European Data Protection Board Guidelines on AI</li>
                <li>• ICO Guidance on AI and Data Protection</li>
                <li>• CNIL Recommendations on AI Systems</li>
                <li>• Article 29 Working Party Guidelines on Automated Decision-Making</li>
                <li>• EDPB Guidelines on Data Protection Impact Assessment</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Legal Disclaimer:</strong> This checklist provides general guidance based on current GDPR requirements
              and regulatory guidance. It should not be considered as legal advice. Always consult with qualified
              data protection professionals and legal counsel for your specific circumstances and jurisdiction.
            </p>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Next Steps & Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Immediate Actions</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  Complete all required checklist items
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  Conduct privacy impact assessment
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  Document lawful basis for AI processing
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Implement data subject rights procedures
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Ongoing Compliance</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Regular compliance audits and reviews
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                  Staff training on GDPR and AI
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Monitor regulatory developments
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                  Update procedures as AI systems evolve
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link href="/awareness/compliance">
            <Button variant="outline" className="hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-800">
              ← Back to Compliance Hub
            </Button>
          </Link>
          <div className="flex gap-2">
            <Link href="/compliance/ccpa-ai">
              <Button variant="outline">
                Next: CCPA AI Compliance →
              </Button>
            </Link>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={requiredCompleted < requiredItems.length}
            >
              Generate Compliance Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
