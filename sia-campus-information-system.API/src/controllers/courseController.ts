import { Request, Response } from "express";
import { Course } from "../models/course";
import { ICourse} from "../interfaces/courseInterface";
import mongoose from "mongoose";
import { validateCourse } from "../validations/courseValidation";
import bcrypt from "bcrypt";

export class CourseController {
    // Create a new course
    // Handles POST requests to create a new course in the database
    public async createCourse(req: Request, res: Response): Promise<void> {
      try {
        // Validate incoming course data against schema rules
        const { error, value: payload } = validateCourse(req.body);
        if (error) {
          // Return early if validation fails, sending back specific error messages
          res
            .status(400)
            .json({ message: error.details.map((err) => err.message) });
          return;
        }
  
        // Prepare course data with a new MongoDB ID
        const courseData = {
          _id: new mongoose.Types.ObjectId(),
          ...payload,
        };
  
        // Create and save the new course to the database
        const course = new Course(courseData);
        const savedCourse = await course.save();
  
        // Return the newly created course with 201 Created status
        res.status(201).json(savedCourse);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
    }
  
    // Get all courses
    // Handles GET requests to retrieve all courses from the database
    public async getAllCourses(req: Request, res: Response): Promise<void> {
      try {
        // Fetch all courses from database
        const courses = await Course.find();
        res.json(courses);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }
  
    // Get course by ID
    // Handles GET requests to retrieve a specific course by its ID
    public async getCourseById(req: Request, res: Response): Promise<void> {
      try {
        // Attempt to find course by ID
        const course = await Course.findById(req.params.id);
  
        // Return 404 if course doesn't exist
        if (!course) {
          res.status(404).json({ message: "Course not found" });
          return;
        }
  
        // Return the found course
        res.json(course);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }
  
    // Update course
    // Handles PUT/PATCH requests to update an existing course
    public async updateCourse(req: Request, res: Response): Promise<void> {
      try {
        // Validate the updated course data
        const { error, value: payload } = validateCourse(req.body);
        if (error) {
          res
            .status(400)
            .json({ message: error.details.map((err) => err.message) });
          return;
        }
  
        // Prepare update data
        const courseData: Partial<ICourse> = { ...payload };
  
        // Update the course and get the updated document
        const course = await Course.findByIdAndUpdate(req.params.id, courseData, {
          new: true, // This option returns the modified document rather than the original
        });
  
        // Return 404 if course doesn't exist
        if (!course) {
          res.status(404).json({ message: "Course not found" });
          return;
        }
  
        // Return the updated course
        res.json(course);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
    }
  
    // Delete course
    // Handles DELETE requests to remove a course from the database
    public async deleteCourse(req: Request, res: Response): Promise<void> {
      try {
        // Attempt to find and delete the course in one operation
        const course = await Course.findByIdAndDelete(req.params.id);
  
        // Return 404 if course doesn't exist
        if (!course) {
          res.status(404).json({ message: "Course not found" });
          return;
        }
  
        // Confirm successful deletion
        res.json({ message: "Course deleted successfully" });
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }
  }