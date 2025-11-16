import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen squiggly-bg text-gray-900 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">

        {/* Page Title */}
        <p className="sora text-4xl font-extrabold mb-8 text-center text-black">
          Privacy Policy
        </p>
        
        <Card className="bg-white border border-gray-300 shadow-lg">
          <CardContent className="p-6">
            
            <p className="text-gray-600 mb-6">Effective Date: {currentDate}</p>
            
            <p className="mb-6 text-gray-800 leading-relaxed">
              This Privacy Policy describes how 8th Mile, the official annual fest of RV College of Engineering, 
              collects, uses, and protects your personal information when you use our website or register for events. 
              By continuing to use this website, you consent to the practices described in this policy.
            </p>
            
            {/* Sections */}
            <div className="space-y-8">

              {/* 1 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">1. Information We Collect</p>
                <p className="text-gray-800">We may collect the following information:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-700">
                  <li>Name, email address, phone number, and institution name</li>
                  <li>Payment information (processed securely by Razorpay; we do not store card details)</li>
                  <li>Team member details for team registrations</li>
                  <li>Usage data such as IP address, browser type, device info, and site activity</li>
                </ul>
              </div>

              {/* 2 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">2. How We Use Your Information</p>
                <p className="text-gray-800">Your information may be used to:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-700">
                  <li>Process registrations and generate digital passes</li>
                  <li>Confirm your identity during event check-in</li>
                  <li>Provide event-related updates and communication</li>
                  <li>Improve website functionality and user experience</li>
                  <li>Send promotional material about future events (optional)</li>
                </ul>
              </div>

              {/* 3 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">3. Information Sharing</p>
                <p className="text-gray-800">We may share your information with:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-700">
                  <li>Event organizers and volunteers for event management</li>
                  <li>Trusted service providers that support our operations</li>
                  <li>Government or legal authorities when required</li>
                </ul>
                <p className="mt-2 text-gray-800">
                  We do <strong>not</strong> sell or rent your personal information to third parties.
                </p>
              </div>

              {/* 4 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">4. Data Security</p>
                <p className="text-gray-800">
                  We implement reasonable technical safeguards to protect your information. 
                  However, no method of online transmission or storage is completely secure.
                </p>
              </div>

              {/* 5 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">5. Third-Party Services</p>
                <p className="text-gray-800">Our platform relies on third-party services such as:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-700">
                  <li>Razorpay – Payment Processing</li>
                  <li>Email providers – Communication & verification</li>
                </ul>
                <p className="mt-2 text-gray-800">These services have their own privacy policies that you should review.</p>
              </div>

              {/* 6 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">6. Your Rights</p>
                <p className="text-gray-800">You have the right to:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-700">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion (subject to legal requirements)</li>
                  <li>Opt out of promotional communications</li>
                </ul>
              </div>

              {/* 7 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">7. Cookies and Tracking</p>
                <p className="text-gray-800">
                  We use cookies to enhance your browsing experience. 
                  You may disable cookies via your browser settings, but some features may be affected.
                </p>
              </div>

              {/* 8 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">8. Changes to This Policy</p>
                <p className="text-gray-800">
                  We may update this Privacy Policy periodically. 
                  Any revisions will be posted on this page with an updated effective date.
                </p>
              </div>

              {/* 9 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">9. Contact Us</p>
                <p className="text-gray-800">
                  For questions or concerns regarding this Privacy Policy, reach out to us at:
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-300">
              <p className="text-[#001128] font-semibold">Email:</p>
              <p className="text-gray-700">events_8thmile@rvce.edu.in</p>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
