import express from "express";
import Joi from "joi"; // Import Joi validation library
import { authMiddleware } from "../middleware/authMiddleware";

// Initialize express Router
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       required:
 *         - Schedule_ID
 *         - Course_ID
 *         - Teacher
 *         - Days
 *         - Class_time
 *         - Room
 *         - Lecture
 *         - Laboratory
 *         - Units
 *       properties:
 *         Schedule_ID:
 *           type: integer
 *           description: The unique identifier for the schedule
 *           example: 1001
 *         Course_ID:
 *           type: integer
 *           description: The unique identifier for the course
 *           example: 101
 *         Teacher:
 *           type: string
 *           maxLength: 100
 *           description: The name of the instructor for the course
 *           example: "Dr. John Doe"
 *         Days:
 *           type: string
 *           maxLength: 20
 *           description: The days of the week the class meets
 *           example: "MWF"
 *         Class_time:
 *           type: string  // Changed to string
 *           description: The class start time (e.g., "10:00 PM - 11:30 PM")
 *           example: "10:00 PM - 11:30 PM"
 *         Room:
 *           type: string
 *           maxLength: 50
 *           description: The room number where the class is held
 *           example: "Room 101"
 *         Lecture:
 *           type: integer
 *           description: The number of lecture units
 *           example: 2
 *         Laboratory:
 *           type: integer
 *           description: The number of laboratory units
 *           example: 1
 *         Units:
 *           type: integer
 *           description: The total number of units for the course
 *           example: 3
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               path:
 *                 type: array
 *                 items:
 *                   type: string
 */

// Define the schedule validation schema with Joi
const scheduleValidationSchema = Joi.object({
  Schedule_ID: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Schedule_ID must be a number",
      "any.required": "Schedule_ID is required",
    }),

  Course_ID: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Course_ID must be a number",
      "any.required": "Course_ID is required",
    }),

  Teacher: Joi.string()
    .max(100)
    .required()
    .messages({
      "string.max": "Teacher name cannot exceed 100 characters",
      "any.required": "Teacher is required",
    }),

  Days: Joi.string()
    .max(20)
    .required()
    .messages({
      "string.max": "Days cannot exceed 20 characters",
      "any.required": "Days are required",
    }),

  Class_time: Joi.string()  // Changed to string
    .required()
    .messages({
      "string.base": "Class_time must be a string",
      "any.required": "Class_time is required",
    }),

  Room: Joi.string()
    .max(50)
    .required()
    .messages({
      "string.max": "Room name cannot exceed 50 characters",
      "any.required": "Room is required",
    }),

  Lecture: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Lecture units must be a number",
      "any.required": "Lecture units are required",
    }),

  Laboratory: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Laboratory units must be a number",
      "any.required": "Laboratory units are required",
    }),

  Units: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Units must be a number",
      "any.required": "Units are required",
    }),
});

// Helper function to validate schedule data
export const validateSchedule = (scheduleData: any) => {
  return scheduleValidationSchema.validate(scheduleData, { abortEarly: false });
};

// Mock Schedule Controller (for demonstration)
class ScheduleController {
  // Method to create a new schedule
  createSchedule(req: any, res: any) {
    const validationResult = validateSchedule(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "Validation error",
        details: validationResult.error.details,
      });
    }

    // Simulate schedule creation
    return res.status(201).json({
      message: "Schedule created successfully",
      data: req.body,
    });
  }

  // Method to get all schedules
  getAllSchedules(req: any, res: any) {
    // Simulate fetching schedules
    const schedules = [
      {
        Schedule_ID: 1001,
        Course_ID: 101,
        Teacher: "Dr. John Doe",
        Days: "MWF",
        Class_time: "10:00 PM - 11:30 PM",
        Room: "Room 101",
        Lecture: 2,
        Laboratory: 1,
        Units: 3,
      },
    ];
    return res.status(200).json({ data: schedules });
  }

  // Method to get a schedule by ID
  getScheduleById(req: any, res: any) {
    const scheduleId = req.params.id;
    // Simulate fetching schedule by ID
    if (scheduleId === "1001") {
      return res.status(200).json({
        Schedule_ID: 1001,
        Course_ID: 101,
        Teacher: "Dr. John Doe",
        Days: "MWF",
        Class_time: "10:00 PM - 11:30 PM",
        Room: "Room 101",
        Lecture: 2,
        Laboratory: 1,
        Units: 3,
      });
    }
    return res.status(404).json({ message: "Schedule not found" });
  }

  // Method to update a schedule
  updateSchedule(req: any, res: any) {
    const scheduleId = req.params.id;
    const validationResult = validateSchedule(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "Validation error",
        details: validationResult.error.details,
      });
    }

    // Simulate updating the schedule
    if (scheduleId === "1001") {
      return res.status(200).json({
        message: "Schedule updated successfully",
        data: req.body,
      });
    }
    return res.status(404).json({ message: "Schedule not found" });
  }

  // Method to delete a schedule
  deleteSchedule(req: any, res: any) {
    const scheduleId = req.params.id;
    if (scheduleId === "1001") {
      return res.status(204).send();
    }
    return res.status(404).json({ message: "Schedule not found" });
  }
}

// Create an instance of the ScheduleController
const scheduleController = new ScheduleController();

/**
 * @swagger
 * /api/schedules:
 *   post:
 *     summary: Create a new schedule
 *     tags: [Schedule]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 *   get:
 *     summary: Get all schedules
 *     tags: [Schedule]
 *     responses:
 *       200:
 *         description: List of schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Schedule'
 *
 * /api/schedules/{id}:
 *   get:
 *     summary: Get schedule by ID
 *     tags: [Schedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     responses:
 *       200:
 *         description: Schedule details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Schedule not found
 *
 *   put:
 *     summary: Update schedule
 *     tags: [Schedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Schedule not found
 *
 *   delete:
 *     summary: Delete schedule
 *     tags: [Schedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     responses:
 *       204:
 *         description: Schedule deleted successfully
 *       404:
 *         description: Schedule not found
 */

// Schedule Routes:

// POST /api/schedules
router.post("/api/schedule", authMiddleware, scheduleController.createSchedule);

// GET /api/schedules
router.get("/api/schedule", authMiddleware, scheduleController.getAllSchedules);

// GET /api/schedules/:id
router.get("/api/schedule:id", authMiddleware, scheduleController.getScheduleById);

// PUT /api/schedules/:id
router.put("/api/schedule:id", authMiddleware, scheduleController.updateSchedule);

// DELETE /api/schedules/:id
router.delete("/api/schedule:id", authMiddleware, scheduleController.deleteSchedule);

// Export the router for use in main application
export default router;
