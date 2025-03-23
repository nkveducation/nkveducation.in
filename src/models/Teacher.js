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
  sponsorcode: String,
  photo: String, // Cloudinary URL
  rank: String,
});

const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema, 'teachers');

export default Teacher;