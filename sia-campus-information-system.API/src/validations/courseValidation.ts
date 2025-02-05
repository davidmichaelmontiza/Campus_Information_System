import Joi from "joi"; // Import Joi validation library

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - Course_ID
 *         - Course_name
 *         - Credits
 *         - Catalog_no
 *         - Academic_yr
 *       properties:
 *         Course_ID:
 *           type: integer
 *           description: The unique identifier for the course
 *           example: 101
 *         Course_name:
 *           type: string
 *           maxLength: 100
 *           description: The name of the course
 *           example: "Introduction to Computer Science"
 *         Credits:
 *           type: integer
 *           description: The number of credits for the course
 *           example: 3
 *         Catalog_no:
 *           type: string
 *           maxLength: 50
 *           description: The catalog number for the course
 *           example: "CS101"
 *         Academic_yr:
 *           type: integer
 *           description: The academic year for the course
 *           example: 2024
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

// Define a validation schema for course data
const courseValidationSchema = Joi.object({
  // Course ID validation
  // - Must be a number
  // - Required field
  Course_ID: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Course_ID must be a number",
      "any.required": "Course_ID is required",
    }),

  // Course name validation
  // - Maximum 100 characters
  // - Required field
  Course_name: Joi.string()
    .max(100)
    .required()
    .messages({
      "string.max": "Course name cannot exceed 100 characters",
      "any.required": "Course name is required",
    }),

  // Credits validation
  // - Must be a number
  // - Required field
  Credits: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Credits must be a number",
      "number.positive": "Credits must be a positive number",
      "any.required": "Credits are required",
    }),

  // Catalog number validation
  // - Maximum 50 characters
  // - Required field
  Catalog_no: Joi.string()
    .max(50)
    .required()
    .messages({
      "string.max": "Catalog number cannot exceed 50 characters",
      "any.required": "Catalog number is required",
    }),

  // Academic year validation
  // - Must be a number
  // - Required field
  Academic_yr: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Academic year must be a number",
      "number.positive": "Academic year must be a positive number",
      "any.required": "Academic year is required",
    }),
});

// Helper function to validate course data
// - Takes course data as input
// - Returns validation result with all errors (abortEarly: false)
// - Type 'any' is used for courseData as it's raw input that needs validation
export const validateCourse = (courseData: any) => {
  return courseValidationSchema.validate(courseData, { abortEarly: false });
};