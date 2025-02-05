import express from "express";
import { EnrollmentController } from "../controllers/enrollmentController";
import { authMiddleware } from "../middleware/authMiddleware";

// Initialize express Router
const router = express.Router();

// Create instance of EnrollmentController to handle route logic
const enrollmentController = new EnrollmentController();

/**
 * @swagger
 * tags:
 *   name: Enrollment
 *   description: Enrollment endpoints
 */

/**
 * @swagger
 * /api/enrollment:
 *   post:
 *     summary: Create a new enrollment
 *     tags: [Enrollment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       201:
 *         description: Enrollment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Conflict error (e.g., Enrollment already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Enrollment already exists
 *   get:
 *     summary: Get all enrollments
 *     tags: [Enrollment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of enrollments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EnrollmentResponse'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 */

/**
 * @swagger
 * /api/enrollment/{id}:
 *   get:
 *     summary: Get enrollment by ID
 *     tags: [Enrollment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Enrollment ID
 *     responses:
 *       200:
 *         description: Enrollment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentResponse'
 *       404:
 *         description: Enrollment not found
 *   put:
 *     summary: Update enrollment
 *     tags: [Enrollment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Enrollment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CourseID:
 *                 type: integer
 *               EnrollmentDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Enrollment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentResponse'
 *       404:
 *         description: Enrollment not found
 *   delete:
 *     summary: Delete enrollment
 *     tags: [Enrollment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Enrollment ID
 *     responses:
 *       204:
 *         description: Enrollment deleted successfully
 *       404:
 *         description: Enrollment not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       properties:
 *         EnrollmentID:
 *           type: integer
 *           example: 10123
 *         StudentID:
 *           type: integer
 *           example: 20234
 *         CourseID:
 *           type: integer
 *           example: 30156
 *         EnrollmentDate:
 *           type: string
 *           format: date
 *           example: "2024-08-15"
 *     EnrollmentResponse:
 *       type: object
 *       properties:
 *         EnrollmentID:
 *           type: integer
 *         StudentID:
 *           type: integer
 *         CourseID:
 *           type: integer
 *         EnrollmentDate:
 *           type: string
 *           format: date
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Validation failed for one or more fields"
 */



// Enrollment Routes:

// POST /api/enrollments
// Creates a new enrollment
// Request body should contain enrollment details (email, password, firstName, lastName)
router.post("/api/enrollment", authMiddleware, enrollmentController.createEnrollment);

// GET /api/enrollments
// Retrieves all enrollments from the database
// Returns array of enrollments (passwords excluded)
router.get("/api/enrollment", authMiddleware, enrollmentController.getAllEnrollments);

// GET /api/enrollments/:id
// Retrieves a specific enrollment by their ID
// :id - MongoDB ObjectId of the enrollment
router.get("/api/enrollment/:id", authMiddleware, enrollmentController.getEnrollmentById);

// PUT /api/enrollments/:id
// Updates an existing enrollment's information
// :id - MongoDB ObjectId of the enrollment to update
// Request body should contain updated enrollment details
router.put("/api/enrollment/:id", authMiddleware, enrollmentController.updateEnrollment);

// DELETE /api/enrollments/:id
// Removes an enrollment from the database
// :id - MongoDB ObjectId of the enrollment to delete
router.delete("/api/enrollment/:id", authMiddleware, enrollmentController.deleteEnrollment);

// Export the router for use in main application
export default router;
