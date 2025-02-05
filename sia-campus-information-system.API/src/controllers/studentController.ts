import { Request, Response } from "express";
import { Student } from "../models/studentModel"; // Change to Student model
import { IStudent } from "../interfaces/studentInterface"; // Change to Student interface
import mongoose from "mongoose";
import { validateStudent } from "../validations/studentValidation"; // Change to Student validation
import bcrypt from "bcrypt";

export class StudentController { // Change to StudentController
  // Create a new student
  // Handles POST requests to create a new student in the database
  public async createStudent(req: Request, res: Response): Promise<void> { // Change method name to createStudent
    try {
      // Validate incoming student data against schema rules
      const { error, value: payload } = validateStudent(req.body); // Change to validateStudent
      if (error) {
        // Return early if validation fails, sending back specific error messages
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare student data with a new MongoDB ID and the hashed password
      const studentData: IStudent = { // Change to IStudent
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new student to the database
      const student = new Student(studentData); // Change to Student model
      const savedStudent = await student.save(); // Change to savedStudent

      // Return the newly created student with 201 Created status
      res.status(201).json(savedStudent);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all students
  // Handles GET requests to retrieve all students from the database
  public async getAllStudents(req: Request, res: Response): Promise<void> { // Change method name to getAllStudents
    try {
      // Fetch all students from database, excluding sensitive password field
      const students: IStudent[] = await Student.find().select("-password"); // Change to Student model
      res.json(students);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get student by ID
  // Handles GET requests to retrieve a specific student by their ID
  public async getStudentById(req: Request, res: Response): Promise<void> { // Change method name to getStudentById
    try {
      // Attempt to find student by ID, excluding password field
      const student: IStudent | null = await Student.findById(req.params.id).select("-password"); // Change to Student model

      // Return 404 if student doesn't exist
      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }

      // Return the found student
      res.json(student);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update student
  // Handles PUT/PATCH requests to update an existing student
  public async updateStudent(req: Request, res: Response): Promise<void> { // Change method name to updateStudent
    try {
      // Validate the updated student data
      const { error, value: payload } = validateStudent(req.body); // Change to validateStudent
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare update data with hashed password
      const studentData: Partial<IStudent> = { ...payload, }; // Change to IStudent

      // Update the student and get the updated document
      const student: IStudent | null = await Student.findByIdAndUpdate(
        req.params.id,
        studentData,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if student doesn't exist
      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }

      // Remove password from response data for security
      let withoutPassword = student.toJSON();
      delete withoutPassword.password;

      // Return the updated student without password
      res.json(withoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete student
  // Handles DELETE requests to remove a student from the database
  public async deleteStudent(req: Request, res: Response): Promise<void> { // Change method name to deleteStudent
    try {
      // Attempt to find and delete the student in one operation
      const student: IStudent | null = await Student.findByIdAndDelete(req.params.id); // Change to Student model

      // Return 404 if student doesn't exist
      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Student deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
