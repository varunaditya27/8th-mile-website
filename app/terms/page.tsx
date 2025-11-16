import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen squiggly-bg text-gray-900 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">

        {/* Page Title */}
        <p className="sora text-4xl font-extrabold mb-8 text-center text-black">
          Terms & Conditions
        </p>
        
        <Card className="bg-white border border-gray-300 shadow-lg mb-8">
          <CardContent className="p-6">
            
            <p className="text-gray-600 mb-6">Last updated on May 8th 2025</p>
            
            <p className="mb-6 text-gray-800 leading-relaxed">
              For the purpose of these Terms and Conditions, the terms “we”, “us”, “our” refer to 
              <strong> MILAAP KREATIONS</strong>, whose registered/operational office is  
              B5 Golden Enclave Apartment, #5th Cross, 2nd Main Road, Soundarya Layout, 
              Bengaluru, Karnataka – 560073.  
              The terms “you”, “your”, “user”, “visitor” refer to any natural or legal person 
              visiting our website and/or agreeing to purchase from us.
            </p>
            
            <p className="mb-6 text-gray-800">
              Your use of this website and purchases from us are governed by the following Terms and Conditions:
            </p>

            <div className="space-y-8 text-gray-900">

              {/* 1 */}
              <div>
                <p className="text-gray-800">
                  The content of the pages on this website is subject to change without prior notice.
                </p>
              </div>
              
              {/* 2 */}
              <div>
                <p className="text-gray-800 leading-relaxed">
                  Neither we nor any third parties provide any warranty or guarantee as to the 
                  accuracy, timeliness, performance, completeness, or suitability of the information 
                  and materials found on this website for any particular purpose. You acknowledge that 
                  such information may contain inaccuracies or errors, and we expressly exclude 
                  liability for any such inaccuracies to the fullest extent permitted by law.
                </p>
              </div>
              
              {/* 3 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">3. Pass Purchase</p>
                <p className="text-gray-800">All passes are digital and delivered via email or QR code after successful payment.</p>
                <p className="text-gray-800 mt-1">Payments may be made using UPI, Credit/Debit Cards, Netbanking, or Wallets.</p>
                <p className="text-gray-800 mt-1">
                  By making a purchase, you agree that all sales are final and non-refundable, as 
                  outlined in our Refund Policy.
                </p>
              </div>
              
              {/* 4 */}
              <div>
                <p className="text-gray-800 leading-relaxed">
                  Our website contains materials that are owned by or licensed to us, including 
                  design, layout, appearance, and graphics. Reproduction is prohibited except in 
                  accordance with the copyright notice.
                </p>
              </div>
              
              {/* 5 */}
              <div>
                <p className="text-gray-800">
                  All trademarks reproduced on this website that are not the property of or licensed 
                  to the operator are acknowledged on the website.
                </p>
              </div>
              
              {/* 6 */}
              <div>
                <p className="text-gray-800">
                  Unauthorized use of information provided on this website may give rise to a claim 
                  for damages and/or be considered a criminal offense.
                </p>
              </div>

              {/* 7 */}
              <div>
                <p className="text-gray-800">
                  From time to time, our website may include links to other websites. These links 
                  are provided for your convenience and additional information.
                </p>
              </div>
              
              {/* 8 */}
              <div>
                <p className="text-gray-800">
                  You may not create a link to our website from another website or document without 
                  prior written consent from MILAAP KREATIONS.
                </p>
              </div>

              {/* 9 */}
              <div>
                <p className="text-gray-800">
                  Any disputes arising out of your usage of our website or purchase from us are 
                  subject to the laws of India.
                </p>
              </div>

              {/* 10 */}
              <div>
                <p className="text-gray-800 leading-relaxed">
                  We shall not be liable for any loss or damage resulting from the decline of 
                  authorization for any transaction due to the cardholder exceeding the preset 
                  limit agreed upon with the acquiring bank.
                </p>
              </div>

            </div>
            
            {/* Disclaimer */}
            <div className="mt-8 pt-6 border-t border-gray-300">
              <p className="sora font-extrabold text-[#001128] mb-1">Disclaimer:</p>
              <p className="text-gray-700 leading-relaxed">
                The content above is created at MILAAP KREATIONS' sole discretion. The payment 
                gateway provider is not liable for any content displayed here and is not responsible 
                for any claims that may arise from non-compliance by the merchant.
              </p>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
