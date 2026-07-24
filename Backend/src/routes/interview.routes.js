import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import upload from "../middleware/file.middleware.js";
import { generateInterviewReportController } from "../controller/interview.controller.js";

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @description generate new interview report basis on user self description , resume and job description
 * @access private
 */

interviewRouter.post("/", authUser, upload.single("resume"), generateInterviewReportController);

export default interviewRouter;