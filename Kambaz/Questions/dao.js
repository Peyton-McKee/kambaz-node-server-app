import questionModel from "./question.model.js";
import tfModel from "./true_false.model.js";
import multipleModel from "./multiple.model.js";
import fillModel from "./fill_in_blank.model.js";
import { v4 as uuidv4 } from "uuid";

const createQuestion = (title, question, points, type, quiz) => {
  return questionModel.create({
    _id: uuidv4(),
    title,
    question,
    type,
    points,
    quiz,
  });
};

const updateQuestion = (id, title, question, points) => {
  return questionModel.updateOne(
    { _id: id },
    {
      $set: {
        question,
        title,
        points,
      },
    }
  );
};

export const deleteQuestion = async (id) => {
  const originalQuestion = await getQuestion(id);

  if (originalQuestion.type === "T_F") {
    await tfModel.deleteOne({ question: originalQuestion._id });
  } else if (originalQuestion.type === "MULTIPLE") {
    await multipleModel.deleteOne({ question: originalQuestion._id });
  } else {
    await fillModel.deleteOne({ question: originalQuestion._id });
  }

  await questionModel.deleteOne({ _id: id });
};

export const getQuestion = async (id) => {
  const question = await questionModel.findOne({ _id: id });

  let params = {};
  if (question.type === "T_F") {
    const tf = await tfModel.find({ question: question._id });
    if (tf.length > 0) {
      params = tf[0];
    }
  } else if (question.type === "FILL_IN_BLANK") {
    const fill = await fillModel.find({ question: question._id });
    if (fill.length > 0) {
      params = fill[0];
    }
  } else {
    const multiple = await multipleModel.find({ question: question._id });
    if (multiple.length > 0) {
      params = multiple[0];
    }
  }

  return { ...params._doc, ...question._doc };
};

export const createTrueFalse = async (
  title,
  questionPrompt,
  points,
  correctAnswer,
  quiz
) => {
  const question = await createQuestion(
    title,
    questionPrompt,
    points,
    "T_F",
    quiz
  );

  const tf = await tfModel.create({
    _id: uuidv4(),
    question: question._id,
    correctChoice: correctAnswer,
  });

  return { question, tf };
};

export const createMultiple = async (
  title,
  questionPrompt,
  points,
  options,
  correctAnswer,
  quiz
) => {
  const question = await createQuestion(
    title,
    questionPrompt,
    points,
    "MULTIPLE",
    quiz
  );

  const multiple = await multipleModel.create({
    _id: uuidv4(),
    question: question._id,
    options,
    correctAnswer,
  });

  return { question, multiple };
};

export const createFillInBlank = async (
  title,
  questionPrompt,
  points,
  possibleAnswers,
  quiz
) => {
  const question = await createQuestion(
    title,
    questionPrompt,
    points,
    "FILL_IN_BLANK",
    quiz
  );

  const fill = await fillModel.create({
    _id: uuidv4(),
    question: question._id,
    potentialAnswers: possibleAnswers,
  });

  return { question, fill };
};

export const updateTrueFalse = async (
  id,
  title,
  questionPrompt,
  points,
  correctAnswer
) => {
  const question = await updateQuestion(id, title, questionPrompt, points);

  const tf = await tfModel.updateOne(
    { question: id },
    {
      $set: {
        correctChoice: correctAnswer,
      },
    }
  );

  return { question, tf };
};

export const updateMultiple = async (
  id,
  title,
  questionPrompt,
  points,
  options,
  correctAnswer
) => {
  const question = await updateQuestion(id, title, questionPrompt, points);

  const multiple = await multipleModel.updateOne(
    {
      question: id,
    },
    {
      $set: {
        options,
        correctAnswer,
      },
    }
  );

  return { question, multiple };
};

export const updateFillInBlank = async (
  id,
  title,
  questionPrompt,
  points,
  possibleAnswers
) => {
  const question = await updateQuestion(id, title, questionPrompt, points);

  const fill = await fillModel.updateOne(
    {
      question: id,
    },
    {
      $set: {
        potentialAnswers: possibleAnswers,
      },
    }
  );

  return { question, fill };
};

export const getQuestionsForQuiz = async (quiz) => {
  return questionModel.find({ quiz });
};

export const deleteQuestionsForQuiz = async (quiz) => {
  return questionModel.deleteMany({ quiz });
};
