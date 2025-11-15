import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function DeliveryPolicyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen squiggly-bg text-gray-900 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">

        <p className="sora font-extrabold text-4xl mb-8 text-center text-black">
          Shipping and Delivery Policy
        </p>
        
        <Card className="bg-white border border-gray-300 shadow-lg">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-6">Effective Date: {currentDate}</p>

            <p className="mb-6 text-gray-800">
              This Shipping and Delivery Policy outlines the terms regarding the delivery of event passes purchased for 8th Mile, the official annual fest of RV College of Engineering. By purchasing passes through our website, you acknowledge and agree to the following terms:
            </p>
            
            <div className="space-y-6 text-gray-900">
              
              <div>
                <p className="sora text-xl font-bold text-[#001128] mb-2">1. No Physical Shipping</p>
                <p>8th Mile does not ship any physical goods. All purchases made on the website are strictly for digital event passes.</p>
                <p>No physical tickets will be mailed to any address provided during registration.</p>
              </div>
              
              <div>
                <p className="sora text-xl font-bold text-[#001128] mb-2">2. Delivery of Passes</p>
                <p>After successful payment, the event pass will be delivered to the user’s email address or made available as a QR code on the confirmation page.</p>
                <p className="mt-2">Email delivery typically occurs within 15 minutes of payment. In rare cases, it may take up to 24 hours.</p>
                <p className="mt-2">Ensure that the email provided is correct at the time of purchase. We are not responsible for passes delivered to incorrectly entered email addresses.</p>
              </div>
              
              <div>
                <p className="sora text-xl font-bold text-[#001128] mb-2">3. Accessing Your Pass</p>
                <p>You can access your digital pass in the following ways:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-700">
                  <li>Through the confirmation email</li>
                  <li>By logging into your account on the website</li>
                  <li>By visiting the verification page with your payment ID</li>
                </ul>
                <p className="mt-2">We recommend saving your QR code or keeping the email accessible on your phone.</p>
              </div>

              <div>
                <p className="sora text-xl font-bold text-[#001128] mb-2">4. Delivery Issues</p>
                <p>If you do not receive your pass within 24 hours, first check your spam/junk folder.</p>
                <p className="mt-2">If you still cannot locate your pass, contact our support team with your transaction ID.</p>
              </div>

              <div>
                <p className="sora text-xl font-bold text-[#001128] mb-2">5. Technical Requirements</p>
                <p>To access and use your digital pass, you need:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-1 text-gray-700">
                  <li>A smartphone with a working display</li>
                  <li>Internet access to retrieve your pass</li>
                  <li>Sufficient battery to display your pass at entry</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-300">
              <p className="text-[#001128] font-semibold">For any delivery-related issues, contact us:</p>
              <p className="text-gray-700">events_8thmile@rvce.edu.in</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
