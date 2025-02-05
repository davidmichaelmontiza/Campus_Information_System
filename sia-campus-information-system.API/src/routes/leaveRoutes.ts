import express from "express";
import { LeaveController } from "../controllers/leaveController";
import { authMiddleware } from "../middleware/authMiddleware";

// Initialize express Router
const router = express.Router();
// Create instance of LeaveController to handle route logic
const leaveController = new LeaveController();
/**
 * @swagger
 * tags:
 *   name: Leave
 *   description: Leave management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Leave:
 *       type: object
 *       properties:
 *         Leave_ID:
 *           type: string
 *           description: Unique identifier for the leave request
 *           example: "LV-001"
 *         Leave_Type:
 *           type: string
 *           description: Type of leave (e.g., sick, vacation, emergency)
 *           example: "Sick Leave"
 *         Faculty_ID:
 *           type: string
 *           description: ID of the faculty requesting the leave
 *           example: "FAC-12345"
 *         Date:
 *           type: string
 *           format: date
 *           description: Date of the leave
 *           example: "2024-11-22"
 *         Status:
 *           type: string
 *           description: Current status of the leave request (e.g., pending, approved, rejected)
 *           example: "pending"
 *       required:
 *         - Leave_ID
 *         - Leave_Type
 *         - Faculty_ID
 *         - Date
 *         - Status
 *
 *     LeaveResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the leave request
 *           example: "LV-001"
 *         Leave_Type:
 *           type: string
 *           description: Type of leave
 *           example: "Sick Leave"
 *         Faculty_ID:
 *           type: string
 *           description: ID of the faculty requesting the leave
 *           example: "FAC-12345"
 *         Date:
 *           type: string
 *           format: date
 *           description: Date of the leave
 *           example: "2024-11-22"
 *         Status:
 *           type: string
 *           description: Current status of the leave request
 *           example: "approved"
 */

/**
 * @swagger
 * /api/leave:
 *   post:
 *     summary: Create a new leave request
 *     tags: [Leave]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Leave'
 *     responses:
 *       201:
 *         description: Leave request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeaveResponse'
 *       400:
 *         description: Validation error
 *       409:
 *         description: Leave request already exists
 * 
 *   get:
 *     summary: Get all leave requests
 *     tags: [Leave]
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
 *         description: List of leave requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LeaveResponse'
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
 * /api/leave/{id}:
 *   get:
 *     summary: Get leave request by ID
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Leave request ID
 *     responses:
 *       200:
 *         description: Leave request details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeaveResponse'
 *       404:
 *         description: Leave request not found
 *   put:
 *     summary: Update leave request
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Leave request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Leave'
 *     responses:
 *       200:
 *         description: Leave request updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeaveResponse'
 *       404:
 *         description: Leave request not found
 *   delete:
 *     summary: Delete leave request
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Leave request ID
 *     responses:
 *       204:
 *         description: Leave request deleted successfully
 *       404:
 *         description: Leave request not found
 */


// Leave Routes:

// POST /api/leaves
// Creates a new leave
// Request body should contain leave details (type, status, startDate, endDate)
router.post("/api/leaves", authMiddleware, leaveController.createLeave);

// GET /api/leaves
// Retrieves all leaves from the database
// Returns array of leaves
router.get("/api/leaves", authMiddleware, leaveController.getAllLeaves);

// GET /api/leaves/:id
// Retrieves a specific leave by its ID
// :id - MongoDB ObjectId of the leave
router.get("/api/leaves/:id", authMiddleware, leaveController.getLeaveById);

// PUT /api/leaves/:id
// Updates an existing leave's information
// :id - MongoDB ObjectId of the leave to update
// Request body should contain updated leave details
router.put("/api/leaves/:id", authMiddleware, leaveController.updateLeave);

// DELETE /api/leaves/:id
// Removes a leave from the database
// :id - MongoDB ObjectId of the leave to delete
router.delete("/api/leaves/:id", authMiddleware, leaveController.deleteLeave);

// Export the router for use in main application
export default router;
