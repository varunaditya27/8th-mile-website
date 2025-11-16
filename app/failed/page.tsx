// src/app/payment/failed/page.tsx
'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FailedPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!paymentId) {
        setIsChecking(false);
        return;
      }

      try {
        const response = await fetch('/api/payment-failed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId })
        });

        const data = await response.json();
        console.log('Payment status check:', data);

        if (data.success && data.status === 'PAID') {
          // Payment was actually successful, redirect to verify page
          window.location.href = `/api/verify?payment_id=${paymentId}`;
        } else {
          // Payment failed or pending, stay on this page
          setIsChecking(false);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setIsChecking(false);
      }
    };

    checkPaymentStatus();
  }, [paymentId]);
  
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="max-w-md w-full bg-card p-8 shadow-lg rounded-lg border-2 border-muted/20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-foreground">Verifying payment status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full bg-card p-8 shadow-lg rounded-lg border-2 border-muted/20">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-red-100 rounded-full mb-4">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Payment Failed</h2>
          <p className="text-muted-foreground mt-1">
            We couldn&apos;t process your payment
          </p>
          {paymentId && (<p className="text-muted-foreground mt-1">
            Reference id: {paymentId}
          </p>)}
        </div>

        <div className="bg-muted/20 p-4 rounded my-4">
          <p className="text-foreground">
            If any amount was deducted from your account, it will be returned within 30 business days.
            For further queries, please contact our support team.
          </p>
        </div>

        <div className="text-center mt-6 space-y-3">
          
          <Link
            href="/contact"
            className="inline-block w-full py-2 px-4 border border-border rounded hover:bg-muted/20"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}