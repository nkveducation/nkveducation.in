import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import Image from '@/models/Image';
import dbConnect from '@/lib/dbConnect';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request, { params }) {
  await dbConnect();

  try {
    const image = await Image.findById(params.id);
    if (!image) {
      return NextResponse.json(
        { success: false, message: 'Image not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: image },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error fetching image', error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request, { params }) {
  await dbConnect();

  try {
    const image = await Image.findById(params.id);
    if (!image) {
      return NextResponse.json(
        { success: false, message: 'Image not found' },
        { status: 404 }
      );
    }

    await cloudinary.v2.uploader.destroy(image.publicId);
    await Image.findByIdAndDelete(params.id);

    return NextResponse.json(
      { success: true, message: 'Image deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error deleting image', error: error.message },
      { status: 500 }
    );
  }
}