import express from "express";
import {
  adminLogin,
  adminRegister,
  adminVerify,
} from "../../controller/authAdmin.js";
const adminAuthRouter = express.Router();

/**
 * @swagger
 *  /auth/admin/register:
 *    post:
 *     tags:
 *     - Admin Authentication
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
 *              - first_name
 *              - last_name
 *              - company_name
 *              - phone_number
 *            properties:
 *              email:
 *                type: string
 *                default: graceEffiong@womentechsters.org
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *              role:
 *                type: string
 *                default: admin
 *              first_name:
 *                type: string
 *                default: John
 *              last_name:
 *                type: string
 *                default: Doe
 *              company_name:
 *                type: string
 *                default: RIS competition
 *              phone_number:
 *                type: string
 *                default: 08136285533
 *              no_of_employees:
 *                type: number
 *                default: 3
 *              industry:
 *                type: string
 *                default: Health
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
 *     - Admin Authentication
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
 *                default: graceEffiong@womentechsters.org
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
 *  /auth/admin/verify-email/{token}:
 *   get:
 *     tags:
 *     - Admin Authentication
 *     summary: verify a user
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *
 *     responses:
 *      200:
 *        description: Successful
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
adminAuthRouter.get("/verify-email/:token", adminVerify);

export default adminAuthRouter;
