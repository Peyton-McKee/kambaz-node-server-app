import mongoose from "mongoose";
import tfSchema from "./true_false.schema.js";
const tfModel = mongoose.model("True_False_Model", tfSchema);
export default tfModel;
