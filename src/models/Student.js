import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  teacherId: String,
  instituteCity: String,
  instituteState: String,
  instituteName: String,
  fullName: String,
  fatherOrHusbandName: String,
  dob: Date,
  studentAddress: String,
  email: String,
  phoneNo: String,
  aadharCardNo: String,
  certificateNo: String,
  duration: String,
  course: String,
  grade: String,
  rollNo: String,
  photo: String, // Cloudinary URL
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
export default Student;