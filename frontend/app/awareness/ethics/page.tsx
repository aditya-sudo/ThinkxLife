import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Palette, GraduationCap, Heart, Users, Globe } from "lucide-react";

const ethicsAreas = [
  {
    icon: <Palette className="w-8 h-8 text-purple-600" />,
    title: "AI Ethics in Arts & Creativity",
    tagline: "Preserving human creativity while embracing AI collaboration",
    topics: [
      {
        title: "Creative Authenticity",
        description: "When AI generates art, music, or literature—who is the true creator? Exploring attribution, originality, and the value of human expression.",
      },
      {
        title: "Cultural Appropriation",
        description: "AI trained on diverse cultural works may reproduce without context or permission. How do we respect cultural heritage in AI creativity?",
      },
      {
        title: "Artist Rights & Compensation",
        description: "Should artists be compensated when their work trains AI? Examining fair use, consent, and economic impact on creative professionals.",
      },
      {
        title: "Bias in Creative AI",
        description: "AI art generators may perpetuate stereotypes or exclude certain artistic traditions. Ensuring diverse representation in creative outputs.",
      },
    ],
    caseStudy: {
      title: "Case Study: AI Art Competitions",
      description: "When AI-generated artwork wins human art competitions, it raises questions about fairness, disclosure, and the future of artistic expression.",
    },
    link: "/articles/ai-ethics-arts",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
    title: "AI Ethics in Education",
    tagline: "Empowering learning while protecting student privacy and equity",
    topics: [
      {
        title: "Educational Equity",
        description: "AI tutoring systems may advantage students with better technology access. How do we prevent AI from widening educational gaps?",
      },
      {
        title: "Student Privacy",
        description: "AI systems collect vast data on learning patterns, mistakes, and progress. Protecting children's data and preventing surveillance.",
      },
      {
        title: "Academic Integrity",
        description: "As AI helps with homework and essays, we must redefine cheating, originality, and authentic learning in the AI age.",
      },
      {
        title: "Teacher Displacement",
        description: "Will AI replace human educators? Balancing efficiency with the irreplaceable human elements of teaching and mentorship.",
      },
    ],
    caseStudy: {
      title: "Case Study: AI Grading Systems",
      description: "Automated essay grading can be biased against certain writing styles or cultural expressions, potentially disadvantaging diverse students.",
    },
    link: "/articles/ai-ethics-education",
  },
  {
    icon: <Heart className="w-8 h-8 text-red-600" />,
    title: "AI Ethics in Humanity & Healthcare",
    tagline: "Preserving human dignity in AI-assisted care and decision-making",
    topics: [
      {
        title: "Medical Decision Autonomy",
        description: "When AI recommends treatments, patients must retain the right to understand and choose their care path.",
      },
      {
        title: "Healthcare Bias",
        description: "AI trained on historical medical data may perpetuate racial, gender, or socioeconomic biases in diagnosis and treatment.",
      },
      {
        title: "Mental Health AI",
        description: "AI therapists and mental health apps raise questions about human connection, professional standards, and crisis intervention.",
      },
      {
        title: "End-of-Life Decisions",
        description: "Should AI influence decisions about life support, palliative care, or resource allocation? The limits of algorithmic judgment.",
      },
    ],
    caseStudy: {
      title: "Case Study: AI Diagnostic Bias",
      description: "Studies show AI diagnostic tools perform worse on darker skin tones, highlighting the critical need for inclusive training data in healthcare.",
    },
    link: "/articles/ai-ethics-healthcare",
  },
  {
    icon: <Users className="w-8 h-8 text-green-600" />,
    title: "AI Ethics in Social Impact",
    tagline: "Building AI that strengthens communities and social justice",
    topics: [
      {
        title: "Algorithmic Justice",
        description: "AI in criminal justice, hiring, and lending can perpetuate systemic discrimination. Ensuring fair outcomes across all communities.",
      },
      {
        title: "Social Media & Democracy",
        description: "AI algorithms shape what we see and believe. Examining filter bubbles, misinformation, and the impact on democratic discourse.",
      },
      {
        title: "Digital Divide",
        description: "AI benefits may not reach all communities equally. Addressing access, digital literacy, and inclusive AI development.",
      },
      {
        title: "Labor & Economic Justice",
        description: "As AI automates jobs, how do we ensure a just transition? Exploring retraining, universal basic income, and worker rights.",
      },
    ],
    caseStudy: {
      title: "Case Study: Predictive Policing",
      description: "AI systems that predict crime hotspots may reinforce biased policing patterns, leading to over-surveillance of minority communities.",
    },
    link: "/articles/ai-ethics-social",
  },
  {
    icon: <Globe className="w-8 h-8 text-indigo-600" />,
    title: "AI Ethics in Global Impact",
    tagline: "Addressing AI's worldwide implications for humanity's future",
    topics: [
      {
        title: "Climate & Environment",
        description: "AI's massive energy consumption vs. its potential to solve climate change. Balancing computational power with environmental responsibility.",
      },
      {
        title: "Global AI Governance",
        description: "Different countries have different AI ethics standards. How do we create global cooperation while respecting cultural values?",
      },
      {
        title: "Digital Colonialism",
        description: "Powerful nations and corporations control AI development. Ensuring developing countries have a voice in AI's global impact.",
      },
      {
        title: "Existential Considerations",
        description: "As AI becomes more powerful, what are our responsibilities to future generations? Long-term safety and human flourishing.",
      },
    ],
    caseStudy: {
      title: "Case Study: AI and Climate Change",
      description: "While AI data centers consume enormous energy, AI also optimizes renewable energy grids—illustrating the complex relationship between AI and sustainability.",
    },
    link: "/articles/ai-ethics-global",
  },
];

export default function EthicsModule() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Banner */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          AI Ethics Across Human Domains
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Exploring the ethical implications of AI in the areas that matter most to human flourishing:
          Arts, Education, Healthcare, Social Justice, and Global Impact
        </p>
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl">
          <p className="text-lg text-gray-700 dark:text-gray-300 italic">
            "Technology is not neutral. We're inside of what we make, and it's inside of us.
            We're living in a world of connections — and it matters which ones get made and unmade."
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">— Donna Haraway</p>
        </div>
      </div>

      {/* Ethics Areas Grid */}
      <div className="space-y-12 mb-16">
        {ethicsAreas.map((area, index) => (
          <div
            key={index}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
              {/* Area Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  {area.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {area.title}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {area.tagline}
                  </p>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {area.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {topic.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {topic.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Case Study */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  {area.caseStudy.title}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {area.caseStudy.description}
                </p>
              </div>

              {/* CTA */}
              <Link href={area.link}>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                  Explore {area.title.split(' ').slice(-1)[0]} Ethics →
                </Button>
              </Link>
            </Card>
          </div>
        ))}
      </div>

      {/* Action Framework */}
      <div className="mb-16">
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Practical Ethics Framework
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Identify Stakeholders</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Who is affected by this AI system? Consider all communities and individuals.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Assess Impact</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                What are the potential benefits and harms across different groups?
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Design Safeguards</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Build in transparency, accountability, and human oversight mechanisms.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Monitor & Adapt</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Continuously evaluate real-world impacts and adjust accordingly.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Back to Home CTA */}
      <div className="text-center">
        <Link href="/ai-awareness">
          <Button variant="outline" className="hover:bg-green-50 mr-4">
            ← Back to AI Awareness
          </Button>
        </Link>
        <Link href="/awareness/quiz/basic-ai">
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300">
            Test Your Ethics Knowledge →
          </Button>
        </Link>
      </div>
    </div>
  );
}
