import express from "express";
import {
  createEmployeeController,
  employeeForgotPassword,
  employeeForgotPasswordOtp,
  employeeLogin,
} from "../../controller/authEmployee.js";
const employeeAuthRouter = express.Router();

/**
 * @swagger
 *  /auth/employee/register:
 *    post:
 *     tags:
 *     - Employee Authentication
 *     summary: Create an employee
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - first_name
 *              - last_name
 *              - company_name
 *              - phone_number
 *            properties:
 *              email:
 *                type: string
 *                default: graceEffiong@womentechsters.org
 *              role:
 *                type: string
 *                default: line manager
 *              first_name:
 *                type: string
 *                default: Miracle
 *              last_name:
 *                type: string
 *                default: Odin
 *              company_name:
 *                type: string
 *                default: RIS competition
 *              phone_number:
 *                type: string
 *                default: 08136285532
 *
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

employeeAuthRouter.post("/register", createEmployeeController);

/**
 * @swagger
 *  /auth/employee/login:
 *   post:
 *     tags:
 *     - Employee Authentication
 *     summary: log in an employee
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
 *                default: 56e82550f9d64350bcf939060051ca761e9bf580
 *
 *     responses:
 *      200:
 *        description: Successful
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
employeeAuthRouter.post("/login", employeeLogin);

/**
 * @swagger
 *  /auth/employee/otp:
 *   post:
 *     tags:
 *     - Employee Authentication
 *     summary: Get OTP
 *     description: Get employee reset password otp.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                default: graceEffiong@womentechsters.org
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
employeeAuthRouter.post("/otp", employeeForgotPasswordOtp);

/**
 * @swagger
 *  /auth/employee/forgot-password:
 *   post:
 *     tags:
 *     - Employee Authentication
 *     summary: Reset employee password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - otp
 *              - new_password
 *              - confirm_password
 *            properties:
 *              email:
 *                type: string
 *                default: graceEffiong@womentechsters.org
 *              otp:
 *                type: number
 *                default: 4887
 *              new_password:
 *                type: string
 *                default: password
 *              confirm_password:
 *                type: string
 *                default: password
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
employeeAuthRouter.post("/forgot-password", employeeForgotPassword);

export default employeeAuthRouter;
