const express = require("express");
const {createQuiz, retrieveQuiz,submitQuiz, quizResult} = require("../controllers/quizController");

const router = express.Router();

router.route("/quiz/new").post(createQuiz);
router.route("/quiz/:quizId").get(retrieveQuiz);
router.route("/quiz/:quizId/submit").post(submitQuiz);
router.route("/quiz/:quizId/result").get(quizResult);


module.exports  = router;