import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const articles = [
  {
    title: "Mitigating AI Bias in Hiring",
    summary: "How to audit training data for fairness.",
    link: "/articles/mitigating-ai-bias",
  },
  {
    title: "Building Explainable Models",
    summary: "Techniques for model transparency.",
    link: "/articles/explainable-models",
  },
  {
    title: "Accountability Frameworks",
    summary: "Logging, audit trails & governance.",
    link: "/articles/accountability-frameworks",
  },
];

export default function EthicsModule() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Banner */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Ethics Explained
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Understanding AI ethics through practical examples
        </p>
      </div>

      {/* Article Preview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {articles.map((article, index) => (
          <div
            key={index}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {article.summary}
              </p>
              <Link href={article.link}>
                <Button
                  variant="link"
                  className="text-green-600 hover:text-green-700 p-0"
                >
                  Read more →
                </Button>
              </Link>
            </Card>
          </div>
        ))}
      </div>

      {/* Back to Home CTA */}
      <div className="text-center">
        <Link href="/ai-awareness">
          <Button variant="outline" className="hover:bg-green-50">
            ← Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
