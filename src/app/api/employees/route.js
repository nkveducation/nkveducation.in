import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Employee from '@/models/Employee';

export async function GET() {
  try {
    await dbConnect();

    const employees = await Employee.find({});
    return NextResponse.json({ success: true, data: employees }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}