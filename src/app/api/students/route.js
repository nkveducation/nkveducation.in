import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Student from '@/models/Student';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    await dbConnect();
    const formData = await request.json();
    
    // Upload photo if exists
    let photoUrl = '';
    if (formData.photo) {
      const result = await cloudinary.v2.uploader.upload(formData.photo, {
        folder: 'student_photos'
      });
      photoUrl = result.secure_url;
    }

    const newStudent = await Student.create({
      ...formData,
      photo: photoUrl
    });

    return NextResponse.json(
      { success: true, data: newStudent },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}