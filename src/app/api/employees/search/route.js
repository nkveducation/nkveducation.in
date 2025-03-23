import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Employee from '@/models/Employee';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const empId = searchParams.get('empId'); // Get empId from query params

  if (!empId) {
    return NextResponse.json({ success: false, error: 'empId is required' }, { status: 400 });
  }

  try {
    await dbConnect();

    // Find the employee by empId
    const employee = await Employee.findOne({ empId });
    if (!employee) {
      return NextResponse.json({ success: false, error: 'Employee not found' }, { status: 404 });
    }

    // Find related employees with the same sponsorCode, excluding the searched employee
    const relatedEmployees = await Employee.find({
      sponsorCode: employee.sponsorCode,
      _id: { $ne: employee._id }, // Exclude the searched employee
    });

    return NextResponse.json(
      { success: true, data: { employee, relatedEmployees } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}