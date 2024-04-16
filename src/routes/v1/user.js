import express from "express";
import currentUser from "../../controller/userController.js";
import authenticate from "../../middleware/authentication.js";
const userRouter = express.Router();

/**
 * @swagger
 *  /user:
 *   get:
 *     tags:
 *     - Dashboard
 *     summary: Get current user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Successful
 *      401:
 *        description: Unauthorized access.
 *      403:
 *        description: Forbidden action.
 *      404:
 *        description: Not Found.
 *      500:
 *        description: Internal server error. Please try again later.
 */
userRouter.get("/", authenticate, currentUser);

/**
 * @swag
 *  /user:
 *   get:
 *     tags:
 *     - Company
 *     summary: Get current user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - company_name
 *              - type_of_company
 *              - phone_number
 *            properties:
 *              company_name:
 *                type: string
 *                default: RIS
 *              phone_number:
 *                type: string
 *                default: 08092345671
 *              industry:
 *                type: string
 *                default: technology
 *              no_of_employees:
 *                type: number
 *                default: 12
 *              locations:
 *                type: string
 *                default: ['now', 'there']
 *              current_ris:
 *                type: string
 *                default: HRseamless
 *              challenges:
 *                type: string
 *                default: None for now
 *              reason_for_use:
 *                type: string
 *                default: trial
 *     responses:
 *      200:
 *        description: Successful
 *      401:
 *        description: Unauthorized access.
 *      403:
 *        description: Forbidden action.
 *      404:
 *        description: Not Found.
 *      500:
 *        description: Internal server error. Please try again later.
 */
// userRouter.post("/", authenticate, currentUser);

export default userRouter;
