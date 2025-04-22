import model from "./model.js";
import * as questionDao from "../Questions/dao.js";
import { v4 as uuidv4 } from "uuid";
import * as quizDao from "../Quizzes/dao.js";

export const create = async (user, questionId, answer) => {
  const question = await questionDao.getQuestion(questionId);

  const quiz = await quizDao.getQuiz(question.quiz);

  const [previousAnswer] = await model.find({ user, question: questionId });

  let correct = false;
  if (question.type === "T_F") {
    if (answer === question.correctChoice.toString()) {
      correct = true;
    }
  } else if (question.type === "FILL_IN_BLANK") {
    if (
      question.potentialAnswers.some(
        (possibleAnswer) =>
          possibleAnswer.toLowerCase() === answer.toLowerCase()
      )
    ) {
      correct = true;
    }
  } else {
    if (question.correctAnswer === answer) {
      correct = true;
    }
  }

  if (previousAnswer) {
    if (!quiz.numAttempts || previousAnswer.attemptNumber >= quiz.numAttempts) {
      throw new Error(
        `Question only accepts ${question.numAttempts ?? 1} attempts`
      );
    }
    return model.updateOne(
      { _id: previousAnswer._id },
      {
        $set: {
          answer,
          correct,
          attemptNumber: previousAnswer.attemptNumber + 1,
        },
      }
    );
  } else {
    return model.create({
      _id: uuidv4(),
      question: questionId,
      user,
      answer,
      correct,
      attemptNumber: 1,
    });
  }
};

export const getUsersAnswerForQuestion = async (user, question) => {
  const answer = await model.findOne({ user, question });

  return answer;
};

export const getUsersScoreForQuiz = async (user, quiz) => {
  const questions = await questionDao.getQuestionsForQuiz(quiz);

  let score = 0;
  let anyAnswered = false;
  for (const question of questions) {
    const answer = await model.findOne({ question: question._id, user });
    if (answer) {
      score = score + (answer.correct ? question.points ?? 0 : 0);
      anyAnswered = true;
    }
  }
  return anyAnswered ? score : undefined;
};
