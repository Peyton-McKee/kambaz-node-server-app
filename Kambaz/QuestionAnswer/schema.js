import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    question: { type: String, ref: "QuestionsModel" },
    user: { type: String, ref: "UserModel" },
    correct: Boolean,
    answer: String,
    attemptNumber: Number,
  },
  { collection: "QuestionAnswersCollection" }
);
export default schema;
