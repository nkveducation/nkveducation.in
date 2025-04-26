import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request) {
  // Debug: Log environment variables (remove after verification)
  console.log('Using Key ID:', process.env.RAZORPAY_KEY_ID);
  
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const { amount, currency = 'INR', receipt } = await request.json();
    
    if (!amount) {
      return NextResponse.json(
        { success: false, message: 'Amount is required' },
        { status: 400 }
      );
    }

    const options = {
      amount: Math.round(Number(amount)), // Ensure proper amount formatting
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({
      success: true,
      order,
    });

  } catch (error) {
    console.error('Razorpay Error:', {
      message: error.error?.description || error.message,
      code: error.statusCode,
      fullError: error
    });

    return NextResponse.json(
      { 
        success: false, 
        message: error.error?.description || 'Payment failed',
        code: error.statusCode 
      },
      { status: error.statusCode || 500 }
    );
  }
}