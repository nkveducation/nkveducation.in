import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Student from '@/models/Student';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';

  try {
    await dbConnect();
    
    const students = await Student.find({
      $or: [
        { fullName: { $regex: query, $options: 'i' } },
        { rollNo: { $regex: query, $options: 'i' } },
        { certificateNo: { $regex: query, $options: 'i' } },
        { phoneNo: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}