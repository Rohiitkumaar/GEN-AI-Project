import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api.js";
import { useContext } from "react";
import { InterviewContext } from "../interview.context.jsx";  
import { toast } from "sonner";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInverview must be used within InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;
  
  const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });

      setReport(response.interviewReport)

      toast.success(response.message);


    } catch (error) {
      console.log(error)
      toast.error("Our AI assistant is currently busy. Please try again in a few moments.");
    }
    finally {
      setLoading(false);
    }

    return response.interviewReport;
  }

  const getReportById = async (interviewId) => {
    setLoading(true);
    let response = null;
    try {
      response = await getInterviewReportById(interviewId);

      setReport(response.interviewReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    return response.interviewReport;
  }

  const getAllReports = async () => {
    setLoading(true);
    let response = null;
    try {
      response = await getAllInterviewReports();

      setReports(response.interviewReports);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    return response.interviewReports;
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    const toastId = toast.loading("AI is generating your resume. Please wait...");
    let response = null;
    try {

      response = await generateResumePdf({ interviewReportId });

      const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }));
      const link = document.createElement('a');
      link.href = url;

      link.setAttribute("download", `resume_${interviewReportId}.pdf`);

      document.body.appendChild(link);
      toast.dismiss(toastId);
      link.click();

      toast.success("Your generated resume is downloaded successfully.")

      
    } catch (error) {
      console.log(error)
      toast.error("Server is busy. Try again later.");
      
    } finally {
      setLoading(false)
    }

  }

  return { loading, report, reports, getReportById, getAllReports, generateReport, getResumePdf}
  

}