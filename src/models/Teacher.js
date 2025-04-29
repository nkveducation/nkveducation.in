import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  fullName: String,
  fatherName: String,
  empId: { type: String, unique: true },
  instituteName: String,
  instituteAddress: String,
  aadhar: String,
  city: String,
  rank: String,
  phone: String,
  sponsorCode: String,
  photo: String,
  isVerified: { type: Boolean, default: false }
}, { collection: 'employees' }); // Explicit collection name

// Create index for faster queries
employeeSchema.index({ empId: 1 });
employeeSchema.index({ sponsorCode: 1 });

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

export default Employee;