import Joi from "joi"; // Import Joi validation library

/**
 * @swagger
 * components:
 *   schemas:
 *     Grade:
 *       type: object
 *       required:
 *         - Grade_ID
 *         - Student_ID
 *         - Subj_desc
 *         - Units
 *         - Credits
 *         - Remarks
 *       properties:
 *         Grade_ID:
 *           type: integer
 *           description: The unique identifier for the grade entry
 *           example: 1
 *         Student_ID:
 *           type: integer
 *           description: The unique identifier for the student
 *           example: 12345
 *         Subj_desc:
 *           type: string
 *           description: A description of the subject or course
 *           example: "Introduction to Programming"
 *         Units:
 *           type: integer
 *           description: The number of units for the subject
 *           example: 3
 *         Credits:
 *           type: integer
 *           description: The credits awarded for the subject
 *           example: 3
 *         Remarks:
 *           type: string
 *           description: Remarks or comments about the grade
 *           example: "Passed with distinction"
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

// Define a validation schema for grade data
const gradeValidationSchema = Joi.object({
  // Grade ID validation
  // - Must be a number
  // - Required field
  Grade_ID: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Grade_ID must be a number",
      "any.required": "Grade_ID is required",
    }),

  // Student ID validation
  // - Must be a number
  // - Required field
  Student_ID: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Student_ID must be a number",
      "any.required": "Student_ID is required",
    }),

  // Subject description validation
  // - Must be a string
  // - Required field
  Subj_desc: Joi.string()
    .required()
    .messages({
      "string.base": "Subj_desc must be a string",
      "any.required": "Subject description is required",
    }),

  // Units validation
  // - Must be a positive integer
  // - Required field
  Units: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Units must be a number",
      "number.positive": "Units must be a positive number",
      "any.required": "Units are required",
    }),

  // Credits validation
  // - Must be a positive integer
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

  // Remarks validation
  // - Must be a string
  // - Optional field
  Remarks: Joi.string().optional().messages({
    "string.base": "Remarks must be a string",
  }),
});

// Helper function to validate grade data
// - Takes grade data as input
// - Returns validation result with all errors (abortEarly: false)
// - Type 'any' is used for gradeData as it's raw input that needs validation
export const validateGrade = (gradeData: any) => {
  return gradeValidationSchema.validate(gradeData, { abortEarly: false });
};