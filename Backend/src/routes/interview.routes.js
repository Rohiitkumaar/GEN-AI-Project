import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import upload from "../middleware/file.middleware.js";
import { getAllInterviewReportController , generateInterviewReportController, generateInterviewReportByIdController } from "../controller/interview.controller.js";

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @description generate new interview report basis on user self description , resume and job description
 * @access private
 */

interviewRouter.post("/", authUser, upload.single("resume"), generateInterviewReportController);

/**
 * @route GET /api/interview/report/:interviewId
 * @description retrieve the user interview report by the given interview id
 * @access private
 */

interviewRouter.get("/report/:interviewId", authUser, generateInterviewReportByIdController);


/**
 * @route GET /api/interview/
 * @description retrieve all the interview report
 * @access private
 */

interviewRouter.get("/", authUser, getAllInterviewReportController);




export default interviewRouter;