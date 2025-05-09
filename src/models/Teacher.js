import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  teacherId: { type: String, unique: true },
  fullName: String,
  dob: String,
  phoneNo: String,
  email: String,
  city: String,
  state: String,
  businessname: String,
  businessaddress: String,
  sponsorcode: String,
  photo: String,
  rank: String,
  income: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  plan: { type: String, enum: ['Basic Plan', 'Premium Plan', 'Premium+ Plan'], default: 'Basic Plan' }
}, { collection: 'teachers' });
// Create index on sponsorcode (lowercase to match schema)
teacherSchema.index({ sponsorcode: 1 });

const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);

export default Teacher;