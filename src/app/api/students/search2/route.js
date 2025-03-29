import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Student from '@/models/Student';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const certificateNo = searchParams.get('certificateNo');

  if (!certificateNo) {
    return NextResponse.json(
      { success: false, error: 'certificateNo parameter is required' },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    // Find exact match for certificate number
    const student = await Student.findOne({ certificateNo });

    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: student },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}