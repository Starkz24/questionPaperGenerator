const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Question = require('./question');

const app = express();
const PORT = process.env.PORT || 3001; 

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/questionStore')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.post('/api/questions', async (req, res) => {
  const { easy, medium, hard, total } = req.body;
  

  if (!Number.isInteger(easy) || !Number.isInteger(medium) || !Number.isInteger(hard) || !Number.isInteger(total)) {
    return res.status(400).json({ error: 'Invalid input. Please provide valid integer values.' });
  }

  const totalPercentage = easy + medium + hard;
  if (totalPercentage !== 100) {
    return res.status(400).json({ error: 'Invalid percentage distribution. The total should be 100%.' });
  }

  const generatedQuestions = await generateQuestions(easy, medium, hard, total);

  res.json(generatedQuestions);
});

async function generateQuestions(easy, medium, hard, total) {

  const totalEasyMarks = Math.floor((easy / 100) * total);
  const totalMediumMarks = Math.floor((medium / 100) * total);
  const totalHardMarks = Math.floor((hard / 100) * total);

  const allQuestions = await Question.find({});

  const filteredEasyQuestions = filterQuestionsByDifficulty(allQuestions, 'easy', totalEasyMarks);
  const filteredMediumQuestions = filterQuestionsByDifficulty(allQuestions, 'medium', totalMediumMarks);
  const filteredHardQuestions = filterQuestionsByDifficulty(allQuestions, 'hard', totalHardMarks);

  const filteredQuestions = filteredEasyQuestions.concat(filteredMediumQuestions, filteredHardQuestions);
  console.log('Filtered questions length:', filteredQuestions.length);
  console.log('Filtered questions:', filteredQuestions);

  return filteredQuestions;
}

function filterQuestionsByDifficulty(questions, difficulty, totalMarks) {
  let currentTotalMarks = 0;
  const filteredQuestions = [];

  for (const question of questions) {
    if (question.difficulty === difficulty && currentTotalMarks + question.marks <= totalMarks) {
      filteredQuestions.push(question);
      currentTotalMarks += question.marks;
    }

    if (currentTotalMarks === totalMarks) {
      break;
    }
  }

  shuffleArray(filteredQuestions);
  return filteredQuestions;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});