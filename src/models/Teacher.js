import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  teacherId: String,
  fullName: String,
  dob: String,
  phoneNo: String,
  email: String,
  city: String,
  state: String,
  businessname: String,
  businessaddress: String,
  sponsorcode: String, // Changed to lowercase to match your schema
  photo: String, // Cloudinary URL
  rank: String,
  isVerified: { type: Boolean, default: false }
}, { collection: 'teachers' });

// Create index on sponsorcode (lowercase to match schema)
teacherSchema.index({ sponsorcode: 1 });

const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);

export default Teacher;