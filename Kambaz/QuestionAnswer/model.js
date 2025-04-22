import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("QuestionAnswerModel", schema);
export default model;
