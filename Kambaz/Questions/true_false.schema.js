import mongoose from "mongoose";
const tfSchema = new mongoose.Schema(
  {
    _id: String,
    question: { type: String, ref: "QuestionsModel" },
    correctChoice: Boolean,
  },
  { collection: "True_FalseCollection" }
);
export default tfSchema;
