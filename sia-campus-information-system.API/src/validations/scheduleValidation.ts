import Joi from "joi"; // Import Joi validation library

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
 *           description: Name of the teacher
 *           example: "John Doe"
 *         Days:
 *           type: string
 *           description: Days of the week when the class is scheduled
 *           example: "Monday, Wednesday, Friday"
 *         Class_time:
 *           type: string  // Changed to string
 *           description: The time when the class is scheduled (e.g., "10:00 PM - 11:00 PM")
 *           example: "10:00 PM - 11:00 PM"
 *         Room:
 *           type: string
 *           description: Room where the class will take place
 *           example: "Room 101, Building A"
 *         Lecture:
 *           type: integer
 *           description: Number of lecture hours per week
 *           example: 3
 *         Laboratory:
 *           type: integer
 *           description: Number of laboratory hours per week
 *           example: 2
 *         Units:
 *           type: integer
 *           description: Number of course units
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

// Define a validation schema for schedule data
const scheduleValidationSchema = Joi.object({
  // Schedule ID validation
  Schedule_ID: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Schedule_ID must be a number",
      "any.required": "Schedule_ID is required",
    }),

  // Course ID validation
  Course_ID: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Course_ID must be a number",
      "any.required": "Course_ID is required",
    }),

  // Teacher validation
  Teacher: Joi.string()
    .required()
    .messages({
      "string.base": "Teacher must be a string",
      "any.required": "Teacher is required",
    }),

  // Days validation
  Days: Joi.string()
    .required()
    .messages({
      "string.base": "Days must be a string",
      "any.required": "Days are required",
    }),

  // Class time validation (changed to string)
  Class_time: Joi.string()
    .required()
    .messages({
      "string.base": "Class_time must be a string",
      "any.required": "Class_time is required",
    }),

  // Room validation
  Room: Joi.string()
    .required()
    .messages({
      "string.base": "Room must be a string",
      "any.required": "Room is required",
    }),

  // Lecture validation
  Lecture: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Lecture hours must be a number",
      "number.positive": "Lecture hours must be a positive number",
      "any.required": "Lecture hours are required",
    }),

  // Laboratory validation
  Laboratory: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Laboratory hours must be a number",
      "number.positive": "Laboratory hours must be a positive number",
      "any.required": "Laboratory hours are required",
    }),

  // Units validation
  Units: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Units must be a number",
      "number.positive": "Units must be a positive number",
      "any.required": "Units are required",
    }),
});

// Helper function to validate schedule data
export const validateSchedule = (scheduleData: any) => {
  return scheduleValidationSchema.validate(scheduleData, { abortEarly: false });
};
