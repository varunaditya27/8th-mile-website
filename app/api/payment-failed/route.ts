/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Order from "@/lib/models/Orders";
import { connectToDatabase } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { paymentId } = body;

        if (!paymentId) {
            return NextResponse.json(
                { success: false, message: 'Missing payment_id parameter' },
                { status: 400 }
            );
        }

        await connectToDatabase();
        
        // Find the order
        const order = await Order.findOne({ merchantOrderId: paymentId });
        if (!order) {
            return NextResponse.json(
                { success: false, message: 'Order not found' },
                { status: 404 }
            );
        }

        // Verify payment status from Cashfree
        const cashfreeApiUrl = process.env.NEXT_PUBLIC_CASHFREE_MODE === 'production'
            ? 'https://api.cashfree.com/pg'
            : 'https://sandbox.cashfree.com/pg';
        
        const cashfreeResponse = await fetch(`${cashfreeApiUrl}/orders/${order.cashfreeOrderId}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'x-api-version': '2023-08-01',
                'x-client-id': process.env.NEXT_PUBLIC_CASHFREE_CLIENT_ID as string,
                'x-client-secret': process.env.CASHFREE_CLIENT_SECRET as string
            }
        });

        if (!cashfreeResponse.ok) {
            console.error('Cashfree API error:', await cashfreeResponse.text());
            return NextResponse.json({ 
                success: false, 
                message: 'Failed to verify payment status' 
            }, { status: 500 });
        }

        const cashfreeData = await cashfreeResponse.json();
        console.log('Payment failure check - Cashfree status:', cashfreeData.order_status);

        // Update cashfree status in database
        order.cashfreeStatus = cashfreeData.order_status;

        // Update order status based on Cashfree response
        if (cashfreeData.order_status === 'PAID') {
            order.paymentStatus = 'SUCCESS';
            await order.save();
            return NextResponse.json({
                success: true,
                status: 'PAID',
                message: 'Payment was actually successful'
            });
        } else {
            // For any non-PAID status (ACTIVE, FAILED, CANCELLED, EXPIRED, etc.)
            // Mark as FAILED since user landed on the failed page
            order.paymentStatus = 'FAILED';
            await order.save();
            return NextResponse.json({
                success: false,
                status: 'FAILED',
                message: 'Payment failed',
                cashfreeStatus: cashfreeData.order_status
            });
        }
    } catch (error) {
        console.error('Error checking payment failure:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to check payment status' },
            { status: 500 }
        );
    }
}
