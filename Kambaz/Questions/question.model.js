import mongoose from "mongoose";
import questionSchema from "./question.schema.js";
const questionModel = mongoose.model("QuestionsModel", questionSchema);
export default questionModel;
