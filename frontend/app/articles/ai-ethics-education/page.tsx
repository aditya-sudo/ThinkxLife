import React from 'react';
import { GraduationCap, Users, Shield, AlertTriangle, BookOpen, ExternalLink } from 'lucide-react';

export default function AIEthicsEducationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <GraduationCap className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            AI Ethics in Education
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ensuring AI empowers learning while protecting student rights, educational equity,
            and the irreplaceable value of human connection in education
          </p>
        </div>

        {/* Quote */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <blockquote className="text-xl italic text-gray-700 text-center">
            "AI in education should amplify human potential, not replace human connection.
            The goal is not to automate learning, but to personalize and democratize it."
          </blockquote>
          <p className="text-center text-gray-500 mt-4">
            — Dr. Rose Luckin, University College London
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Educational Equity & Access */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Educational Equity & Access</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                AI in education can either bridge or widen educational gaps, depending on
                implementation. The digital divide risks becoming an AI divide.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">Equity Risks:</h3>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>Unequal access to AI-powered educational tools</li>
                  <li>Bias against certain learning styles and cultures</li>
                  <li>Widening achievement gaps between schools</li>
                  <li>Language barriers in AI systems</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Stanford Research:</h3>
                <p className="text-green-700 text-sm">
                  Stanford researchers found that AI's impact on racial disparities varies significantly,
                  with predictive analytics creating false alarms for Black and Latino students at
                  higher rates, but also showing potential for reducing bias when properly designed
                  (Stanford Law, June 2024).
                </p>
              </div>
            </div>
          </div>

          {/* Student Privacy & Data Protection */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Student Privacy & Data Protection</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                Educational AI systems collect unprecedented amounts of data about students'
                learning patterns, creating detailed psychological profiles that could follow them for life.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Data Collection Reality:</h3>
                <ul className="list-disc list-inside text-yellow-700 space-y-1">
                  <li>Every click, pause, and mistake tracked</li>
                  <li>Emotional state monitoring through facial recognition</li>
                  <li>Predictive models about future academic performance</li>
                  <li>Long-term storage of sensitive learning data</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">FERPA Challenges:</h3>
                <p className="text-blue-700 text-sm">
                  The Family Educational Rights and Privacy Act (FERPA) was written before AI,
                  creating gaps in protection for student data used in machine learning systems
                  (U.S. Department of Education, 2024).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Integrity Deep Dive */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-8 w-8 text-orange-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Academic Integrity in the AI Age</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">The Challenge</h3>
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-800 text-sm">AI-Generated Content</h4>
                  <p className="text-red-700 text-xs">Essays, reports, and code that appear original but are AI-created</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-orange-800 text-sm">Detection Difficulties</h4>
                  <p className="text-orange-700 text-xs">Traditional plagiarism tools inadequate for AI-generated content</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 text-sm">Unclear Boundaries</h4>
                  <p className="text-yellow-700 text-xs">Students unsure what level of AI assistance is acceptable</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">New Approaches</h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 text-sm">Process-Based Assessment</h4>
                  <p className="text-green-700 text-xs">Focus on learning process rather than just final products</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 text-sm">AI Collaboration Disclosure</h4>
                  <p className="text-blue-700 text-xs">Require students to document AI tool usage</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-purple-800 text-sm">Oral Examinations</h4>
                  <p className="text-purple-700 text-xs">Real-time discussions to verify understanding</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Redefining Learning</h3>
              <div className="space-y-3">
                <div className="bg-teal-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-teal-800 text-sm">AI Literacy Skills</h4>
                  <p className="text-teal-700 text-xs">Teaching ethical AI use as core competency</p>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 text-sm">Critical Thinking</h4>
                  <p className="text-indigo-700 text-xs">Emphasis on evaluating and improving AI outputs</p>
                </div>
                <div className="bg-pink-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-pink-800 text-sm">Human-AI Collaboration</h4>
                  <p className="text-pink-700 text-xs">Preparing students for AI-augmented workplaces</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 text-sm">
              <strong>Sources:</strong> UNESCO AI and Education Report (2024),
              International Society for Technology in Education (2024), MIT Teaching Systems Lab (2024)
            </p>
          </div>
        </div>

        {/* AI Bias in Education */}
        <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg shadow-lg p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-6">AI Bias in Educational Systems</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Documented Bias Cases</h3>
              <div className="space-y-3">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">Wisconsin's AI System</h4>
                  <p className="text-sm">42% higher false alarm rate for Black students in dropout prediction</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">Grading Algorithms</h4>
                  <p className="text-sm">Bias against non-standard English and diverse writing styles</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">Recommendation Systems</h4>
                  <p className="text-sm">Steering students into tracks based on demographic assumptions</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Positive Examples</h3>
              <div className="space-y-3">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">Pittsburgh's PL² System</h4>
                  <p className="text-sm">Doubled math gains for marginalized students through personalized learning</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">AI Tutoring Systems</h4>
                  <p className="text-sm">Providing 24/7 support for students lacking access to human tutors</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <h4 className="font-semibold">Language Learning AI</h4>
                  <p className="text-sm">Helping multilingual students succeed in English-dominant systems</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-white bg-opacity-20 p-4 rounded-lg">
            <p className="text-sm">
              <strong>Source:</strong> Stanford Law (June 2024): "How will AI Impact Racial Disparities in Education?"
              and MIT CSAIL Bias in Educational AI Systems Study (2024)
            </p>
          </div>
        </div>

        {/* Human Element in AI Education */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">The Irreplaceable Human Element</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">What AI Excels At</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-800">Personalized Pacing</h4>
                  <p className="text-gray-600 text-sm">Adapting to individual learning speeds and styles</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-800">Instant Feedback</h4>
                  <p className="text-gray-600 text-sm">Immediate responses to student inputs and questions</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-800">24/7 Availability</h4>
                  <p className="text-gray-600 text-sm">Always accessible support for student learning</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-800">Data-Driven Insights</h4>
                  <p className="text-gray-600 text-sm">Analytics on learning patterns and progress</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">What Humans Excel At</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-800">Emotional Support</h4>
                  <p className="text-gray-600 text-sm">Empathy, encouragement, and emotional intelligence</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-800">Creative Inspiration</h4>
                  <p className="text-gray-600 text-sm">Sparking curiosity and innovative thinking</p>
                </div>
                <div className="border-l-4 border-teal-500 pl-4">
                  <h4 className="font-semibold text-teal-800">Moral Guidance</h4>
                  <p className="text-gray-600 text-sm">Teaching values, ethics, and character development</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-indigo-800">Cultural Context</h4>
                  <p className="text-gray-600 text-sm">Understanding diverse backgrounds and experiences</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Together</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="font-semibold text-pink-800">Augmented Teaching</h4>
                  <p className="text-gray-600 text-sm">AI handles routine tasks, teachers focus on high-value interactions</p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h4 className="font-semibold text-cyan-800">Personalized at Scale</h4>
                  <p className="text-gray-600 text-sm">AI enables individualized learning for every student</p>
                </div>
                <div className="border-l-4 border-lime-500 pl-4">
                  <h4 className="font-semibold text-lime-800">Data-Informed Decisions</h4>
                  <p className="text-gray-600 text-sm">Teachers use AI insights to improve instruction</p>
                </div>
                <div className="border-l-4 border-rose-500 pl-4">
                  <h4 className="font-semibold text-rose-800">Enhanced Creativity</h4>
                  <p className="text-gray-600 text-sm">AI tools amplify human creativity and innovation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg shadow-lg p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-6">Case Study: AI Grading Bias in Essay Assessment</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">The Problem</h3>
              <p className="mb-4">
                Research revealed that AI essay grading systems exhibit systematic bias against
                certain writing styles, cultural expressions, and non-native English speakers,
                potentially disadvantaging diverse students.
              </p>
              <h3 className="text-xl font-semibold mb-3">Specific Findings</h3>
              <ul className="space-y-2">
                <li>• AI trained on limited, homogeneous writing samples</li>
                <li>• Bias against African American Vernacular English</li>
                <li>• Preference for specific essay structures and vocabulary</li>
                <li>• Lack of cultural context understanding</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Impact on Students</h3>
              <ul className="space-y-2 mb-4">
                <li>• Lower grades for culturally diverse writing styles</li>
                <li>• Discouragement of authentic voice and expression</li>
                <li>• Reinforcement of educational inequities</li>
                <li>• Reduced confidence in academic abilities</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Solutions Implemented</h3>
              <ul className="space-y-2">
                <li>• Diverse training data from multiple cultural contexts</li>
                <li>• Regular bias auditing across demographic groups</li>
                <li>• Human oversight for final grade decisions</li>
                <li>• Multiple assessment methods beyond AI grading</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ethical Framework */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <BookOpen className="h-8 w-8 text-indigo-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Ethical AI in Education Framework</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">For Educators</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 text-sm">1. AI Literacy Development</h4>
                  <p className="text-gray-600 text-xs">Understand AI tools, capabilities, and limitations</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 text-sm">2. Integrated AI Education</h4>
                  <p className="text-gray-600 text-xs">Teach AI literacy alongside traditional subjects</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-purple-800 text-sm">3. Human Connection Priority</h4>
                  <p className="text-gray-600 text-xs">Maintain empathy and personal relationships</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-orange-800 text-sm">4. Student Privacy Advocacy</h4>
                  <p className="text-gray-600 text-xs">Protect and advocate for student data rights</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">For Institutions</h3>
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-800 text-sm">1. Data Governance</h4>
                  <p className="text-gray-600 text-xs">Implement strong data protection policies</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 text-sm">2. Equitable Access</h4>
                  <p className="text-gray-600 text-xs">Ensure all students have access to AI tools</p>
                </div>
                <div className="bg-teal-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-teal-800 text-sm">3. Bias Auditing</h4>
                  <p className="text-gray-600 text-xs">Regular testing of AI systems for bias</p>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 text-sm">4. Transparent Policies</h4>
                  <p className="text-gray-600 text-xs">Clear AI use policies and guidelines</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">For Students</h3>
              <div className="space-y-3">
                <div className="bg-pink-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-pink-800 text-sm">1. Ethical AI Use</h4>
                  <p className="text-gray-600 text-xs">Learn to use AI tools responsibly and ethically</p>
                </div>
                <div className="bg-cyan-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-cyan-800 text-sm">2. Data Rights Awareness</h4>
                  <p className="text-gray-600 text-xs">Understand personal data rights and privacy</p>
                </div>
                <div className="bg-lime-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-lime-800 text-sm">3. Critical AI Thinking</h4>
                  <p className="text-gray-600 text-xs">Develop skills to evaluate AI outputs critically</p>
                </div>
                <div className="bg-rose-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-rose-800 text-sm">4. Human Creativity Value</h4>
                  <p className="text-gray-600 text-xs">Appreciate unique human creativity and connection</p>
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
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Educational Research Studies</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Stanford Law (June 2024): "How will AI Impact Racial Disparities in Education?"</li>
                <li>• MIT CSAIL (2024): "Bias in Educational AI Systems: A Comprehensive Analysis"</li>
                <li>• Journal of Educational Technology & Society (2024): "AI Ethics in Personalized Learning"</li>
                <li>• Computers & Education (2024): "Digital divide and AI accessibility in schools"</li>
                <li>• University College London (2024): "Human-AI collaboration in education study"</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Educational Policy Reports</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• UNESCO (2024): "AI and Education: Guidance for Policy-makers"</li>
                <li>• U.S. Department of Education (2024): "Artificial Intelligence and the Future of Teaching and Learning"</li>
                <li>• OECD (2024): "Education at a Glance: AI Integration in Schools"</li>
                <li>• European Commission (2024): "Ethical Guidelines on the Use of AI in Education"</li>
                <li>• International Society for Technology in Education (2024): "AI Standards for Educators"</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> This content synthesizes current research from leading educational institutions,
              policy organizations, and academic journals. The field of AI in education is rapidly evolving,
              with new studies on bias, accessibility, and pedagogical effectiveness emerging regularly.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <a
            href="/articles/ai-ethics-arts"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            ← Previous: Arts Ethics
          </a>
          <a
            href="/articles/ai-ethics-healthcare"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Next: Healthcare Ethics →
          </a>
        </div>
      </div>
    </div>
  );
}
