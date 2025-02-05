import { Request, Response } from "express";
import { Subject } from "../models/subjectsModel";
import { ISubject } from "../interfaces/subjectsInterface";
import mongoose from "mongoose";
import { validateSubject } from "../validations/subjectsValidation";
import bcrypt from "bcrypt";

export class SubjectController {
  // Create a new subject
  // Handles POST requests to create a new subject in the database
  public async createSubject(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming subject data against schema rules
      const { error, value: payload } = validateSubject(req.body);
      if (error) {
        // Return early if validation fails, sending back specific error messages
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare subject data with a new MongoDB ID and the hashed password
      const subjectData: ISubject = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new subject to the database
      const subject = new Subject(subjectData);
      const savedSubject = await subject.save();

      // Return the newly created subject with 201 Created status
      res.status(201).json(savedSubject);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all subjects
  // Handles GET requests to retrieve all subjects from the database
  public async getAllSubjects(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all subjects from database, excluding sensitive password field
      const subjects: ISubject[] = await Subject.find().select("-password");
      res.json(subjects);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get subject by ID
  // Handles GET requests to retrieve a specific subject by their ID
  public async getSubjectById(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find subject by ID, excluding password field
      const subject: ISubject | null = await Subject.findById(req.params.id).select(
        "-password"
      );

      // Return 404 if subject doesn't exist
      if (!subject) {
        res.status(404).json({ message: "Subject not found" });
        return;
      }

      // Return the found subject
      res.json(subject);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update subject
  // Handles PUT/PATCH requests to update an existing subject
  public async updateSubject(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated subject data
      const { error, value: payload } = validateSubject(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare update data with hashed password
      const subjectData: Partial<ISubject> = { ...payload, };

      // Update the subject and get the updated document
      const subject: ISubject | null = await Subject.findByIdAndUpdate(
        req.params.id,
        subjectData,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if subject doesn't exist
      if (!subject) {
        res.status(404).json({ message: "Subject not found" });
        return;
      }

      // Remove password from response data for security
      let withoutPassword = subject.toJSON();
      delete withoutPassword.password;

      // Return the updated subject without password
      res.json(withoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete subject
  // Handles DELETE requests to remove a subject from the database
  public async deleteSubject(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the subject in one operation
      const subject: ISubject | null = await Subject.findByIdAndDelete(req.params.id);

      // Return 404 if subject doesn't exist
      if (!subject) {
        res.status(404).json({ message: "Subject not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Subject deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
