import mongoose from "mongoose";

/**
 * -- Which user gives to AI to analyze
 * job description schema 
 * resume text
 * self description
 * 
 * -- which AI reports
 * 
 * 
 * Match Score : Number
 * 
 * 
 * 
 * Technical questions: [{
 *      question : "",
 *      answers : "",
 *      intension: ""     # what interviewer wants to know about you , by this question
 * }]
 * Behavioural questions : [{
 *      question : "",
 *      answers : "",
 *      intension: ""     
 * }]
 * Skill gaps : [{
 *      skill : "",
 *      severity : {
 *        type : string,
 *        enum : ["low", "med", "high"]
 *      }
 * }]
 * preparation plan [{
 *       day : Number,
 * 1`    focus : String,
 *        tasks : [string]
 * }]
 * 
 */


const technicalQuestionsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Technical question is required"],
  },
  intension: {
    type: String,
    required: [true, "Intension is required"],
  },
  answer: {
    type: String,
    required: [true, "Technical answer is required"],
  },
}, {
  _id: false
});

const behaviouralQuestionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Behavioural question is required"],
    },
    intension: {
      type: String,
      required: [true, "Intension is required"],
    },
    answer: {
      type: String,
      required: [true, "Behavioural answer is required"],
    },
  },
  {
    _id: false,
  }
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "severity is required"],
    },
  },
  {
    _id: false,
  }
);

preparationPlanSchema = new mongoose.Schema({\
  day: {
    type: Number,
    required: [true, "Day is required"],
  },
  focus: {
    type: Number,
    required: [true, "Focus is required"],
  },
  tasks: {
    type: Number,
    required: [true, "Task is required"],
  }
},
  {
    _id: false,
  })



const interviewReportSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: true
  },
  resume: String,
  selfDescription: String,
  
  matchScore: {
    type: Number,
    min: 0,
    max : 100
  },

  technicalQuestions: [technicalQuestionsSchema],
  behaviouralQuestions: [behaviouralQuestionsSchema],
  skillGap: [skillGapSchema],
  preparationPlan: [preparationPlanSchema]



}, { timestamps: true })


const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema);

export default interviewReportModel;