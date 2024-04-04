import express from "express";
import {
  adminLogin,
  adminRegister,
  companyProfileCreate,
} from "../../controller/auth.js";
import authenticate from "../../middleware/authentication.js";
const adminAuthRouter = express.Router();

/**
 * @swagger
 *  /auth/admin/register:
 *    post:
 *     tags:
 *     - Authentication
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: ris@gmail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      500:
 *        description: Server Error
 */

adminAuthRouter.post("/register", adminRegister);

/**
 * @swagger
 *  /auth/admin/login:
 *   post:
 *     tags:
 *     - Authentication
 *     summary: log in a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: ris@gmail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *
 *     responses:
 *      200:
 *        description: Successful
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      500:
 *        description: Server Error
 */
adminAuthRouter.post("/login", adminLogin);

/**
 * @swagger
 *  /auth/admin/profile:
 *   post:
 *     tags:
 *     - Company
 *     summary: Create a company profile
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
 *      201:
 *        description: Company profile created successfully
 *      400:
 *        description: Invalid request data. Please check company name, type, or phone number format.
 *      401:
 *        description: Unauthorized access. Login credentials are required.
 *      403:
 *        description: Forbidden action. User might lack permission to create a company profile.
 *      500:
 *        description: Internal server error. Please try again later.
 */
adminAuthRouter.post("/profile", authenticate, companyProfileCreate);

export default adminAuthRouter;
