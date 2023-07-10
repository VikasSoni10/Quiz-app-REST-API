const { Quiz, Submission } = require("../models/quizModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { v4: uuidv4 } = require("uuid");

//Create quiz -- Creator

exports.createQuiz = catchAsyncErrors(async (req, res, next) => {
  const quizId = uuidv4();
  const details = req.body;
  details.quizId = quizId;
  const link = `http://localhost:4000/api/v1/quiz/${quizId}`;
  details.share = link;
  const quiz = await Quiz.create(details);
  res.status(201).json({
    success: true,
    quiz,
  });
});

//Quiz retrieval/share

exports.retrieveQuiz = catchAsyncErrors(async (req, res, next) => {
  const quiz = await Quiz.find({ quizId: req.params.quizId });

  if (!quiz) {
    return next(new ErrorHandler("Quiz not found", 404));
  }

  res.status(200).json({
    success: true,
    quiz,
  });
});

//Quiz Submission

exports.submitQuiz = catchAsyncErrors(async (req, res, next) => {
  const quizId = req.params.quizId;
  const participantAnswers = req.body.answers;
  const participantDetails = req.body.details;

  const quiz = await Quiz.findOne({ quizId: quizId });

  if (!quiz) {
    return next(new ErrorHandler("Quiz not found", 404));
  }
  let score = 0;

  for (let i = 0; i < quiz.questions.length; i++) {
    const question = quiz.questions[i];
    const correctAnswers = question.correctAnswers;
    const participantChosenAnswers = participantAnswers[i];

    if (compareArrays(correctAnswers, participantChosenAnswers)) {
      score++;
    }
  }

  const submission = await Submission.create({
    quizId,
    participantDetails,
    participantAnswers,
    score,
  });

  res.status(201).json({
    success: true,
    score,
  });
});

function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

//Return list of participants and their scores - Creator

exports.quizResult = catchAsyncErrors(async (req, res, next) => {
  const quizId = req.params.quizId;

  const result = await Submission.find({ quizId });
  let finalResult = [];
  for (let i = 0; i < result.length; i++) {
    finalResult.push({
      name: result[i].participantDetails.name,
      email: result[i].participantDetails.email,
      score: result[i].score,
    });
  }

  res.status(200).json({
    success: true,
    finalResult,
  });
});
