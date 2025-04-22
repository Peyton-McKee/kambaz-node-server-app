import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
import * as questionsDao from "../Questions/dao.js";
import * as answersDao from "../QuestionAnswer/dao.js";

export const getQuiz = async (id) => {
  const quiz = await model.findById(id);
  const questions = await questionsDao.getQuestionsForQuiz(quiz._id);

  return {
    ...quiz,
    points: questions.reduce((prev, curr) => prev + curr.points, 0),
    questions: questions.map((question) => question._id),
  };
};

export const createQuiz = (args) => {
  const quiz = { ...args, _id: uuidv4() };
  return model.create(quiz);
};

export const updateQuiz = async (id, args) => {
  return model.updateOne({ _id: id }, { $set: args });
};

export const deleteQuiz = async (id) => {
  await questionsDao.deleteQuestionsForQuiz(id);
  return model.deleteOne({ _id: id });
};

export const getQuizzesForCourse = async (courseId, userId) => {
  const quizzes = await model.find({ course: courseId });
  return await Promise.all(
    quizzes.map(async (quiz) => {
      const questions = await questionsDao.getQuestionsForQuiz(quiz._id);

      return {
        ...quiz._doc,
        points: questions.reduce((prev, curr) => prev + (curr.points ?? 0), 0),
        questions: questions.map((question) => question._id),
        score: await answersDao.getUsersScoreForQuiz(userId, quiz._id),
      };
    })
  );
};
