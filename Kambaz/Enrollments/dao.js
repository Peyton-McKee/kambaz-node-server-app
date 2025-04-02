import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  const enrollment = { _id: uuidv4(), user: userId, course: courseId };
  Database.enrollments = [...enrollments, enrollment];
  return enrollment;
}

export function getEnrollmentForUserAndCourse(userId, courseId) {
  const { enrollments } = Database;
  const enrollment = enrollments.find(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  return enrollment;
}

export function unenrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) =>
      !(enrollment.user === userId && enrollment.course === courseId)
  );

  return Database.enrollments;
}

export function getEnrollmentsForUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}
