import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Employee from '@/models/Employee';

export async function GET(request, { params }) {
    const id = params?.id; // Ensure id is defined
  
    console.log("Fetching employee with ID:", id);
  
    if (!id) {
      return NextResponse.json({ success: false, error: "Invalid Employee ID" }, { status: 400 });
    }
  
    try {
      await dbConnect();
  
      const employee = await Employee.findById(id);
      if (!employee) {
        console.log("Employee not found");
        return NextResponse.json({ success: false, error: "Employee not found" }, { status: 404 });
      }
  
      console.log("Employee found:", employee);
      return NextResponse.json({ success: true, data: employee }, { status: 200 });
    } catch (error) {
      console.error("Error fetching employee:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
  

export async function DELETE(request, { params }) {
  const { id } = params;

  console.log('Deleting employee with ID:', id); // Debugging

  try {
    await dbConnect();

    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      console.log('Employee not found for deletion'); // Debugging
      return NextResponse.json({ success: false, error: 'Employee not found' }, { status: 404 });
    }

    console.log('Employee deleted successfully:', deletedEmployee); // Debugging
    return NextResponse.json({ success: true, message: 'Employee deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting employee:', error.message); // Debugging
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  await dbConnect();

  try {
    const { id } = params;
    const body = await req.json();

    const updatedEmployee = await Employee.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json(updatedEmployee, { status: 200 });
  } catch (error) {
    console.error('PUT /api/employees/:id error:', error);
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}