import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    published: Boolean,
    dueDate: String,
    dateAvailable: String,
    availableUntil: String,
    quizType: {
      type: String,
      enum: [
        "GRADED_QUIZ",
        "PRACTICE_QUIZ",
        "GRADED_SURVEY",
        "UNGRADED_SURVEY",
      ],
    },
    shuffleAnswers: Boolean,
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
    },
    timeLimit: Number,
    numAttempts: Number,
    showCorrectAnswers: Boolean,
    accessCode: String,
    oneQuestionAtATime: Boolean,
    webCamRequired: Boolean,
    lockQuestionsAfterAnswering: Boolean,
    course: { type: String, ref: "CoursesModel" },
  },
  { collection: "QuizzesCollection" }
);
export default schema;
