import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import Offer from '@/models/Offer';
import dbConnect from '@/lib/dbConnect';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function DELETE(request, { params }) {
  await dbConnect();

  try {
    const image = await Offer.findById(params.id);
    if (!image) {
      return NextResponse.json(
        { success: false, message: 'Offer not found' },
        { status: 404 }
      );
    }

    await cloudinary.v2.uploader.destroy(image.publicId);
    await Offer.findByIdAndDelete(params.id);

    return NextResponse.json(
      { success: true, message: 'Offer deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error deleting image', error: error.message },
      { status: 500 }
    );
  }
}