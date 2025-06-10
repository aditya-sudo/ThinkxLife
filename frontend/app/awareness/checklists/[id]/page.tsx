"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Download, Printer, Share2 } from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  required: boolean;
}

const gdprChecklist: ChecklistItem[] = [
  {
    id: "data-inventory",
    title: "Data Inventory",
    description:
      "Create and maintain an inventory of all personal data processed by AI systems.",
    required: true,
  },
  {
    id: "consent-mechanism",
    title: "Consent Mechanism",
    description:
      "Implement clear consent collection and withdrawal mechanisms.",
    required: true,
  },
  // Add more items...
];

export default function ChecklistPage({ params: _params }: { params: { id: string } }) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheck = (itemId: string) => {
    setCheckedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">GDPR Compliance Checklist</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Essential requirements for GDPR compliance in AI systems
          </p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="p-4 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Completion Progress</span>
          <span className="text-sm text-gray-600">
            {Math.round((checkedItems.length / gdprChecklist.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-300"
            style={{
              width: `${(checkedItems.length / gdprChecklist.length) * 100}%`,
            }}
          />
        </div>
      </Card>

      {/* Checklist Items */}
      <div className="space-y-4 mb-12">
        {gdprChecklist.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Checkbox
                  id={item.id}
                  checked={checkedItems.includes(item.id)}
                  onCheckedChange={() => handleCheck(item.id)}
                />
                <div className="flex-1">
                  <label
                    htmlFor={item.id}
                    className="text-lg font-medium cursor-pointer"
                  >
                    {item.title}
                    {item.required && (
                      <span className="ml-2 text-sm text-red-500">
                        *Required
                      </span>
                    )}
                  </label>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/awareness/compliance">
          <Button variant="outline">← Back to Compliance Hub</Button>
        </Link>
        <Button
          disabled={
            checkedItems.length <
            gdprChecklist.filter((item) => item.required).length
          }
        >
          Generate Compliance Report →
        </Button>
      </div>
    </div>
  );
}
