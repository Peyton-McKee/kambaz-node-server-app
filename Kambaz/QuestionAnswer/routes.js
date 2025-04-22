import * as answerDao from "./dao.js";

const QuestionAnswerRoutes = (app) => {
  app.post("/api/answers/create", async (req, res) => {
    const { question, answer } = req.body;
    const user = req.session["currentUser"];
    try {
      const createdAnswer = await answerDao.create(user._id, question, answer);
      res.json(createdAnswer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

export default QuestionAnswerRoutes;
