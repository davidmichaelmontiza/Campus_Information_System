import { Request, Response } from "express";
import { Grade } from "../models/gradeModel";
import { IGrade } from "../interfaces/gradeInterface";
import mongoose from "mongoose";
import { validateGrade } from "../validations/gradeValidation";
import bcrypt from "bcrypt";

export class GradeController {
  // Create a new grade
  public async createGrade(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming grade data
      const { error, value: payload } = validateGrade(req.body);  // Use appropriate validation function for Grade schema
      if (error) {
        res.status(400).json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare grade data
      const gradeData: IGrade = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new grade to the database
      const grade = new Grade(gradeData);
      const savedGrade = await grade.save();

      // Return the newly created grade with 201 Created status
      res.status(201).json(savedGrade);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all grades
  public async getAllGrades(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all grades from database
      const grades: IGrade[] = await Grade.find();
      res.json(grades);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get grade by ID
  public async getGradeById(req: Request, res: Response): Promise<void> {
    try {
      const grade: IGrade | null = await Grade.findById(req.params.id);

      // Return 404 if grade doesn't exist
      if (!grade) {
        res.status(404).json({ message: "Grade not found" });
        return;
      }

      res.json(grade);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update grade
  public async updateGrade(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateGrade(req.body);  // Use appropriate validation function for Grade schema
      if (error) {
        res.status(400).json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare update data
      const gradeData: Partial<IGrade> = { ...payload };

      // Update the grade and get the updated document
      const grade: IGrade | null = await Grade.findByIdAndUpdate(
        req.params.id,
        gradeData,
        { new: true } // Returns the updated document
      );

      // Return 404 if grade doesn't exist
      if (!grade) {
        res.status(404).json({ message: "Grade not found" });
        return;
      }

      res.json(grade);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete grade
  public async deleteGrade(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the grade in one operation
      const grade: IGrade | null = await Grade.findByIdAndDelete(req.params.id);

      // Return 404 if grade doesn't exist
      if (!grade) {
        res.status(404).json({ message: "Grade not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Grade deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}