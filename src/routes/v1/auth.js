import express from "express";
import { register } from "../../controller/auth.js";
const authRouter = express.Router();

/**
 * @swagger
 * /auth:
 *   post:
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
 *              - company_name
 *              - type_of_company
 *              - email
 *              - phone_number
 *            properties:
 *              company_name:
 *                type: string
 *                default: RIS
 *              type_of_company:
 *                type: string
 *                default: SME
 *              email:
 *                type: string
 *                default: ris@gmail.com
 *              phone_number:
 *                type: string
 *                default: 08092345671
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */

authRouter.post("/", register);

export default authRouter;
