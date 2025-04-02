import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments/:userId/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = enrollmentsDao.getEnrollmentForUserAndCourse(
      userId,
      courseId
    );

    return res.json(enrollment);
  });

  app.post("/api/enrollments/:userId/:courseId/unenroll", (req, res) => {
    const { userId, courseId } = req.params;
    const enrollments = enrollmentsDao.unenrollUserInCourse(userId, courseId);
    res.json(enrollments);
  });

  app.post("/api/enrollments/:userId/:courseId/enroll", (req, res) => {
    const { userId, courseId } = req.params;
    const enrollments = enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.json(enrollments);
  });
}
