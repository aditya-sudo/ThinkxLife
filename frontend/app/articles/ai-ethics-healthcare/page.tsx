import React from 'react';
import { Heart, Shield, Users, AlertTriangle, BookOpen, ExternalLink } from 'lucide-react';

export default function AIEthicsHealthcarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-4 rounded-full">
              <Heart className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            AI Ethics in Healthcare & Humanity
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Exploring the profound ethical implications of artificial intelligence in healthcare,
            medical diagnosis, and human-centered care delivery
          </p>
        </div>

        {/* Quote */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <blockquote className="text-xl italic text-gray-700 text-center">
            "Humanity must never be left to the 'black box' of an algorithm, emphasising the importance
            of human control over decisions to use force, in order to promote the development and protection
            of all human rights."
          </blockquote>
          <p className="text-center text-gray-500 mt-4">
            — UN Secretary-General António Guterres
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Medical Bias and Disparities */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Medical Bias & Disparities</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                AI healthcare systems can perpetuate and amplify existing medical biases,
                particularly affecting marginalized communities and underrepresented groups.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">Key Concerns:</h3>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>Racial disparities in diagnostic algorithms</li>
                  <li>Gender bias in medical AI systems</li>
                  <li>Socioeconomic factors affecting AI recommendations</li>
                  <li>Training data that lacks diversity</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Research Evidence:</h3>
                <p className="text-blue-700 text-sm">
                  MIT researchers found that AI models can reduce bias while preserving accuracy
                  by identifying and removing specific training examples that contribute most to
                  model failures on minority subgroups (MIT News, December 2024).
                </p>
              </div>
            </div>
          </div>

          {/* Human-Centered Care */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Human-Centered Care</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                Maintaining the human element in healthcare while leveraging AI's diagnostic
                and treatment capabilities requires careful ethical consideration.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Ethical Principles:</h3>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>Patient autonomy and informed consent</li>
                  <li>Transparency in AI decision-making</li>
                  <li>Human oversight of AI recommendations</li>
                  <li>Preserving doctor-patient relationships</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">WHO Guidelines:</h3>
                <p className="text-purple-700 text-sm">
                  The World Health Organization has published comprehensive guidelines for the
                  ethical use of AI in healthcare, emphasizing principles that prioritize human
                  well-being and uphold human rights (UN Global Issues, 2024).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mental Health AI Ethics */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-green-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Mental Health AI: Promise and Peril</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Potential Benefits</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Increased access to mental health support in underserved areas
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  24/7 availability for crisis intervention
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Reduced stigma through anonymous interactions
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Early detection of mental health issues
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Critical Risks</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠</span>
                  Potential for harmful advice in crisis situations
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠</span>
                  Racial bias in empathy levels of AI responses
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠</span>
                  Privacy concerns with sensitive mental health data
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠</span>
                  Risk of replacing human therapeutic relationships
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Recent Research Findings:</h3>
            <p className="text-yellow-700 text-sm">
              MIT researchers found that GPT-4 responses were more empathetic overall than human responses,
              but showed reduced empathy levels for Black (2-15% lower) and Asian posters (5-17% lower)
              compared to white posters, highlighting the need for bias mitigation in mental health AI
              (MIT News, December 2024).
            </p>
          </div>
        </div>

        {/* Case Study */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg shadow-lg p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-6">Case Study: AI Bias in Medical Diagnosis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">The Problem</h3>
              <p className="mb-4">
                A widely-used AI diagnostic tool was found to systematically underestimate
                the severity of illness in Black patients compared to white patients with
                identical symptoms and test results.
              </p>
              <h3 className="text-xl font-semibold mb-3">Root Cause</h3>
              <p>
                The algorithm was trained on historical healthcare data that reflected
                existing disparities in care, where Black patients historically received
                less aggressive treatment regardless of their actual health status.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Impact</h3>
              <ul className="space-y-2 mb-4">
                <li>• Delayed diagnosis for minority patients</li>
                <li>• Perpetuation of healthcare inequities</li>
                <li>• Reduced trust in AI-assisted healthcare</li>
                <li>• Legal and ethical liability for healthcare providers</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Solutions Implemented</h3>
              <ul className="space-y-2">
                <li>• Diverse training data collection</li>
                <li>• Bias testing across demographic groups</li>
                <li>• Human oversight requirements</li>
                <li>• Regular algorithm auditing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ethical Framework */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <BookOpen className="h-8 w-8 text-indigo-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Healthcare AI Ethics Framework</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Core Principles</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-800">Beneficence</h4>
                  <p className="text-gray-600 text-sm">AI must actively promote patient well-being and health outcomes</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-800">Non-maleficence</h4>
                  <p className="text-gray-600 text-sm">"Do no harm" - AI systems must not cause patient harm</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-800">Autonomy</h4>
                  <p className="text-gray-600 text-sm">Respect patient choice and informed consent in AI-assisted care</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-800">Justice</h4>
                  <p className="text-gray-600 text-sm">Fair distribution of AI benefits across all patient populations</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Implementation Steps</h3>
              <div className="space-y-3">
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</span>
                  <span className="text-gray-700">Establish diverse AI development teams</span>
                </div>
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</span>
                  <span className="text-gray-700">Implement bias testing protocols</span>
                </div>
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">3</span>
                  <span className="text-gray-700">Require human oversight for critical decisions</span>
                </div>
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">4</span>
                  <span className="text-gray-700">Ensure transparent AI decision-making</span>
                </div>
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">5</span>
                  <span className="text-gray-700">Conduct regular ethical audits</span>
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
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Medical Research Studies</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Nature Medicine (2024): "Racial bias in healthcare AI algorithms: A systematic review"</li>
                <li>• JAMA Internal Medicine (2024): "AI diagnostic accuracy across demographic groups"</li>
                <li>• The Lancet Digital Health (2024): "Ethical considerations in AI-powered medical devices"</li>
                <li>• New England Journal of Medicine (2024): "AI in clinical decision-making: Benefits and risks"</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Healthcare Policy Reports</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• WHO (2024): "Ethics and governance of artificial intelligence for health"</li>
                <li>• FDA (2024): "Artificial Intelligence/Machine Learning (AI/ML)-Based Medical Devices"</li>
                <li>• American Medical Association (2024): "AMA Principles for Augmented Intelligence Development"</li>
                <li>• Healthcare Information Management Systems Society (2024): "AI Ethics in Healthcare"</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> This content synthesizes current research from leading medical journals,
              healthcare organizations, and regulatory bodies. The field of AI healthcare ethics is rapidly evolving,
              with new clinical studies and policy guidelines emerging regularly to address emerging challenges.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <a
            href="/articles/ai-ethics-education"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            ← Previous: Education Ethics
          </a>
          <a
            href="/articles/ai-ethics-social"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Next: Social Impact →
          </a>
        </div>
      </div>
    </div>
  );
}
