import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Teacher from '@/models/Teacher';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    await dbConnect();

    const formData = await request.json();
    const { teacherId, fullName, dob, phoneNo, email, city, state, businessname, businessaddress, sponsorcode, photo, rank } = formData;

    // Upload new photo to Cloudinary if provided
    let photoUrl = photo;
    if (photo.startsWith('data:')) {
      const cloudinaryResponse = await cloudinary.v2.uploader.upload(photo, {
        folder: 'teacher_photos',
      });
      photoUrl = cloudinaryResponse.secure_url;
    }

    // Update data in MongoDB
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
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedTeacher }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
    const { id } = params;
  
    try {
      await dbConnect();
  
      await Teacher.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: 'Teacher deleted' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }