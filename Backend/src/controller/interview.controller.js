import { PDFParse } from "pdf-parse";
import { generateInterviewReport,generateResumePdf } from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";

async function generateInterviewReportController(req, res) {
  const resumeFile = req.file;

  const resumeContent = await new PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAI = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAI,
  });

  res.status(201).json({
    message: "Interview report generated successfully.",
    interviewReport,
  });
}

async function generateInterviewReportByIdController(req, res) {
  
  const { interviewId } = req.params;

  const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });

  if (!interviewReport) {
    return res.status(401).json({
      message: "Interview report is not found."
    })
  }

  res.status(200).json({
    message: "Interview report is fetched successfully.",
    interviewReport
  })
}

async function getAllInterviewReportController(req, res) {

  const interviewReports = await interviewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGap -preparationPlan",
    );

  res.status(200).json({
    message: "Interview reports fetched successfully.",
    interviewReports,
  });
}

async function generateResumePdfController(req, res) {
  
  const { interviewReportId } = req.params;
  
  const interviewReport = await interviewReportModel.findById(interviewReportId);

  if (!interviewReport) {
    return res.status(401).json({
      message: "Interview report is not found"
    })
  }

  const { resume, selfDescription, jobDescription } = interviewReport;

  const PdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
  });

  res.send(PdfBuffer);

}

export { generateInterviewReportController, generateInterviewReportByIdController, getAllInterviewReportController, generateResumePdfController };
