import { getUsersAnswerForQuestion } from "../QuestionAnswer/dao.js";
import {
  createFillInBlank,
  createMultiple,
  createTrueFalse,
  deleteQuestion,
  getQuestion,
  updateFillInBlank,
  updateMultiple,
  updateTrueFalse,
} from "./dao.js";

const QuestionRoutes = (app) => {
  app.delete("/api/questions/delete/:id", async (req, res) => {
    await deleteQuestion(req.params.id);
    res.status(201).send();
  });

  app.get("/api/questions/:id", async (req, res) => {
    const question = await getQuestion(req.params.id);
    res.json(question);
  });

  app.post("/api/questions/tf", async (req, res) => {
    const { title, question, points, correctChoice, quiz } = req.body;
    const createdQuestion = await createTrueFalse(
      title,
      question,
      points,
      correctChoice,
      quiz
    );
    res.json(createdQuestion);
  });

  app.post("/api/questions/multiple", async (req, res) => {
    const { title, question, points, options, correctAnswer, quiz } = req.body;

    const createdQuestion = await createMultiple(
      title,
      question,
      points,
      options,
      correctAnswer,
      quiz
    );
    res.json(createdQuestion);
  });

  app.post("/api/questions/fill", async (req, res) => {
    const { title, question, points, potentialAnswers, quiz } = req.body;

    const createdQuestion = await createFillInBlank(
      title,
      question,
      points,
      potentialAnswers,
      quiz
    );
    res.json(createdQuestion);
  });

  app.put("/api/questions/tf/:id", async (req, res) => {
    const { title, question, points, correctChoice } = req.body;
    const updatedQuestion = await updateTrueFalse(
      req.params.id,
      title,
      question,
      points,
      correctChoice
    );
    res.json(updatedQuestion);
  });

  app.put("/api/questions/multiple/:id", async (req, res) => {
    const { title, question, points, options, correctAnswer } = req.body;
    const updatedQuestion = await updateMultiple(
      req.params.id,
      title,
      question,
      points,
      options,
      correctAnswer
    );
    res.json(updatedQuestion);
  });

  app.put("/api/questions/fill/:id", async (req, res) => {
    const { title, question, points, potentialAnswers } = req.body;
    const updatedQuestion = await updateFillInBlank(
      req.params.id,
      title,
      question,
      points,
      potentialAnswers
    );
    res.json(updatedQuestion);
  });

  app.get("/api/questions/:id/answers", async (req, res) => {
    const answers = await getUsersAnswerForQuestion(
      req.session["currentUser"]._id,
      req.params.id
    );
    res.json(answers);
  });
};

export default QuestionRoutes;
