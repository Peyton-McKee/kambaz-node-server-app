import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
  {
    _id: String,
    type: { type: String, enum: ["T_F", "MULTIPLE", "FILL_IN_BLANK"] },
    points: Number,
    question: String,
    title: String,
    quiz: { type: String, ref: "QuizzesModel" },
  },
  { collection: "QuestionsCollection" }
);
export default questionSchema;
