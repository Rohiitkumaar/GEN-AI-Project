import { getAllInterviewReports, generateInterviewReport, getInterviewReportById } from "../services/interview.api.js";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context.jsx";
import { useParams } from "react-router";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();

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


    } catch (error) {
      console.log(error)
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

  return { loading, report, reports, getReportById, getAllReports, generateReport}
  

}