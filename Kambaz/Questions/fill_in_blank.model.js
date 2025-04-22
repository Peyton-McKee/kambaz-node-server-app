import mongoose from "mongoose";
import fillSchema from "./fill_in_blank.schema.js";
const fillModel = mongoose.model("Fill_In_Blank_Model", fillSchema);
export default fillModel;
