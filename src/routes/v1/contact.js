import express from "express";
import contact from "../../controller/contact.js";
const contactRouter = express.Router();

/**
 * @swagger
 *  /contact:
 *    post:
 *     tags:
 *     - Contact
 *     summary: Contact RIS
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - first_name
 *              - company_name
 *            properties:
 *              email:
 *                type: string
 *                default: graceffiong@gmail.com
 *              first_name:
 *                type: string
 *                default: Grace
 *              last_name:
 *                type: string
 *                default: Ruby
 *              company_name:
 *                type: string
 *                default: RIS competition
 *              phone_number:
 *                type: string
 *                default: +2348136285533
 *              type_of_enquiry:
 *                type: string
 *                default: Help
 *              message:
 *                type: string
 *                default: Long string of information that is needed by me to test this contact endpoint.
 *
 *     responses:
 *      200:
 *        description: Successful
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

contactRouter.post("/", contact);

export default contactRouter;
