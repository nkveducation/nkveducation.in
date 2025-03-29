// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import Teacher from '@/models/Teacher';

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const teacherId = searchParams.get('teacherId');

//   if (!teacherId) {
//     return NextResponse.json(
//       { success: false, error: 'teacherId query parameter is required' },
//       { status: 400 }
//     );
//   }

//   try {
//     await dbConnect();

//     // Search for teacher by teacherId (case insensitive)
//     const teacher = await Teacher.findOne({ 
//       teacherId: { $regex: new RegExp(teacherId, 'i') } 
//     });

//     if (!teacher) {
//       return NextResponse.json(
//         { success: false, error: 'Teacher not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, data: teacher },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Teacher from '@/models/Teacher';
import Student from '@/models/Student';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  try {
    await dbConnect();

    // Search teachers by ID or name
    const teachers = await Teacher.find({
      $or: [
        { teacherId: { $regex: query, $options: 'i' } },
        { fullName: { $regex: query, $options: 'i' } }
      ]
    });

    // Get students for each teacher
    const results = await Promise.all(
      teachers.map(async (teacher) => {
        const students = await Student.find({ teacherId: teacher.teacherId });
        return {
          teacher,
          students
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: results
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}