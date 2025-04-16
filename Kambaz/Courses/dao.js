import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
import * as enrollmentsDao from "../Enrollments/dao.js";

export function findAllCourses() {
  return model.find();
}

export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
}

export async function deleteCourse(courseId) {
  await model.deleteOne({ _id: courseId });
  return enrollmentsDao.removeEnrollmentsForCourse(courseId);
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
