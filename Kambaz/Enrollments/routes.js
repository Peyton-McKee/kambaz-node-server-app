import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments/:userId/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = await enrollmentsDao.getEnrollmentForUserAndCourse(
      userId,
      courseId
    );

    return res.json(enrollment);
  });

  app.post("/api/enrollments/:userId/:courseId/unenroll", async (req, res) => {
    const { userId, courseId } = req.params;
    const enrollments = await enrollmentsDao.unenrollUserFromCourse(
      userId,
      courseId
    );
    res.json(enrollments);
  });

  app.post("/api/enrollments/:userId/:courseId/enroll", async (req, res) => {
    const { userId, courseId } = req.params;
    const enrollments = await enrollmentsDao.enrollUserInCourse(
      userId,
      courseId
    );
    res.json(enrollments);
  });
}
