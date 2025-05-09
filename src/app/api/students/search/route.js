import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Student from '@/models/Student';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const certificateNo = searchParams.get('certificateNo');

  if (!certificateNo) {
    return NextResponse.json({ success: false, error: 'Certificate number is required.' });
  }

  try {
    await dbConnect();

    const student = await Student.findOne({ certificateNo });

    if (!student) {
      return NextResponse.json({ success: false, error: 'Student not found.' });
    }

    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}