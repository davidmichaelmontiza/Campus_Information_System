import Joi from "joi";

/**
 * @swagger
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       required:
 *         - EnrollmentID
 *         - StudentID
 *         - CourseID
 *         - EnrollmentDate
 *       properties:
 *         EnrollmentID:
 *           type: integer
 *           description: Unique identifier for the enrollment
 *           example: 12345
 *         StudentID:
 *           type: integer
 *           description: Unique identifier for the student
 *           example: 67890
 *         CourseID:
 *           type: integer
 *           description: Unique identifier for the course
 *           example: 101
 *         EnrollmentDate:
 *           type: string
 *           format: date-time
 *           description: The date and time when the student enrolled in the course
 *           example: "2024-12-12T14:30:00Z"
 *     EnrollmentResponse:
 *       type: object
 *       properties:
 *         EnrollmentID:
 *           type: integer
 *           description: Unique identifier for the enrollment
 *         StudentID:
 *           type: integer
 *           description: Unique identifier for the student
 *         CourseID:
 *           type: integer
 *           description: Unique identifier for the course
 *         EnrollmentDate:
 *           type: string
 *           format: date-time
 *           description: The date and time when the student enrolled in the course
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


const enrollmentValidationSchema = Joi.object({
  Course_ID: Joi.number().required().messages({
    "any.required": "Course_ID is required",
    "number.base": "Course_ID must be a number"
  }),
  Student_ID: Joi.number().required().messages({
    "any.required": "Student_ID is required",
    "number.base": "Student_ID must be a number"
  }),
  Enrollment_ID: Joi.number().required().messages({
    "any.required": "Enrollment_ID is required",
    "number.base": "Enrollment_ID must be a number"
  }),
  EnrollmentDate: Joi.date().required().messages({
    "any.required": "EnrollmentDate is required",
    "date.base": "EnrollmentDate must be a valid date"
  }),

});

export const validateEnrollment = (data: any) => {
  return enrollmentValidationSchema.validate(data, { abortEarly: false });
};
