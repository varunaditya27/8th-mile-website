import { NextRequest, NextResponse } from 'next/server';
import { CFOrderRequest, CFCustomerDetails, CFOrderMeta } from 'cashfree-pg-sdk-nodejs';
import { getPass } from '@/data/passes';
import { cashfree, cfConfig } from '@/lib/cashfree';
import Order from '@/lib/models/Orders';
import { connectToDatabase } from '@/lib/db';
import Event from '@/lib/models/Event';

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const body = await req.json();
    
        if (body?.type === "pass") {
            const { passId, name, email, phone, merchantOrderId } = body?.data;
            const pass = getPass(passId);

            if (!pass) {
                return NextResponse.json(
                { success: false, message: 'Invalid pass selected' },
                { status: 400 }
                );
            }
        
            const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?payment_id=${merchantOrderId}`;
        
            // Create Cashfree payment request
            const orderRequest = new CFOrderRequest();
            orderRequest.orderId = merchantOrderId;
            orderRequest.orderAmount = pass.price;
            orderRequest.orderCurrency = 'INR';
            
            const customerDetails = new CFCustomerDetails();
            customerDetails.customerId = email.toLowerCase().replace(/[^a-z0-9]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
            customerDetails.customerName = name;
            customerDetails.customerEmail = email.toLowerCase();
            customerDetails.customerPhone = phone.trim();
            orderRequest.customerDetails = customerDetails;
            
            const orderMeta = new CFOrderMeta();
            orderMeta.returnUrl = redirectUrl;
            orderMeta.notifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify`;
            orderRequest.orderMeta = orderMeta;

            const response = await cashfree.orderCreate(cfConfig, orderRequest);
            console.log('Cashfree API response:', JSON.stringify(response, null, 2));
            console.log('Payment Session ID:', response?.cfOrder?.paymentSessionId);

            // Check if Cashfree response is valid
            if (!response || !response.cfOrder || !response.cfOrder.paymentSessionId) {
                console.error('Invalid Cashfree response:', response);
                return NextResponse.json(
                    { success: false, message: 'Failed to create Cashfree order', details: response },
                    { status: 500 }
                );
            }

            // Store payment session ID for use with Cashfree JS SDK
            const paymentMode = process.env.NEXT_PUBLIC_CASHFREE_MODE === 'production' ? 'production' : 'sandbox';

            // Create order in the database
            const order = new Order({
                _id: response.cfOrder.orderId,
                merchantOrderId,
                cashfreeOrderId: response.cfOrder.orderId,
                provider: 'cashfree',
                providerOrderId: response.cfOrder.orderId,
                paymentSessionId: response.cfOrder.paymentSessionId,
                currency: 'INR',
                mode: paymentMode,
                amount: pass.price,
                paymentStatus: 'PENDING',
                mailSent: false,
                name,
                email,
                phone,
                type: 'pass',
                classId: pass.id,
                noOfParticipants: 1,
                participantsData: [{ name, arrived: false }],
                rawPaymentResponse: response,
            });

            await order.save();

            return NextResponse.json(
                {
                    success: true,
                    paymentSessionId: response.cfOrder.paymentSessionId,
                    orderId: response.cfOrder.orderId
                },
                { status: 200 }
            );
        } else if(body?.type === "event"){
            const { eventId, name, email, phone, teamSize, teamMembers, feeType, totalAmount, merchantOrderId } = body?.data;
            const eventval = await Event.findById(eventId);
            if(!eventval){
                return NextResponse.json({success: false, message: "Invalid event selected"},{status: 400});
            }
            if(feeType!=eventval.feetype){
                return NextResponse.json({success: false, message: "Invalid fee type"},{status: 400});
            }
            if(feeType === 'individual'? (teamSize*eventval.registrationFee!=totalAmount):(eventval.registrationFee!=totalAmount)){
                return NextResponse.json({success: false, message: "Invalid total amount"},{status: 400});
            }
            const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?payment_id=${merchantOrderId}`;
            
            // Create Cashfree payment request
            const orderRequest = new CFOrderRequest();
            orderRequest.orderId = merchantOrderId;
            orderRequest.orderAmount = totalAmount;
            orderRequest.orderCurrency = 'INR';
            
            const customerDetails = new CFCustomerDetails();
            customerDetails.customerId = email.toLowerCase().replace(/[^a-z0-9]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
            customerDetails.customerName = name;
            customerDetails.customerEmail = email.toLowerCase();
            customerDetails.customerPhone = phone.trim();
            orderRequest.customerDetails = customerDetails;
            
            const orderMeta = new CFOrderMeta();
            orderMeta.returnUrl = redirectUrl;
            orderMeta.notifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify`;
            orderRequest.orderMeta = orderMeta;

            const response = await cashfree.orderCreate(cfConfig, orderRequest);
            console.log('Cashfree API response (event):', JSON.stringify(response, null, 2));

            // Check if Cashfree response is valid
            if (!response || !response.cfOrder || !response.cfOrder.paymentSessionId) {
                console.error('Invalid Cashfree response:', response);
                return NextResponse.json(
                    { success: false, message: 'Failed to create Cashfree order', details: response },
                    { status: 500 }
                );
            }

            // Store payment session ID for use with Cashfree JS SDK
            const paymentMode = process.env.NEXT_PUBLIC_CASHFREE_MODE === 'production' ? 'production' : 'sandbox';

            const order = new Order({
                _id: response.cfOrder.orderId,
                merchantOrderId,
                cashfreeOrderId: response.cfOrder.orderId,
                provider: 'cashfree',
                providerOrderId: response.cfOrder.orderId,
                paymentSessionId: response.cfOrder.paymentSessionId,
                currency: 'INR',
                mode: paymentMode,
                amount: totalAmount,
                paymentStatus: 'PENDING',
                mailSent: false,
                name,
                email,
                phone,
                type: 'event',
                classId: eventval.id,
                noOfParticipants: teamSize,
                participantsData: teamMembers.map((member:string) => ({ name: member, arrived: false })),
                rawPaymentResponse: response,
            });

            await order.save();

            return NextResponse.json(
                {
                    success: true,
                    paymentSessionId: response.cfOrder.paymentSessionId,
                    orderId: response.cfOrder.orderId
                },
                { status: 200 }
            );

        } else {
            return NextResponse.json({success: false, message: "Bad Req"},{status: 500})
        }

    } catch (error) {
        console.error('Error creating order:', error);
            return NextResponse.json(
                { success: false, message: 'Failed to create order' },
                { status: 500 }
            );
    }
}
