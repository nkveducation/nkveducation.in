import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  fullName: String,
  fatherName: String,
  empId: String,
  instituteName: String,
  instituteAddress: String,
  aadhar: String,
  city: String,
  rank: String,
  phone: String,
  sponsorCode: String,
  photo: String, // Cloudinary URL
});

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

export default Employee;