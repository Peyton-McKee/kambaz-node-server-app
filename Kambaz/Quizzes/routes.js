import * as quizzesDao from "./dao.js";
import * as answersDao from "../QuestionAnswer/dao.js";

const QuizRoutes = (app) => {
  app.get("/api/quizzes/:id", async (req, res) => {
    const quiz = await quizzesDao.getQuiz(req.params.id);
    res.json(quiz);
  });

  app.put("/api/quizzes/:id", async (req, res) => {
    const updatedQuiz = await quizzesDao.updateQuiz(req.params.id, req.body);
    res.json(updatedQuiz);
  });

  app.delete("/api/quizzes/:id", async (req, res) => {
    await quizzesDao.deleteQuiz(req.params.id);
    res.status(201).send();
  });

 
};

export default QuizRoutes;
