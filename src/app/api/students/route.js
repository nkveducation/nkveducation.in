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

export async function GET(){
  try {
    await dbConnect()
    const students = await Student.find({})
    return NextResponse.json({ success: true, data: students }, { status: 200 });
  } catch (error) {
    return NextResponse.json({success: false, error: error.message}, {status: 500})
  } 
}

export async function PUT(request, { params }) {
  await connectDB();

  try {
    const image = await Image.findById(params.id);
    if (!image) {
      return NextResponse.json(
        { success: false, message: 'Image not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const file = formData.get('image');

    let updateData = {
      title: title || image.title,
      description: description || image.description
    };

    // If new image is provided
    if (file) {
      // First delete old image from Cloudinary
      await cloudinary.v2.uploader.destroy(image.publicId);

      // Upload new image
      const buffer = await file.arrayBuffer();
      const bytes = Buffer.from(buffer);

      const result = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream(
            {
              folder: 'page-img',
              resource_type: 'auto'
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(bytes);
      });

      updateData.imageUrl = result.secure_url;
      updateData.publicId = result.public_id;
    }

    // Update in MongoDB
    const updatedImage = await Image.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    );

    return NextResponse.json(
      { success: true, data: updatedImage },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Error updating image', error: error.message },
      { status: 500 }
    );
  }
}