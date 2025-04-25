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
    
    let updateData = {
      teacherId: formData.teacherId,
      instituteCity: formData.instituteCity,
      instituteState: formData.instituteState,
      instituteName: formData.instituteName,
      fullName: formData.fullName,
      fatherOrHusbandName: formData.fatherOrHusbandName,
      dob: formData.dob,
      studentAddress: formData.studentAddress,
      email: formData.email,
      phoneNo: formData.phoneNo,
      aadharCardNo: formData.aadharCardNo,
      certificateNo: formData.certificateNo,
      duration: formData.duration,
      course: formData.course,
      grade: formData.grade,
      rollNo: formData.rollNo,
      photo: formData.photo
    };

    // Handle photo update if new image is uploaded
    if (formData.photo && formData.photo.startsWith('data:')) {
      // First delete old photo if it exists in Cloudinary
      if (formData.oldPhoto && formData.oldPhoto.includes('cloudinary.com')) {
        const publicId = formData.oldPhoto.split('/').pop().split('.')[0];
        await cloudinary.v2.uploader.destroy(`student_photos/${publicId}`);
      }
      
      // Upload new photo
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
    const student = await Student.findById(params.id);
    
    // Delete photo from Cloudinary if exists
    if (student.photo && student.photo.includes('cloudinary.com')) {
      const publicId = student.photo.split('/').pop().split('.')[0];
      await cloudinary.v2.uploader.destroy(`student_photos/${publicId}`);
    }
    
    await Student.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: 'Student deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}