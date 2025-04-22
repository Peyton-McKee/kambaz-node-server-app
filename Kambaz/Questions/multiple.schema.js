import mongoose from "mongoose";
const multipleSchema = new mongoose.Schema(
  {
    _id: String,
    question: { type: String, ref: "QuestionsModel" },
    options: [String],
    correctAnswer: String,
  },
  { collection: "MultipleCollection" }
);
export default multipleSchema;
