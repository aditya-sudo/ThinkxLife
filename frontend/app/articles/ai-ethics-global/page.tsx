import React from 'react';
import { Globe, Thermometer, Zap, Wifi, BookOpen, ExternalLink } from 'lucide-react';

export default function AIEthicsGlobalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Globe className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            AI Ethics in Global Impact
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding how artificial intelligence affects climate change, international development,
            digital divides, and global governance across nations and cultures
          </p>
        </div>

        {/* Quote */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <blockquote className="text-xl italic text-gray-700 text-center">
            "AI could contribute up to $4.8 trillion to the global economy by 2030, but this growth
            will be unevenly distributed, potentially widening the gap between developed and developing nations."
          </blockquote>
          <p className="text-center text-gray-500 mt-4">
            — UNCTAD Technology and Innovation Report 2025
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Climate Change and Environment */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Thermometer className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Climate Change & Environment</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                AI presents both opportunities and challenges for addressing climate change,
                with potential for optimization and monitoring, but also significant energy consumption.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Climate Solutions:</h3>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>Smart grid optimization reducing energy waste by 15%</li>
                  <li>Climate modeling and prediction accuracy improvements</li>
                  <li>Carbon capture and storage optimization</li>
                  <li>Precision agriculture reducing resource consumption</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">Environmental Costs:</h3>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>Data centers consume 1% of global electricity</li>
                  <li>Training large AI models emits tons of CO2</li>
                  <li>Semiconductor manufacturing environmental impact</li>
                  <li>E-waste from rapid hardware obsolescence</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Digital Divide and Access */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Wifi className="h-8 w-8 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Digital Divide & Access</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                The global digital divide risks creating an "AI divide" where developing nations
                are left behind in the AI revolution, exacerbating existing inequalities.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Access Barriers:</h3>
                <ul className="list-disc list-inside text-yellow-700 space-y-1">
                  <li>2.6 billion people still lack internet access</li>
                  <li>Limited computational infrastructure in developing countries</li>
                  <li>High costs of AI technology and expertise</li>
                  <li>Language barriers in AI systems</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">UN Findings:</h3>
                <p className="text-blue-700 text-sm">
                  The UN's "Mind the AI Divide" report (2024) warns that without intervention,
                  AI could widen global inequalities, with high-income countries capturing
                  most benefits while low-income nations face displacement without compensation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Consumption Deep Dive */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Zap className="h-8 w-8 text-yellow-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">AI's Energy Footprint: The Hidden Cost</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Training Phase</h3>
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-800 text-sm">GPT-3 Training</h4>
                  <p className="text-red-700 text-xs">1,287 MWh of electricity</p>
                  <p className="text-red-700 text-xs">552 tons of CO2 equivalent</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-orange-800 text-sm">Large Language Models</h4>
                  <p className="text-orange-700 text-xs">Up to 626,000 pounds of CO2</p>
                  <p className="text-orange-700 text-xs">Equivalent to 5 cars' lifetime emissions</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Inference Phase</h3>
              <div className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 text-sm">ChatGPT Daily Usage</h4>
                  <p className="text-yellow-700 text-xs">564 MWh per day</p>
                  <p className="text-yellow-700 text-xs">Powering 18,000 homes</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 text-sm">Google Search vs AI</h4>
                  <p className="text-blue-700 text-xs">AI search uses 10x more energy</p>
                  <p className="text-blue-700 text-xs">Per query comparison</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Centers</h3>
              <div className="space-y-3">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-purple-800 text-sm">Global Impact</h4>
                  <p className="text-purple-700 text-xs">1% of global electricity</p>
                  <p className="text-purple-700 text-xs">Growing 20-30% annually</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 text-sm">Efficiency Gains</h4>
                  <p className="text-green-700 text-xs">Google's PUE: 1.1</p>
                  <p className="text-green-700 text-xs">Industry average: 1.6</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-white p-4 rounded-lg">
            <p className="text-gray-700 text-sm">
              <strong>Sources:</strong> MIT Technology Review (2024), Nature Climate Change (2024),
              International Energy Agency AI and Energy Report (2024)
            </p>
          </div>
        </div>

        {/* Global AI Governance */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-6">Global AI Governance: A Patchwork Approach</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Regional Approaches</h3>
              <div className="space-y-3">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">European Union</h4>
                  <p className="text-sm">AI Act (2024): Comprehensive risk-based regulation</p>
                  <p className="text-sm">Focus on fundamental rights and safety</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">United States</h4>
                  <p className="text-sm">Executive Order on AI (2023): Federal coordination</p>
                  <p className="text-sm">Emphasis on innovation and competitiveness</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">China</h4>
                  <p className="text-sm">AI regulations for algorithms and data</p>
                  <p className="text-sm">State-led development approach</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Global Challenges</h3>
              <ul className="space-y-2 mb-4">
                <li>• Lack of international coordination</li>
                <li>• Different cultural values and priorities</li>
                <li>• Regulatory fragmentation</li>
                <li>• Cross-border data flows</li>
                <li>• AI arms race concerns</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">International Initiatives</h3>
              <ul className="space-y-2">
                <li>• UN AI Advisory Body (2024)</li>
                <li>• OECD AI Principles</li>
                <li>• Partnership on AI</li>
                <li>• Global Partnership on AI (GPAI)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Developing Nations Impact */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">AI Impact on Developing Nations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Challenges</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-800">Economic Displacement</h4>
                  <p className="text-gray-600 text-sm">
                    Manufacturing jobs at risk from automation, affecting countries
                    dependent on labor-intensive industries
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-800">Brain Drain</h4>
                  <p className="text-gray-600 text-sm">
                    AI talent migration to developed countries, leaving developing
                    nations with limited expertise
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-800">Infrastructure Gap</h4>
                  <p className="text-gray-600 text-sm">
                    Limited internet connectivity, electricity, and computational
                    resources needed for AI adoption
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-800">Data Colonialism</h4>
                  <p className="text-gray-600 text-sm">
                    Extraction of data from developing countries to train AI systems
                    that primarily benefit developed nations
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Opportunities</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-800">Leapfrogging</h4>
                  <p className="text-gray-600 text-sm">
                    Skip traditional infrastructure development stages using
                    AI-powered mobile and cloud solutions
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-800">Healthcare Access</h4>
                  <p className="text-gray-600 text-sm">
                    AI diagnostics and telemedicine bringing healthcare to
                    remote and underserved populations
                  </p>
                </div>
                <div className="border-l-4 border-teal-500 pl-4">
                  <h4 className="font-semibold text-teal-800">Agricultural Innovation</h4>
                  <p className="text-gray-600 text-sm">
                    Precision farming and crop monitoring improving food security
                    and farmer incomes
                  </p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-indigo-800">Financial Inclusion</h4>
                  <p className="text-gray-600 text-sm">
                    AI-powered fintech solutions providing banking and credit
                    access to unbanked populations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study: Kenya's AI Agriculture */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-lg p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-6">Case Study: AI Transforming Agriculture in Kenya</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">The Innovation</h3>
              <p className="mb-4">
                iCow, a Kenyan startup, uses AI and SMS technology to provide
                farmers with personalized agricultural advice, weather forecasts,
                and market prices via basic mobile phones.
              </p>
              <h3 className="text-xl font-semibold mb-3">Impact Metrics</h3>
              <ul className="space-y-2">
                <li>• 2+ million farmers reached across East Africa</li>
                <li>• 30% increase in crop yields reported</li>
                <li>• 25% reduction in farming costs</li>
                <li>• Works on basic feature phones (no smartphone required)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Key Success Factors</h3>
              <ul className="space-y-2 mb-4">
                <li>• Local language support (Swahili, English)</li>
                <li>• SMS-based interface for universal access</li>
                <li>• Partnership with local agricultural experts</li>
                <li>• Integration with existing mobile money systems</li>
                <li>• Focus on smallholder farmers' specific needs</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Lessons Learned</h3>
              <ul className="space-y-2">
                <li>• Technology must be accessible and affordable</li>
                <li>• Local partnerships are crucial for adoption</li>
                <li>• Cultural context matters in AI design</li>
                <li>• Simple solutions can have massive impact</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 bg-white bg-opacity-20 p-4 rounded-lg">
            <p className="text-sm">
              <strong>Source:</strong> GSMA Mobile for Development (2024),
              UN Sustainable Development Goals AI Impact Report (2024)
            </p>
          </div>
        </div>

        {/* Global Action Framework */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <BookOpen className="h-8 w-8 text-indigo-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Framework for Ethical Global AI</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">International Cooperation</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 text-sm">1. Global AI Governance</h4>
                  <p className="text-gray-600 text-xs">Establish international AI standards and protocols</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 text-sm">2. Technology Transfer</h4>
                  <p className="text-gray-600 text-xs">Share AI benefits with developing nations</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-purple-800 text-sm">3. Capacity Building</h4>
                  <p className="text-gray-600 text-xs">Invest in global AI education and training</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Environmental Responsibility</h3>
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-800 text-sm">1. Green AI</h4>
                  <p className="text-gray-600 text-xs">Develop energy-efficient AI algorithms</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 text-sm">2. Carbon Accounting</h4>
                  <p className="text-gray-600 text-xs">Measure and report AI carbon footprints</p>
                </div>
                <div className="bg-teal-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-teal-800 text-sm">3. Renewable Energy</h4>
                  <p className="text-gray-600 text-xs">Power AI infrastructure with clean energy</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Inclusive Development</h3>
              <div className="space-y-3">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-orange-800 text-sm">1. Digital Infrastructure</h4>
                  <p className="text-gray-600 text-xs">Expand internet and computing access globally</p>
                </div>
                <div className="bg-pink-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-pink-800 text-sm">2. Local Solutions</h4>
                  <p className="text-gray-600 text-xs">Develop AI for local contexts and languages</p>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 text-sm">3. Benefit Sharing</h4>
                  <p className="text-gray-600 text-xs">Ensure AI profits benefit all stakeholders</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future Scenarios */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg shadow-lg p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-6">Future Scenarios: Two Paths Forward</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Scenario 1: AI Divide Widens</h3>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Characteristics:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Developed nations capture 80% of AI benefits</li>
                  <li>• Massive job displacement in developing countries</li>
                  <li>• Increased global inequality and social unrest</li>
                  <li>• Environmental degradation from unchecked AI growth</li>
                  <li>• Digital colonialism and data exploitation</li>
                </ul>
              </div>
              <p className="text-sm">
                <strong>Probability:</strong> High without coordinated global action
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Scenario 2: Inclusive AI Future</h3>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Characteristics:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• AI benefits shared equitably across nations</li>
                  <li>• Successful leapfrogging in developing countries</li>
                  <li>• Reduced global inequality through AI empowerment</li>
                  <li>• Green AI solutions addressing climate change</li>
                  <li>• Collaborative global AI governance</li>
                </ul>
              </div>
              <p className="text-sm">
                <strong>Requirements:</strong> Strong international cooperation and policy intervention
              </p>
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
              <h3 className="text-lg font-semibold text-gray-800 mb-3">International Reports</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• United Nations (2024): "Mind the AI Divide: Shaping a Global Perspective on the Future of Work"</li>
                <li>• UNCTAD Technology and Innovation Report 2025: "AI's $4.8 trillion future"</li>
                <li>• UN Global Issues (2024): "Artificial Intelligence (AI)" - Global Impact section</li>
                <li>• GSMA Mobile for Development (2024): "AI for Agriculture in Africa"</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Research & Analysis</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• MIT Technology Review (2024): "The Carbon Footprint of AI"</li>
                <li>• Nature Climate Change (2024): "AI Energy Consumption Trends"</li>
                <li>• International Energy Agency (2024): "AI and Energy Report"</li>
                <li>• Oxford Internet Institute (2024): "Global AI Governance Survey"</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> This content synthesizes current research from international organizations,
              academic institutions, and policy think tanks. The global AI landscape is rapidly evolving,
              with new developments in governance, technology, and international cooperation emerging regularly.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <a
            href="/articles/ai-ethics-social"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            ← Previous: Social Impact
          </a>
          <a
            href="/awareness/ethics"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Ethics Hub →
          </a>
        </div>
      </div>
    </div>
  );
}
