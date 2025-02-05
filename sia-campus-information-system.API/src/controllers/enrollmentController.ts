import { Request, Response } from "express";
import { Enrollment } from "../models/enrollmentModel";
import { IEnrollment } from "../interfaces/enrollmentInterface";
import mongoose from "mongoose";
import { validateEnrollment } from "../validations/enrollmentValidation";
import bcrypt from "bcrypt";

export class EnrollmentController {
  // Create a new enrollment
  // Handles POST requests to create a new enrollment in the database
  public async createEnrollment(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming enrollment data against schema rules
      const { error, value: payload } = validateEnrollment(req.body);
      if (error) {
        // Return early if validation fails, sending back specific error messages
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare enrollment data with a new MongoDB ID and the hashed password
      const enrollmentData: IEnrollment = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new enrollment to the database
      const enrollment = new Enrollment(enrollmentData);
      const savedEnrollment = await enrollment.save();

      // Return the newly created enrollment with 201 Created status
      res.status(201).json(savedEnrollment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all enrollments
  // Handles GET requests to retrieve all enrollments from the database
  public async getAllEnrollments(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all enrollments from database, excluding sensitive password field
      const enrollments: IEnrollment[] = await Enrollment.find().select("-password");
      res.json(enrollments);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get enrollment by ID
  // Handles GET requests to retrieve a specific enrollment by their ID
  public async getEnrollmentById(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find enrollment by ID, excluding password field
      const enrollment: IEnrollment | null = await Enrollment.findById(req.params.id).select(
        "-password"
      );

      // Return 404 if enrollment doesn't exist
      if (!enrollment) {
        res.status(404).json({ message: "Enrollment not found" });
        return;
      }

      // Return the found enrollment
      res.json(enrollment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update enrollment
  // Handles PUT/PATCH requests to update an existing enrollment
  public async updateEnrollment(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated enrollment data
      const { error, value: payload } = validateEnrollment(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare update data with hashed password
      const enrollmentData: Partial<IEnrollment> = { ...payload, };

      // Update the enrollment and get the updated document
      const enrollment: IEnrollment | null = await Enrollment.findByIdAndUpdate(
        req.params.id,
        enrollmentData,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if enrollment doesn't exist
      if (!enrollment) {
        res.status(404).json({ message: "Enrollment not found" });
        return;
      }

      // Remove password from response data for security
      let withoutPassword = enrollment.toJSON();
      delete withoutPassword.password;

      // Return the updated enrollment without password
      res.json(withoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete enrollment
  // Handles DELETE requests to remove an enrollment from the database
  public async deleteEnrollment(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the enrollment in one operation
      const enrollment: IEnrollment | null = await Enrollment.findByIdAndDelete(req.params.id);

      // Return 404 if enrollment doesn't exist
      if (!enrollment) {
        res.status(404).json({ message: "Enrollment not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Enrollment deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
