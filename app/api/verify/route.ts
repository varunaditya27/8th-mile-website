/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Order from "@/lib/models/Orders";
import Registration from "@/lib/models/Registrations";
import { connectToDatabase } from "@/lib/db";
import { sendEmail } from "@/lib/server-utils";

async function mailto(type: string, registration: any, paymentId: string) {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/verify?payment_id=${paymentId}`;
    let emailHtml, subject, plainText;

    if (type === "pass") {
        subject = `Payment Confirmation: ${paymentId}`;
        plainText = `Your payment of ₹${registration.amount} has been successfully processed for ${registration.classId}.`;
        emailHtml = `
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2c2c2c; padding: 24px;">
            <h1 style="color: #5a3e2b; font-size: 28px; margin-bottom: 16px;">Payment Confirmation</h1>
            <p style="font-size: 16px; margin-bottom: 12px;">Dear <strong style="color: #3c2f1c;">${registration.name}</strong>,</p>
            <p style="font-size: 16px; margin-bottom: 20px;">
                We are pleased to inform you that your payment of 
                <strong style="color: #5a3e2b;">₹${registration.amount}</strong> has been successfully processed for 
                <strong style="color: #5a3e2b;">${registration.classId}</strong>.
            </p>
            <ul style="list-style: none; padding: 0; font-size: 15px; margin-bottom: 20px;">
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Name:</strong> ${registration.name}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Email:</strong> ${registration.email}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Phone:</strong> ${registration.phone || "Not provided"}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Payment ID:</strong> ${paymentId}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Order ID:</strong> ${registration.orderId}</li>
            </ul>
            <p style="font-size: 16px; margin-bottom: 24px;">Thank you for your registration. We're excited to have you on board.</p>
            <p style="font-size: 16px;">You can verify your registration by clicking the button below:</p>
            <div style="margin-top: 16px;">
                <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #5a3e2b; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px;">
                    Verify Registration
                </a>
            </div>
            <p style="font-size: 14px; color: #777777; margin-top: 32px;">
                If you have any questions or need support, feel free to reply to this email.
            </p>
        </div>`;
    } else if (type === "event") {
        // Simplified event email handling
        subject = `Payment Confirmation: ${paymentId}`;
        plainText = `Your payment of ₹${Number(registration.amount)} has been successfully processed for ${registration.classId}.`;
        emailHtml = `
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2c2c2c; padding: 24px;">
            <h1 style="color: #5a3e2b; font-size: 28px; margin-bottom: 16px;">Payment Confirmation</h1>
            <p style="font-size: 16px; margin-bottom: 12px;">Dear <strong style="color: #3c2f1c;">${registration.name}</strong>,</p>
            <p style="font-size: 16px; margin-bottom: 20px;">
                We are pleased to inform you that your payment of 
                <strong style="color: #5a3e2b;">₹${registration.amount}</strong> has been successfully processed for 
                <strong style="color: #5a3e2b;">${registration.classId}</strong>.
            </p>
            <ul style="list-style: none; padding: 0; font-size: 15px; margin-bottom: 20px;">
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Name:</strong> ${registration.name}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Email:</strong> ${registration.email}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Phone:</strong> ${registration.phone || "Not provided"}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Payment ID:</strong> ${paymentId}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Order ID:</strong> ${registration.orderId}</li>
            </ul>
            <p style="font-size: 16px; margin-bottom: 12px;">
                <strong style="color: #4b3621;">Participants:</strong>
            </p>
            <ul style="list-style: none; padding: 0; font-size: 15px; margin-bottom: 20px;">
                ${registration.participantsData.map(
                        (memberName: string) =>
                            `<li style="margin-bottom: 8px;">${memberName.name}</li>`
                    )
                    .join("")}
            </ul>
            <p style="font-size: 16px; margin-bottom: 24px;">Thank you for your registration. We’re excited to have you on board.</p>

            <p style="font-size: 16px; margin-bottom: 24px;">Thank you for your registration. We're excited to have you on board.</p>
            <p style="font-size: 16px;">You can verify your registration by clicking the button below:</p>
            <div style="margin-top: 16px;">
                <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #5a3e2b; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px;">
                    Verify Registration
                </a>
            </div>
            <p style="font-size: 14px; color: #777777; margin-top: 32px;">
                If you have any questions or need support, feel free to reply to this email.
            </p>
        </div>`;
    }

    await sendEmail(registration.email, String(subject), String(plainText), String(emailHtml));
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('payment_id');

    if (!paymentId) {
        return NextResponse.json(
            { success: false, message: 'Missing payment_id parameter' },
            { status: 400 }
        );
    }

    try {
        await connectToDatabase();
        
        // Find the order first
        const order = await Order.findOne({ merchantOrderId: paymentId });
        if (!order) {
            return NextResponse.json(
                { success: false, message: 'Order not found' },
                { status: 404 }
            );
        }

        // Cashfree payment verification (sole payment provider)
        try {
            // Make direct API call to Cashfree to verify order status using merchantOrderId
            const cashfreeApiUrl = process.env.NEXT_PUBLIC_CASHFREE_MODE === 'production'
                ? 'https://api.cashfree.com/pg'
                : 'https://sandbox.cashfree.com/pg';
            
            const cashfreeResponse = await fetch(`${cashfreeApiUrl}/orders/${order.merchantOrderId}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'x-api-version': '2023-08-01',
                    'x-client-id': process.env.NEXT_PUBLIC_CASHFREE_CLIENT_ID as string,
                    'x-client-secret': process.env.CASHFREE_CLIENT_SECRET as string
                }
            });

            // remove console log in production
            if (!cashfreeResponse.ok) {
                console.error('Cashfree API error:', await cashfreeResponse.text());
                return NextResponse.json({ success: false, message: 'Payment verification failed' }, { status: 500 });
            }

            const cashfreeData = await cashfreeResponse.json();
            console.log('Cashfree order status:', cashfreeData.order_status);

            // Update cashfree status in database
            order.cashfreeStatus = cashfreeData.order_status;
            await order.save();

            if (cashfreeData.order_status === 'ACTIVE') {
                await new Promise(resolve => setTimeout(resolve, 5000));
                
                // retrying to fetch order status
                const retryResponse = await fetch(`${cashfreeApiUrl}/orders/${order.merchantOrderId}`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'x-api-version': '2023-08-01',
                        'x-client-id': process.env.NEXT_PUBLIC_CASHFREE_CLIENT_ID as string,
                        'x-client-secret': process.env.CASHFREE_CLIENT_SECRET as string
                    }
                });
                
                if (retryResponse.ok) {
                    const retryData = await retryResponse.json();
                    console.log('Retry check - Order status:', retryData.order_status);
                    
                    // Update cashfree status again
                    order.cashfreeStatus = retryData.order_status;
                    
                    if (retryData.order_status === 'PAID') {
                        console.log('Payment verified as PAID after retry');
                    } else if (retryData.order_status === 'ACTIVE') {
                        // Still processing, update status and redirect to failed page
                        order.paymentStatus = 'PENDING';
                        await order.save();
                        console.log('Payment still processing after retry');
                        return NextResponse.redirect(new URL(`/failed?payment_id=${paymentId}`, request.url));
                    } else {
                        // Any other status (FAILED, CANCELLED, etc.)
                        order.paymentStatus = 'FAILED';
                        await order.save();
                        console.log('Payment failed after retry:', retryData.order_status);
                        return NextResponse.redirect(new URL(`/failed?payment_id=${paymentId}`, request.url));
                    }
                } else {
                    return NextResponse.json({ 
                        success: false, 
                        message: 'Unable to verify payment status. Please try again.' 
                    }, { status: 500 });
                }
            } else if (cashfreeData.order_status !== 'PAID') {
                // Handle all non-PAID statuses: FAILED, CANCELLED, EXPIRED, etc.
                order.paymentStatus = 'FAILED';
                await order.save();
                console.log('Payment failed or order status unknown:', cashfreeData.order_status);
                return NextResponse.redirect(new URL(`/failed?payment_id=${paymentId}`, request.url));
            } else {
                console.log('Payment verified as PAID immediately');
            }
        } catch (cfError) {
            console.error('Cashfree verification error:', cfError);
            return NextResponse.json({ success: false, message: 'Payment verification failed' }, { status: 500 });
        }        
        
        // Update order payment status
        if (order.paymentStatus !== 'SUCCESS') {
            order.paymentStatus = 'SUCCESS';
        }
        
        // Check for existing registration
        const existingRegistration = await Registration.findOne({ orderId: order._id });
        if (existingRegistration) {
            return NextResponse.redirect(new URL(`/verify?payment_id=${order.merchantOrderId}`, request.url));
        }
        
        // Create new registration
        const registration = new Registration({
            _id: order.merchantOrderId,
            orderId: order._id,
            signature: order.merchantOrderId,
            name: order.name,
            email: order.email,
            phone: order.phone,
            amount: order.amount,
            type: order.type,
            classId: order.classId,
            noOfParticipants: order.noOfParticipants,
            participantsData: order.participantsData
        });
        
        await registration.save();
        
        // Send email if not already sent
        if (!order.mailSent) {
            console.log('Mail sent');
            await mailto(order.type, registration, paymentId);
            order.mailSent = true;
        }
        
        await order.save();
        return NextResponse.redirect(new URL(`/verify?payment_id=${order.merchantOrderId}`, request.url));

    } catch (error) {
        console.error('Error processing payment verification:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to process payment verification' },
            { status: 500 }
        );
    }
}