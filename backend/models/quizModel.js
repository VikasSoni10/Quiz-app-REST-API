const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter quiz title"],
  },
  description: {
    type: String,
    required: [true, "Please enter quiz description"],
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      multipleChoices: [
        {
          type: String,
        },
      ],
      correctAnswers: [
        {
          type: String,
        },
      ],
    },
  ],
  quizId: {
    type: String,
    required: true,
  },
  share: {
    type: String,
    required: true,
  },
});

const submissionSchema = mongoose.Schema({
  quizId: {
    type: String,
    required: true,
  },
  participantDetails: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  participantAnswers: [
    {
      type: Array,
    },
  ],
  score: {
    type: Number,
    required: true,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);
const Submission = mongoose.model("Submission", submissionSchema);

module.exports = {
  Quiz,
  Submission,
};
