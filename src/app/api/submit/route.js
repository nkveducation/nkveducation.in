import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import dbConnect from '@/lib/dbConnect';
import Employee from '@/models/Employee';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    await dbConnect();

    const formData = await request.json();
    const { fullName, fatherName, empId, instituteName, instituteAddress, aadhar, city, rank, phone, sponsorCode, photo } = formData;

    // Upload photo to Cloudinary
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(photo, {
      folder: 'employee_photos',
    });

    // Save data to MongoDB
    const newEmployee = new Employee({
      fullName,
      fatherName,
      empId,
      instituteName,
      instituteAddress,
      aadhar,
      city,
      rank,
      phone,
      sponsorCode,
      photo: cloudinaryResponse.secure_url,
    });

    await newEmployee.save();

    return NextResponse.json({ success: true, data: newEmployee }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const employees = await Employee.find({});
    return NextResponse.json({ success: true, data: employees }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}