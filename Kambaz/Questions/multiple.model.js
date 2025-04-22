import mongoose from "mongoose";
import multipleSchema from "./multiple.schema.js";
const multipleModel = mongoose.model("MultipleModel", multipleSchema);
export default multipleModel;
