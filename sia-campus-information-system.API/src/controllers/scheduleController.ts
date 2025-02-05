import { Request, Response } from "express";
import { Schedule } from "../models/schedule"; // Mongoose model for Schedule
import { ISchedule } from "../interfaces/scheduleInterface"; // ISchedule interface
import mongoose from "mongoose";
import { validateSchedule } from "../validations/scheduleValidation"; // Validation logic for Schedule

export class ScheduleController {
  // Create a new schedule
  public async createSchedule(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming schedule data
      const { error, value: payload } = validateSchedule(req.body);
      if (error) {
        res.status(400).json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare schedule data
      const scheduleData: ISchedule = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new schedule to the database
      const schedule = new Schedule(scheduleData);
      const savedSchedule = await schedule.save();

      // Return the newly created schedule with 201 Created status
      res.status(201).json(savedSchedule);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all schedules
  public async getAllSchedules(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all schedules from the database
      const schedules: ISchedule[] = await Schedule.find();
      res.json(schedules);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get schedule by ID
  public async getScheduleById(req: Request, res: Response): Promise<void> {
    try {
      const schedule: ISchedule | null = await Schedule.findById(req.params.id);

      // Return 404 if schedule doesn't exist
      if (!schedule) {
        res.status(404).json({ message: "Schedule not found" });
        return;
      }

      res.json(schedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update schedule
  public async updateSchedule(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateSchedule(req.body);
      if (error) {
        res.status(400).json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare update data
      const scheduleData: Partial<ISchedule> = { ...payload };

      // Update the schedule and get the updated document
      const schedule: ISchedule | null = await Schedule.findByIdAndUpdate(
        req.params.id,
        scheduleData,
        { new: true } // Returns the updated document
      );

      // Return 404 if schedule doesn't exist
      if (!schedule) {
        res.status(404).json({ message: "Schedule not found" });
        return;
      }

      res.json(schedule);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete schedule
  public async deleteSchedule(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the schedule in one operation
      const schedule: ISchedule | null = await Schedule.findByIdAndDelete(req.params.id);

      // Return 404 if schedule doesn't exist
      if (!schedule) {
        res.status(404).json({ message: "Schedule not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Schedule deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
