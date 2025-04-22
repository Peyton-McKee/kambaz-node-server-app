import mongoose from "mongoose";
const fillSchema = new mongoose.Schema(
  {
    _id: String,
    question: { type: String, ref: "QuestionsModel" },
    potentialAnswers: [String],
  },
  { collection: "Fill_In_Blank_Collection" }
);
export default fillSchema;
