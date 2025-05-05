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


// app/api/employees/search/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Employee from '@/models/Employee';
import Teacher from '@/models/Teacher';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const empId = searchParams.get('empId');
  const sponsorCodeParam = searchParams.get('sponsorCode');

  // Validate input
  if (!empId && !sponsorCodeParam) {
    return NextResponse.json(
      { success: false, error: 'Either empId or sponsorCode must be provided' },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    let sponsorCodeToSearch = sponsorCodeParam?.trim();
    let employee = null;

    // If empId provided, get employee and their sponsorCode
    if (empId) {
      employee = await Employee.findOne({ 
        empId: { $regex: new RegExp(`^${empId}$`, 'i') }
      }).lean();

      if (!employee) {
        return NextResponse.json(
          { success: false, error: 'Employee not found' },
          { status: 404 }
        );
      }

      // Use employee's sponsorCode only if no direct sponsorCode provided
      if (!sponsorCodeToSearch) {
        sponsorCodeToSearch = employee.sponsorCode?.trim();
      }
    }

    // Final validation
    if (!sponsorCodeToSearch) {
      return NextResponse.json(
        { success: false, error: 'No sponsor code available for search' },
        { status: 400 }
      );
    }

    console.log(`Searching for sponsor code: ${sponsorCodeToSearch}`);

    // Find matching teachers (case-insensitive exact match)
    const relatedTeachers = await Teacher.find({
      sponsorcode: { $regex: new RegExp(`^${sponsorCodeToSearch}$`, 'i') }
    }).lean();

    // Find matching employees (excluding the original if empId was used)
    const relatedEmployees = await Employee.find({
      sponsorCode: { $regex: new RegExp(`^${sponsorCodeToSearch}$`, 'i') },
      ...(empId && { empId: { $ne: empId } }) // Conditionally exclude
    }).lean();

    return NextResponse.json({
      success: true,
      data: {
        searchCriteria: {
          empIdUsed: empId,
          sponsorCodeUsed: sponsorCodeToSearch
        },
        employee,
        relatedEmployees,
        relatedTeachers
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}