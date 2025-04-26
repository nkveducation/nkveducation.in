import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, formData, plan } = await req.json();

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  const isValid = generatedSignature === razorpay_signature;

  if (!isValid) {
    return NextResponse.json(
      { success: false, error: "Invalid signature" },
      { status: 400 }
    );
  }

  // Save to database here (optional)
  // await savePaymentToDB({ payment_id: razorpay_payment_id, ...formData });

  return NextResponse.json({
    success: true,
    paymentId: razorpay_payment_id
  });
}