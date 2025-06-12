import React from 'react';
import { Palette, Brush, Music, Camera, BookOpen, ExternalLink } from 'lucide-react';

export default function AIEthicsArtsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 p-4 rounded-full">
              <Palette className="h-12 w-12 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            AI Ethics in Arts & Creativity
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Navigating the complex intersection of artificial intelligence and human creativity, 
            exploring questions of authorship, authenticity, and cultural preservation
          </p>
        </div>

        {/* Quote */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <blockquote className="text-xl italic text-gray-700 text-center">
            "The question is not whether machines can create art, but whether we can preserve 
            the human soul in creativity while embracing the possibilities of artificial intelligence."
          </blockquote>
          <p className="text-center text-gray-500 mt-4">
            — Dr. Ahmed Elgammal, Rutgers Art & AI Lab
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Creative Authenticity & Authorship */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Brush className="h-8 w-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Creative Authenticity & Authorship</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                When AI generates art, music, or literature, fundamental questions arise about 
                creativity, originality, and the nature of artistic expression itself.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Key Questions:</h3>
                <ul className="list-disc list-inside text-purple-700 space-y-1">
                  <li>Who is the true author of AI-generated art?</li>
                  <li>Can machines be truly creative or merely imitative?</li>
                  <li>How do we define "original" in the AI age?</li>
                  <li>What role does human intention play in creativity?</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Research Insight:</h3>
                <p className="text-yellow-700 text-sm">
                  MIT researchers found that while AI can generate novel combinations, 
                  human creativity involves intentionality, emotional expression, and 
                  cultural context that current AI systems lack (MIT Technology Review, 2024).
                </p>
              </div>
            </div>
          </div>

          {/* Cultural Appropriation & Heritage */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Camera className="h-8 w-8 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Cultural Heritage & Appropriation</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                AI systems trained on cultural works may reproduce artistic styles without 
                understanding their significance or obtaining proper permissions from communities.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">Cultural Concerns:</h3>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>Unauthorized use of indigenous art styles</li>
                  <li>Commercialization of sacred imagery</li>
                  <li>Loss of cultural context and meaning</li>
                  <li>Economic exploitation of traditional artists</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">UNESCO Guidelines:</h3>
                <p className="text-blue-700 text-sm">
                  UNESCO's 2024 report on "AI and Cultural Diversity" emphasizes the need 
                  for consent-based training data and benefit-sharing with cultural communities 
                  whose artistic traditions are used in AI systems.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Artist Rights Deep Dive */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Music className="h-8 w-8 text-green-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Artist Rights & Economic Impact</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Training Data Rights</h3>
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-800 text-sm">Current Issues</h4>
                  <p className="text-red-700 text-xs">Artists' works used without consent or compensation</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 text-sm">Legal Battles</h4>
                  <p className="text-yellow-700 text-xs">Multiple lawsuits against AI companies for copyright infringement</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 text-sm">Proposed Solutions</h4>
                  <p className="text-green-700 text-xs">Opt-in consent systems and royalty sharing models</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Market Disruption</h3>
              <div className="space-y-3">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-orange-800 text-sm">Job Displacement</h4>
                  <p className="text-orange-700 text-xs">Freelance illustrators and designers facing reduced demand</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-purple-800 text-sm">Price Competition</h4>
                  <p className="text-purple-700 text-xs">AI-generated art available at fraction of human artist costs</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 text-sm">New Markets</h4>
                  <p className="text-blue-700 text-xs">Opportunities in AI-human collaboration and AI art curation</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Creative Collaboration</h3>
              <div className="space-y-3">
                <div className="bg-teal-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-teal-800 text-sm">AI as Tool</h4>
                  <p className="text-teal-700 text-xs">Artists using AI for inspiration and rapid prototyping</p>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 text-sm">Hybrid Art Forms</h4>
                  <p className="text-indigo-700 text-xs">New artistic movements combining human and AI creativity</p>
                </div>
                <div className="bg-pink-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-pink-800 text-sm">Enhanced Accessibility</h4>
                  <p className="text-pink-700 text-xs">AI democratizing creative tools for disabled artists</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 text-sm">
              <strong>Sources:</strong> World Intellectual Property Organization (2024), 
              Artists Rights Society Economic Impact Report (2024), Creative Commons AI Study (2024)
            </p>
          </div>
        </div>

        {/* Case Study */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg shadow-lg p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-6">Case Study: The AI Art Competition Controversy</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">The Incident</h3>
              <p className="mb-4">
                In August 2022, Jason Allen's AI-generated artwork "Théâtre D'opéra Spatial" 
                won first place at the Colorado State Fair's fine arts competition, sparking 
                global debate about AI in creative competitions.
              </p>
              <h3 className="text-xl font-semibold mb-3">The Backlash</h3>
              <ul className="space-y-2">
                <li>• Artists felt their skills were devalued</li>
                <li>• Questions about fair competition arose</li>
                <li>• Calls for separate AI art categories</li>
                <li>• Debate over disclosure requirements</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Broader Implications</h3>
              <ul className="space-y-2 mb-4">
                <li>• Need for clear AI disclosure policies</li>
                <li>• Redefinition of artistic categories</li>
                <li>• Questions about human vs. AI creativity</li>
                <li>• Impact on art education and training</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Lessons Learned</h3>
              <ul className="space-y-2">
                <li>• Transparency is crucial in AI-assisted art</li>
                <li>• Competition rules need updating for AI era</li>
                <li>• Value of human creativity remains important</li>
                <li>• Need for inclusive dialogue about AI in arts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bias in Creative AI */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Bias in Creative AI Systems</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Types of Bias</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-800">Cultural Bias</h4>
                  <p className="text-gray-600 text-sm">
                    AI systems often default to Western artistic styles and may 
                    struggle with non-Western art forms and aesthetics
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-800">Gender Bias</h4>
                  <p className="text-gray-600 text-sm">
                    Historical art datasets underrepresent women artists, 
                    leading to biased AI outputs and style recognition
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-800">Racial Bias</h4>
                  <p className="text-gray-600 text-sm">
                    AI image generators may struggle with accurate representation 
                    of diverse ethnicities and skin tones
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-800">Socioeconomic Bias</h4>
                  <p className="text-gray-600 text-sm">
                    Training data skewed toward art from wealthy institutions 
                    and established artists, excluding grassroots creativity
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Mitigation Strategies</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 text-sm">1. Diverse Training Data</h4>
                  <p className="text-gray-600 text-xs">Include art from all cultures, genders, and backgrounds</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 text-sm">2. Inclusive Development Teams</h4>
                  <p className="text-gray-600 text-xs">Artists and developers from diverse backgrounds</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-purple-800 text-sm">3. Regular Bias Auditing</h4>
                  <p className="text-gray-600 text-xs">Systematic testing for cultural and demographic bias</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-orange-800 text-sm">4. Community Involvement</h4>
                  <p className="text-gray-600 text-xs">Engage cultural communities in AI development</p>
                </div>
                <div className="bg-teal-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-teal-800 text-sm">5. Transparent Documentation</h4>
                  <p className="text-gray-600 text-xs">Clear reporting of training data sources and limitations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical Framework */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <BookOpen className="h-8 w-8 text-indigo-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Ethical Framework for AI in Arts</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">For AI Developers</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 text-sm">1. Consent-Based Training</h4>
                  <p className="text-gray-600 text-xs">Obtain proper permissions for using artistic works</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 text-sm">2. Cultural Sensitivity</h4>
                  <p className="text-gray-600 text-xs">Implement cultural review processes</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-purple-800 text-sm">3. Attribution Systems</h4>
                  <p className="text-gray-600 text-xs">Provide clear attribution mechanisms</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-orange-800 text-sm">4. Artist Opt-Out</h4>
                  <p className="text-gray-600 text-xs">Enable artists to exclude their work from training</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">For Artists & Users</h3>
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-800 text-sm">1. Disclosure Requirements</h4>
                  <p className="text-gray-600 text-xs">Clearly label AI-assisted creative works</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 text-sm">2. Cultural Respect</h4>
                  <p className="text-gray-600 text-xs">Respect cultural boundaries and traditions</p>
                </div>
                <div className="bg-teal-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-teal-800 text-sm">3. Fair Compensation</h4>
                  <p className="text-gray-600 text-xs">Support fair compensation models for artists</p>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 text-sm">4. Ethical Dialogue</h4>
                  <p className="text-gray-600 text-xs">Engage in ongoing ethical discussions</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">For Institutions</h3>
              <div className="space-y-3">
                <div className="bg-pink-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-pink-800 text-sm">1. Clear Policies</h4>
                  <p className="text-gray-600 text-xs">Establish AI use policies for competitions and exhibitions</p>
                </div>
                <div className="bg-cyan-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-cyan-800 text-sm">2. Education Programs</h4>
                  <p className="text-gray-600 text-xs">Teach AI literacy in art education</p>
                </div>
                <div className="bg-lime-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-lime-800 text-sm">3. Support Systems</h4>
                  <p className="text-gray-600 text-xs">Provide resources for artists adapting to AI</p>
                </div>
                <div className="bg-rose-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-rose-800 text-sm">4. Inclusive Practices</h4>
                  <p className="text-gray-600 text-xs">Ensure diverse representation in AI art initiatives</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sources and References */}
        <div className="bg-gray-50 rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <ExternalLink className="h-8 w-8 text-gray-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Sources & References</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Arts & Technology Research</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• MIT Technology Review (2024): "The ethics of AI-generated art and creativity"</li>
                <li>• Nature Digital Medicine (2024): "Algorithmic bias in creative AI systems"</li>
                <li>• Journal of Digital Humanities (2024): "Cultural appropriation in AI art generation"</li>
                <li>• ACM Computing Surveys (2024): "Fairness and bias in generative AI models"</li>
                <li>• Rutgers Art & AI Lab (2024): "Human creativity vs. machine generation study"</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Creative Industry Reports</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• UNESCO (2024): "AI and Cultural Diversity: Protecting Creative Heritage"</li>
                <li>• World Intellectual Property Organization (2024): "AI and IP Rights in Creative Industries"</li>
                <li>• Creative Commons (2024): "The Future of Creative Attribution in the AI Era"</li>
                <li>• Artists Rights Society (2024): "Economic Impact of AI on Visual Artists"</li>
                <li>• International Association of Art Critics (2024): "AI Art Competition Guidelines"</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> This content draws from current research in digital humanities, technology ethics, 
              and creative industry reports. The intersection of AI and arts is a rapidly evolving field with ongoing 
              debates about creativity, authorship, and cultural preservation in the digital age.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <a 
            href="/awareness/ethics" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            ← Back to Ethics Hub
          </a>
          <a 
            href="/articles/ai-ethics-education" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Next: Education Ethics →
          </a>
        </div>
      </div>
    </div>
  );
} 