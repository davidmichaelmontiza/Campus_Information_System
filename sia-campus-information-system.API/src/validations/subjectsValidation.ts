import Joi from "joi"; // Import Joi validation library

/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
 *       type: object
 *       required:
 *         - Subject_ID
 *         - SubjectName
 *         - Course_ID
 *       properties:
 *         Subject_ID:
 *           type: integer
 *           description: Unique identifier for the subject
 *           example: 101
 *         SubjectName:
 *           type: string
 *           maxLength: 100
 *           description: Name of the subject
 *           example: "Introduction to Programming"
 *         SubjectDescription:
 *           type: string
 *           description: A detailed description of the subject
 *           example: "This course introduces basic programming concepts using Python."
 *         Course_ID:
 *           type: integer
 *           description: Unique identifier for the course that the subject is part of
 *           example: 201
 *     SubjectResponse:
 *       type: object
 *       properties:
 *         Subject_ID:
 *           type: integer
 *           description: Unique identifier for the subject
 *         SubjectName:
 *           type: string
 *         SubjectDescription:
 *           type: string
 *         Course_ID:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
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


// Define a validation schema for subject data
const SubjectValidationSchema = Joi.object({
  // SubjectID validation
  Subject_ID: Joi.number().required().messages({
    "number.base": "Subject ID must be a number",
    "any.required": "Subject ID is required",
  }),

  // SubjectName validation
  SubjectName: Joi.string().max(100).required().messages({
    "string.max": "Subject Name cannot exceed 100 characters",
    "any.required": "Subject Name is required",
  }),

  // SubjectDescription validation
  SubjectDescription: Joi.string().max(500).required().messages({
    "string.max": "Subject Description cannot exceed 500 characters",
    "any.required": "Subject Description is required",
  }),

  // CourseID validation
  Course_ID: Joi.number().required().messages({
    "number.base": "Course ID must be a number",
    "any.required": "Course ID is required",
  }),
});

// Helper function to validate subject data
// - Takes subject data as input
// - Returns validation result with all errors (abortEarly: false)
// - Type 'any' is used for subjectData as it's raw input that needs validation
export const validateSubject = (SubjectData: any) => {
  return SubjectValidationSchema.validate(SubjectData, { abortEarly: false });
};
