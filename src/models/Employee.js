// models/Employee.js
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  fullName: String,
  fatherName: String,
  empId: { type: String}, // Remove index: true if present
  instituteName: String,
  instituteAddress: String,
  aadhar: String,
  city: String,
  rank: String,
  phone: String,
  sponsorCode: String,
  photo: String,
  createdAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false }
}, { collection: 'employees' });


employeeSchema.index({ empId: 1 }, { unique: true }); // Use index with unique explicitly
employeeSchema.index({ sponsorCode: 1 });
const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
export default Employee;
