import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, required: true },
    course: { type: String, ref: "CourseModel" },
    description: String,
    numPoints: Number,
    dueDate: String,
    dateAvailable: String,
    availableUntil: String,
    
  },
  { collection: "assignments" }
);

export default assignmentSchema;
