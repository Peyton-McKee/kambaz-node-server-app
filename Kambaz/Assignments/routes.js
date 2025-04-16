import * as assignmentDao from "./dao.js";

export function AssignmentRoutes(app) {
  app.put("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    const updatedAssignment = await assignmentDao.updateAssignment(
      aid,
      req.body
    );
    res.json(updatedAssignment);
  });

  app.delete("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    await assignmentDao.deleteAssignment(aid);
    res.status(201).send();
  });
}
