

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