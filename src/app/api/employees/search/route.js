// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import Employee from '@/models/Employee';

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const empId = searchParams.get('empId'); // Get empId from query params

//   if (!empId) {
//     return NextResponse.json({ success: false, error: 'empId is required' }, { status: 400 });
//   }

//   try {
//     await dbConnect();

//     // Find the employee by empId
//     const employee = await Employee.findOne({ empId });
//     if (!employee) {
//       return NextResponse.json({ success: false, error: 'Employee not found' }, { status: 404 });
//     }

//     // Find related employees with the same sponsorCode, excluding the searched employee
//     const relatedEmployees = await Employee.find({
//       sponsorCode: employee.sponsorCode,
//       _id: { $ne: employee._id }, // Exclude the searched employee
//     });

//     return NextResponse.json(
//       { success: true, data: { employee, relatedEmployees } },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Employee from '@/models/Employee';
import Teacher from '@/models/Teacher';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const empId = searchParams.get('empId');

  if (!empId) {
    return NextResponse.json(
      { success: false, error: 'Employee ID is required' },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    // Find the employee by empId (case insensitive)
    const employee = await Employee.findOne({ 
      empId: { $regex: new RegExp(`^${empId}$`, 'i') }
    }).lean();

    if (!employee) {
      return NextResponse.json(
        { success: false, error: 'Employee not found' },
        { status: 404 }
      );
    }

    // Trim and prepare sponsorCode for case-insensitive search
    const sponsorCode = employee.sponsorCode?.trim();

    // Find related employees (case insensitive, excluding self)
    const relatedEmployees = await Employee.find({
      sponsorCode: { $regex: new RegExp(`^${sponsorCode}$`, 'i') },
      empId: { $ne: employee.empId }
    }).lean();

    // Find related teachers (case insensitive)
    const relatedTeachers = await Teacher.find({
      sponsorCode: { $regex: new RegExp(`^${sponsorCode}$`, 'i') }
    }).lean();

    return NextResponse.json(
      {
        success: true,
        data: {
          employee,
          relatedEmployees,
          relatedTeachers
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}