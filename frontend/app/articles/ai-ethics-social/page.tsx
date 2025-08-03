import React from 'react';
import { Users, Briefcase, Scale, TrendingDown, BookOpen, ExternalLink } from 'lucide-react';

export default function AIEthicsSocialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <Users className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            AI Ethics in Social Impact
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Examining how artificial intelligence affects employment, inequality,
            social justice, and community well-being across diverse populations
          </p>
        </div>

        {/* Quote */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <blockquote className="text-xl italic text-gray-700 text-center">
            "AI has the potential to drive innovation and productivity, but the uneven investment in and
            adoption of AI technologies mean that high-income nations are likely to benefit far more than
            low- and medium-income countries."
          </blockquote>
          <p className="text-center text-gray-500 mt-4">
            — UN Mind the AI Divide Report, 2024
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Employment and Labor */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Briefcase className="h-8 w-8 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Employment & Labor Impact</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                AI's impact on employment is complex, with potential for both job displacement
                and creation, requiring careful policy intervention to ensure equitable outcomes.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">Displacement Risks:</h3>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>Up to 40% of global jobs could be affected by AI</li>
                  <li>Low-wage workers face higher automation risk</li>
                  <li>Developing countries lose competitive advantage</li>
                  <li>Skills gap widens between workers and job requirements</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Opportunities:</h3>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>AI can augment human capabilities rather than replace</li>
                  <li>New industries and job categories emerge</li>
                  <li>Productivity gains can benefit all workers</li>
                  <li>Reskilling programs can bridge skill gaps</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Algorithmic Bias and Fairness */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Scale className="h-8 w-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Algorithmic Bias & Fairness</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                AI systems can perpetuate and amplify existing social biases, affecting
                hiring, lending, criminal justice, and other critical social systems.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Bias Sources:</h3>
                <ul className="list-disc list-inside text-yellow-700 space-y-1">
                  <li>Historical data reflecting past discrimination</li>
                  <li>Unrepresentative training datasets</li>
                  <li>Algorithmic design choices</li>
                  <li>Feedback loops reinforcing bias</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">MIT Research Findings:</h3>
                <p className="text-blue-700 text-sm">
                  Stanford researchers found that AI's impact on racial disparities in education
                  varies significantly, with predictive analytics rating racial minorities as
                  less likely to succeed academically, creating false alarms for Black and Latino
                  students at significantly higher rates (Stanford Law, June 2024).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hiring Bias Deep Dive */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <TrendingDown className="h-8 w-8 text-red-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">AI Hiring Bias: The Hidden Cost</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">The Problem</h3>
              <p className="text-gray-600 mb-4">
                Recent MIT research reveals that ChatGPT, when used for resume screening,
                shows a strong bias toward selecting the first candidate presented,
                regardless of qualifications.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Key Findings:</h4>
                <ul className="list-disc list-inside text-red-700 space-y-1 text-sm">
                  <li>86-100% selection rate for first-positioned candidates</li>
                  <li>Different demographic groups need varying "costs" to overcome bias</li>
                  <li>High-prestige credentials required to break through positional bias</li>
                  <li>Systematic disadvantage for certain racial groups</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">The Cost of Bias</h3>
              <p className="text-gray-600 mb-4">
                Candidates must invest in costly signals to overcome AI bias,
                perpetuating socioeconomic disparities in hiring.
              </p>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 text-sm">High-Cost Universities</h4>
                  <p className="text-blue-700 text-xs">Selection rate increases from 10% to 26%</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 text-sm">Expensive Extracurriculars</h4>
                  <p className="text-green-700 text-xs">Significant but less pronounced effect</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-purple-800 text-sm">Racial Disparities</h4>
                  <p className="text-purple-700 text-xs">Different groups need varying investment levels</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-white p-4 rounded-lg">
            <p className="text-gray-700 text-sm">
              <strong>Source:</strong> MIT Computational Law Report (February 2025): "First Come, First Hired?
              ChatGPT's Bias for The First Resume It Sees and the Cost for Candidates to Overcome Bias in AI Hiring Tools"
            </p>
          </div>
        </div>

        {/* Pro-Worker AI Vision */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-lg p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-6">Can We Have Pro-Worker AI?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Current Path: Automation-Focused</h3>
              <ul className="space-y-2 mb-4">
                <li>• Emphasis on labor displacement</li>
                <li>• Intrusive workplace surveillance</li>
                <li>• Benefits concentrated in few companies</li>
                <li>• Downward pressure on wages</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Better Path: Human-Complementary</h3>
              <ul className="space-y-2">
                <li>• AI augments human capabilities</li>
                <li>• Creates new occupational tasks</li>
                <li>• Levels up worker skills and expertise</li>
                <li>• Reduces inequality through empowerment</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Policy Recommendations</h3>
              <div className="space-y-3">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">1. Tax Equality</h4>
                  <p className="text-sm">Equalize tax rates on employing workers vs. owning equipment</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">2. Worker Protection</h4>
                  <p className="text-sm">Update OSHA rules to limit workplace surveillance</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">3. Research Funding</h4>
                  <p className="text-sm">Increase funding for human-complementary technology</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">4. AI Expertise Center</h4>
                  <p className="text-sm">Create federal AI center to guide policy</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-white bg-opacity-20 p-4 rounded-lg">
            <p className="text-sm">
              <strong>Source:</strong> MIT Shaping the Future of Work (September 2023):
              "Can We Have Pro-Worker AI? Choosing a path of machines in service of minds"
              by Daron Acemoglu, David Autor, and Simon Johnson
            </p>
          </div>
        </div>

        {/* Social Justice Framework */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <BookOpen className="h-8 w-8 text-indigo-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Social Justice Framework for AI</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Distributive Justice</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-800">Fair Access</h4>
                  <p className="text-gray-600 text-sm">Equal access to AI benefits and opportunities</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-800">Resource Sharing</h4>
                  <p className="text-gray-600 text-sm">Equitable distribution of AI-generated wealth</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-800">Opportunity Creation</h4>
                  <p className="text-gray-600 text-sm">AI should create new opportunities for all</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Procedural Justice</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-800">Transparent Processes</h4>
                  <p className="text-gray-600 text-sm">Clear, understandable AI decision-making</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-800">Inclusive Development</h4>
                  <p className="text-gray-600 text-sm">Diverse voices in AI system design</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-indigo-800">Accountability</h4>
                  <p className="text-gray-600 text-sm">Clear responsibility for AI outcomes</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recognition Justice</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="font-semibold text-pink-800">Cultural Respect</h4>
                  <p className="text-gray-600 text-sm">AI systems respect diverse cultures and values</p>
                </div>
                <div className="border-l-4 border-teal-500 pl-4">
                  <h4 className="font-semibold text-teal-800">Human Dignity</h4>
                  <p className="text-gray-600 text-sm">AI preserves and enhances human dignity</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-800">Community Voice</h4>
                  <p className="text-gray-600 text-sm">Communities have say in AI deployment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-6">Case Study: AI and Educational Inequality</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">The Challenge</h3>
              <p className="mb-4">
                AI tools in education risk exacerbating existing racial and socioeconomic
                disparities, particularly in predictive analytics and personalized learning systems.
              </p>
              <h3 className="text-xl font-semibold mb-3">Research Findings</h3>
              <ul className="space-y-2">
                <li>• Wisconsin's AI system had 42% higher false alarm rate for Black students</li>
                <li>• Predictive analytics often rate minorities as less likely to succeed</li>
                <li>• Digital divide limits access to AI educational tools</li>
                <li>• AI literacy gaps between wealthy and poor schools</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Positive Examples</h3>
              <ul className="space-y-2 mb-4">
                <li>• Pittsburgh's PL² system doubled math gains for marginalized students</li>
                <li>• AI tutoring systems providing personalized support</li>
                <li>• Language learning AI helping multilingual students</li>
                <li>• Accessibility tools for students with disabilities</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Solutions</h3>
              <ul className="space-y-2">
                <li>• Diverse AI development teams</li>
                <li>• Bias testing across demographic groups</li>
                <li>• Community involvement in AI deployment</li>
                <li>• Investment in digital infrastructure for all schools</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Framework */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Building Socially Just AI Systems</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">For Policymakers</h3>
              <div className="space-y-3">
                <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</span>
                  <span className="text-gray-700">Mandate algorithmic auditing for bias</span>
                </div>
                <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</span>
                  <span className="text-gray-700">Invest in digital infrastructure for all</span>
                </div>
                <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">3</span>
                  <span className="text-gray-700">Fund reskilling and education programs</span>
                </div>
                <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">4</span>
                  <span className="text-gray-700">Create inclusive AI governance frameworks</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">For Organizations</h3>
              <div className="space-y-3">
                <div className="flex items-center bg-green-50 p-3 rounded-lg">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</span>
                  <span className="text-gray-700">Build diverse AI development teams</span>
                </div>
                <div className="flex items-center bg-green-50 p-3 rounded-lg">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</span>
                  <span className="text-gray-700">Implement bias testing protocols</span>
                </div>
                <div className="flex items-center bg-green-50 p-3 rounded-lg">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">3</span>
                  <span className="text-gray-700">Engage communities in AI deployment</span>
                </div>
                <div className="flex items-center bg-green-50 p-3 rounded-lg">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">4</span>
                  <span className="text-gray-700">Prioritize human-complementary AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sources and References */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <ExternalLink className="h-8 w-8 text-gray-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Sources & References</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Research Studies</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• MIT Computational Law Report (February 2025): "First Come, First Hired? ChatGPT's Bias for The First Resume It Sees"</li>
                <li>• Stanford Law (June 2024): "How will AI Impact Racial Disparities in Education?"</li>
                <li>• MIT Sloan (March 2024): "Exploring the Effects of Generative AI on Inequality"</li>
                <li>• MIT News (December 2024): "Researchers reduce bias in AI models while preserving accuracy"</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Policy Reports</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• MIT Shaping the Future of Work (September 2023): "Can We Have Pro-Worker AI?"</li>
                <li>• United Nations (2024): "Mind the AI Divide: Shaping a Global Perspective on the Future of Work"</li>
                <li>• UNCTAD Technology and Innovation Report 2025: AI's $4.8 trillion future</li>
                <li>• UN Global Issues (2024): "Artificial Intelligence (AI)" - Social Impact section</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> This content synthesizes current research from leading institutions including MIT, Stanford,
              and UN organizations. The field of AI social impact is rapidly evolving, and findings are updated regularly
              as new research emerges and policy frameworks develop.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <a
            href="/articles/ai-ethics-healthcare"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            ← Previous: Healthcare Ethics
          </a>
          <a
            href="/articles/ai-ethics-global"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Next: Global Impact →
          </a>
        </div>
      </div>
    </div>
  );
}
