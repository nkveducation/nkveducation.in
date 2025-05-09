import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Teacher from '@/models/Teacher';
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
    const { 
      teacherId, 
      fullName, 
      dob, 
      phoneNo, 
      email, 
      city, 
      state, 
      businessname, 
      businessaddress, 
      sponsorcode, 
      photo, 
      rank, 
      income,
      plan // Add plan to destructuring
    } = formData;

    // Upload photo to Cloudinary
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(photo, {
      folder: 'teacher_photos',
    });

    // Save data to MongoDB
    const newTeacher = new Teacher({
      teacherId,
      fullName,
      dob,
      phoneNo,
      email,
      city,
      state,
      businessname,
      businessaddress,
      sponsorcode,
      photo: cloudinaryResponse.secure_url,
      rank,
      income,
      plan // Include plan in the new teacher document
    });

    await newTeacher.save();

    return NextResponse.json({ success: true, data: newTeacher }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}



export async function GET() {
  try {
    await dbConnect();

    const teachers = await Teacher.find({});
    return NextResponse.json({ success: true, data: teachers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}