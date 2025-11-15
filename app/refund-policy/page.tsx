import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function RefundPolicyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen squiggly-bg text-gray-900 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">

        {/* Title */}
        <p className="sora text-4xl font-extrabold mb-8 text-center text-black]">
          Cancellation and Refund Policy
        </p>
        
        <Card className="bg-white border border-gray-300 shadow-lg">
          <CardContent className="p-6">
            
            <p className="text-gray-600 mb-6">Effective Date: {currentDate}</p>
            
            <p className="mb-6 text-gray-800 leading-relaxed">
              This Cancellation and Refund Policy outlines the terms regarding cancellations 
              and refunds for passes purchased for 8th Mile, the official annual fest of RV 
              College of Engineering. By purchasing passes through our website, you acknowledge 
              and agree to the following terms:
            </p>
            
            <div className="space-y-8">

              {/* 1 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">1. No Cancellation</p>
                <p className="text-gray-800">All purchases made for 8th Mile event passes are final. Once a pass is booked, it cannot be canceled.</p>
                <p className="mt-2 text-gray-800">We do not provide any option to cancel your registration after completing the payment process.</p>
              </div>
              
              {/* 2 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">2. No Refund</p>
                <p className="text-gray-800">We maintain a strict no-refund policy. Refunds will not be provided under any circumstances, including:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-700">
                  <li>Change of mind</li>
                  <li>Inability to attend the fest</li>
                  <li>Duplicate purchases</li>
                  <li>Rescheduling due to unforeseen situations</li>
                  <li>Dissatisfaction with the event</li>
                </ul>
              </div>
              
              {/* 3 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">3. Exceptional Cases</p>
                <p className="text-gray-800">
                  In the rare case that the entire event is permanently canceled by the organizers, 
                  the refund process (if applicable) will be announced through official channels.
                </p>
                <p className="mt-2 text-gray-800">
                  Refunds (if any) in such cases will be processed within 30 business days to the 
                  original payment method.
                </p>
              </div>

              {/* 4 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">4. Transfer of Passes</p>
                <p className="text-gray-800">
                  Event passes are non-transferable and cannot be resold. The registered name must 
                  match the ID presented at the event entry.
                </p>
                <p className="mt-2 text-gray-800">
                  Any attempt to transfer or resell the pass may lead to invalidation without refund.
                </p>
              </div>

              {/* 5 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">5. Payment Issues</p>
                <p className="text-gray-800">
                  If you were charged for a failed transaction or made duplicate payments due to any 
                  technical issue, please reach out to our support team within 48 hours.
                </p>
                <p className="mt-2 text-gray-800">
                  Such cases will be reviewed individually, and resolution will be provided after 
                  verification.
                </p>
              </div>

              {/* 6 */}
              <div>
                <p className="sora text-xl font-extrabold text-[#001128] mb-2">6. Contact Information</p>
                <p className="text-gray-800">
                  For payment-related queries or concerns, please contact us with your transaction ID, 
                  order details, and payment receipt.
                </p>
                <p className="mt-2 text-gray-800">
                  Our team typically responds within 3–5 business days.
                </p>
              </div>
            </div>
            
            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-300">
              <p className="text-[#001128] font-semibold">For queries related to this policy, email:</p>
              <p className="text-gray-700">events_8thmile@rvce.edu.in</p>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}
