// app/api/teachers/[id]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Teacher from '@/models/Teacher';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET single teacher
export async function GET(request, { params }) {
  const { id } = params;

  try {
    await dbConnect();

    // Validate teacher ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid teacher ID format' },
        { status: 400 }
      );
    }

    const teacher = await Teacher.findById(id);
    
    if (!teacher) {
      return NextResponse.json(
        { success: false, error: 'Teacher not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        data: {
          ...teacher._doc,
          // Format date for date input field
          dob: teacher.dob ? new Date(teacher.dob).toISOString().split('T')[0] : ''
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Server error fetching teacher' 
      },
      { status: 500 }
    );
  }
}

// UPDATE teacher
export async function PUT(request, { params }) {
  const { id } = params;

  try {
    await dbConnect();

    // Validate teacher ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid teacher ID format' },
        { status: 400 }
      );
    }

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
      plan
    } = formData;

    // Check if teacher exists
    const existingTeacher = await Teacher.findById(id);
    if (!existingTeacher) {
      return NextResponse.json(
        { success: false, error: 'Teacher not found' },
        { status: 404 }
      );
    }

    let photoUrl = existingTeacher.photo;

    // Handle photo upload if new photo is provided
    if (photo && photo.startsWith('data:image')) {
      try {
        // Delete old photo from Cloudinary if it exists
        if (existingTeacher.photo) {
          const publicId = existingTeacher.photo
            .split('/')
            .pop()
            .split('.')[0];
          await cloudinary.v2.uploader.destroy(`teacher_photos/${publicId}`);
        }

        // Upload new photo to Cloudinary
        const cloudinaryResponse = await cloudinary.v2.uploader.upload(photo, {
          folder: 'teacher_photos',
        });
        photoUrl = cloudinaryResponse.secure_url;
      } catch (cloudinaryError) {
        console.error('Cloudinary upload error:', cloudinaryError);
        return NextResponse.json(
          { 
            success: false, 
            error: 'Failed to upload new photo' 
          },
          { status: 500 }
        );
      }
    }

    // Update teacher data
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      {
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
        photo: photoUrl,
        rank,
        income,
        plan
      },
      { 
        new: true,
        runValidators: true
      }
    );

    return NextResponse.json(
      { 
        success: true, 
        data: updatedTeacher 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Server error updating teacher' 
      },
      { status: 500 }
    );
  }
}

// DELETE teacher
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await dbConnect();

    // Validate teacher ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid teacher ID format' },
        { status: 400 }
      );
    }

    // Find teacher first to get photo URL
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return NextResponse.json(
        { success: false, error: 'Teacher not found' },
        { status: 404 }
      );
    }

    // Delete photo from Cloudinary if exists
    if (teacher.photo) {
      try {
        const publicId = teacher.photo
          .split('/')
          .pop()
          .split('.')[0];
        await cloudinary.v2.uploader.destroy(`teacher_photos/${publicId}`);
      } catch (cloudinaryError) {
        console.error('Cloudinary delete error:', cloudinaryError);
        // Continue with deletion even if image deletion fails
      }
    }

    // Delete teacher from database
    await Teacher.findByIdAndDelete(id);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Teacher deleted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Server error deleting teacher' 
      },
      { status: 500 }
    );
  }
}