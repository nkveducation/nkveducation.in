import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Student from '@/models/Student';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET single student
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const student = await Student.findById(params.id);
    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// UPDATE student
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const formData = await request.json();
    
    let updateData = { ...formData };
    
    // Handle photo update
    if (formData.photo.startsWith('data:')) {
      const result = await cloudinary.v2.uploader.upload(formData.photo, {
        folder: 'student_photos'
      });
      updateData.photo = result.secure_url;
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedStudent });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// DELETE student
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    await Student.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: 'Student deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}