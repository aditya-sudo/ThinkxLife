"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, FileCheck, Shield, Building, Heart, GraduationCap, Palette, Globe, Users, AlertTriangle, BookOpen, ExternalLink } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef } from "react";

const complianceCategories = [
  {
    id: "data-privacy",
    title: "Data Privacy & Protection",
    description: "Essential compliance for AI systems handling personal data",
    icon: Shield,
    color: "blue",
    checklists: [
      {
        title: "GDPR AI Compliance",
        description: "Data subject rights, consent mechanisms, and automated decision-making compliance for AI systems.",
        items: ["Data inventory for AI training", "Consent collection mechanisms", "Right to explanation implementation", "Data minimization protocols"],
        downloadLink: "https://gdpr.eu/checklist/",
        previewLink: "/compliance/gdpr-ai"
      },
      {
        title: "CCPA AI Requirements",
        description: "Consumer privacy rights and data handling requirements for AI applications.",
        items: ["Consumer rights notices", "Data deletion procedures", "Opt-out mechanisms", "Third-party data sharing"],
        downloadLink: "https://oag.ca.gov/privacy/ccpa",
        previewLink: "/compliance/ccpa-ai"
      },
      {
        title: "International Privacy Standards",
        description: "Cross-border data protection compliance for global AI deployments.",
        items: ["Data transfer agreements", "Adequacy decisions", "Binding corporate rules", "Privacy impact assessments"],
        downloadLink: "https://iapp.org/resources/",
        previewLink: "/compliance/international-privacy"
      }
    ]
  },
  {
    id: "ai-governance",
    title: "AI Governance & Ethics",
    description: "Ethical AI development and deployment frameworks",
    icon: BookOpen,
    color: "purple",
    checklists: [
      {
        title: "EU AI Act Compliance",
        description: "Risk-based compliance framework for AI systems under European regulation.",
        items: ["Risk classification assessment", "High-risk system requirements", "Documentation obligations", "Conformity assessment procedures"],
        downloadLink: "https://artificialintelligenceact.eu/",
        previewLink: "/compliance/eu-ai-act"
      },
      {
        title: "AI Ethics Framework",
        description: "Comprehensive ethical guidelines for responsible AI development and deployment.",
        items: ["Bias assessment protocols", "Transparency requirements", "Human oversight mechanisms", "Stakeholder engagement"],
        downloadLink: "https://www.partnershiponai.org/",
        previewLink: "/compliance/ai-ethics"
      },
      {
        title: "Algorithmic Accountability",
        description: "Standards for transparent and accountable AI decision-making systems.",
        items: ["Algorithm auditing procedures", "Decision explanation systems", "Appeal mechanisms", "Performance monitoring"],
        downloadLink: "https://algorithmwatch.org/en/",
        previewLink: "/compliance/algorithmic-accountability"
      }
    ]
  },
  {
    id: "industry-specific",
    title: "Industry-Specific Compliance",
    description: "Sector-specific AI compliance requirements",
    icon: Building,
    color: "green",
    checklists: [
      {
        title: "Healthcare AI Compliance",
        description: "Medical device regulations and patient safety requirements for healthcare AI.",
        items: ["Clinical validation protocols", "Patient consent procedures", "Medical device classification", "Safety monitoring systems"],
        downloadLink: "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-aiml-enabled-medical-devices",
        previewLink: "/compliance/healthcare-ai"
      },
      {
        title: "Financial Services AI",
        description: "Banking and finance AI compliance including fair lending and risk management.",
        items: ["Fair lending compliance", "Model risk management", "Consumer protection measures", "Regulatory reporting"],
        downloadLink: "https://www.federalreserve.gov/supervisionreg/srletters/SR2111.htm",
        previewLink: "/compliance/financial-ai"
      },
      {
        title: "Educational AI Standards",
        description: "Student privacy and educational equity requirements for AI in education.",
        items: ["Student data protection", "Educational equity measures", "Parental consent systems", "Academic integrity policies"],
        downloadLink: "https://studentprivacy.ed.gov/",
        previewLink: "/compliance/educational-ai"
      }
    ]
  },
  {
    id: "employment-hr",
    title: "Employment & HR AI",
    description: "AI compliance in hiring, evaluation, and workplace management",
    icon: Users,
    color: "orange",
    checklists: [
      {
        title: "AI Hiring Compliance",
        description: "Fair employment practices and bias prevention in AI-powered recruitment.",
        items: ["Bias testing protocols", "Candidate notification requirements", "Equal opportunity compliance", "Adverse impact analysis"],
        downloadLink: "https://www.eeoc.gov/newsroom/eeoc-issues-technical-assistance-document-algorithms-and-employment-discrimination",
        previewLink: "/compliance/ai-hiring"
      },
      {
        title: "Workplace AI Monitoring",
        description: "Employee privacy and surveillance compliance for workplace AI systems.",
        items: ["Employee consent procedures", "Privacy impact assessments", "Data retention policies", "Worker rights protection"],
        downloadLink: "https://www.nlrb.gov/guidance/key-reference-materials/artificial-intelligence",
        previewLink: "/compliance/workplace-ai"
      },
      {
        title: "Performance Evaluation AI",
        description: "Fair and transparent AI systems for employee performance assessment.",
        items: ["Evaluation criteria transparency", "Appeal processes", "Bias mitigation measures", "Human oversight requirements"],
        downloadLink: "https://www.shrm.org/resourcesandtools/hr-topics/technology/pages/artificial-intelligence-hr-compliance.aspx",
        previewLink: "/compliance/performance-ai"
      }
    ]
  }
];

export default function ComplianceHub() {
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleCategoryFilter = (value: string) => {
    if (value !== "all" && categoryRefs.current[value]) {
      categoryRefs.current[value]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleDownloadAll = () => {
    window.open("https://www.nist.gov/itl/ai-risk-management-framework", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Compliance Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive compliance checklists and frameworks for responsible AI development,
            deployment, and governance across industries and regulations
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
            <div className="text-gray-600 text-sm">Compliance Areas</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">48</div>
            <div className="text-gray-600 text-sm">Checklist Items</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">6</div>
            <div className="text-gray-600 text-sm">Industries Covered</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">15</div>
            <div className="text-gray-600 text-sm">Regulations</div>
          </div>
        </div>

        {/* Search and Download Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <Select onValueChange={handleCategoryFilter}>
            <SelectTrigger className="w-full md:w-[280px]">
              <SelectValue placeholder="Jump to Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="data-privacy">Data Privacy & Protection</SelectItem>
              <SelectItem value="ai-governance">AI Governance & Ethics</SelectItem>
              <SelectItem value="industry-specific">Industry-Specific</SelectItem>
              <SelectItem value="employment-hr">Employment & HR</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleDownloadAll}
            className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Access NIST AI Framework
          </Button>
        </div>

        {/* Compliance Categories */}
        <div className="space-y-12">
          {complianceCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              ref={(el) => { categoryRefs.current[category.id] = el; }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className={`bg-${category.color}-100 p-3 rounded-full mr-4`}>
                  <category.icon className={`h-8 w-8 text-${category.color}-600`} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{category.title}</h2>
                  <p className="text-gray-600 mt-2">{category.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {category.checklists.map((checklist, checklistIndex) => (
                  <div key={checklistIndex} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">{checklist.title}</h3>
                      <FileCheck className="h-5 w-5 text-gray-400" />
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{checklist.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2 text-sm">Key Items:</h4>
                      <ul className="space-y-1">
                        {checklist.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-xs text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Link href={checklist.previewLink} className="flex-1">
                        <Button variant="outline" className="w-full text-xs">
                          Preview
                        </Button>
                      </Link>
                      <Button
                        onClick={() => window.open(checklist.downloadLink, "_blank")}
                        className={`flex-1 text-xs bg-${category.color}-500 hover:bg-${category.color}-600`}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Access Guide
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Additional Compliance Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <AlertTriangle className="h-8 w-8 mb-4 text-orange-500" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Risk Assessment Tools</h3>
              <p className="text-sm mb-4 text-gray-600">Comprehensive risk evaluation frameworks for AI systems across different deployment scenarios.</p>
              <Button
                onClick={() => window.open("https://www.nist.gov/itl/ai-risk-management-framework", "_blank")}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Access NIST Tools →
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <BookOpen className="h-8 w-8 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Policy Templates</h3>
              <p className="text-sm mb-4 text-gray-600">Ready-to-use policy templates for AI governance, ethics committees, and compliance procedures.</p>
              <Button
                onClick={() => window.open("https://www.partnershiponai.org/", "_blank")}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Access Templates →
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ExternalLink className="h-8 w-8 mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Regulatory Updates</h3>
              <p className="text-sm mb-4 text-gray-600">Stay informed about the latest regulatory developments and compliance requirements worldwide.</p>
              <Button
                onClick={() => window.open("https://www.oecd.org/digital/artificial-intelligence/", "_blank")}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                OECD AI Updates →
              </Button>
            </div>
          </div>
        </div>

        {/* Implementation Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Use These Checklists</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Assess Your Needs</h3>
              <p className="text-sm text-gray-600">
                Identify which regulations and standards apply to your AI system based on industry, geography, and use case.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Access External Resources</h3>
              <p className="text-sm text-gray-600">
                Click "Access Guide" to visit official regulatory websites and authoritative compliance resources.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Implement & Track</h3>
              <p className="text-sm text-gray-600">
                Work through each checklist item systematically, documenting your compliance efforts and evidence.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Monitor & Update</h3>
              <p className="text-sm text-gray-600">
                Regularly review and update your compliance status as regulations evolve and your AI systems change.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
              <p className="text-yellow-700 text-sm">
                These checklists provide general guidance and redirect to official regulatory resources.
                This should not be considered as legal advice. Compliance requirements may vary based on specific
                circumstances, jurisdictions, and evolving regulations. Always consult with qualified legal and
                compliance professionals for your specific situation.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Link href="/inside-our-ai">
            <Button variant="outline" className="hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-800">
              ← Back to Inside our AI Hub
            </Button>
          </Link>
          <Link href="/awareness/ethics">
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
              Explore AI Ethics →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
