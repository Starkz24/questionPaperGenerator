const mongoose = require('mongoose');
const Question = require('./question');

mongoose.connect('mongodb://localhost:27017/questionStore');

const sampleQuestions = [
  {
    question: 'What is the speed of light?',
    subject: 'Physics',
    topic: 'Waves',
    difficulty: 'easy',
    marks: 5,
  },
  {
    question: 'Explain the concept of gravitational waves.',
    subject: 'Physics',
    topic: 'Waves',
    difficulty: 'medium',
    marks: 10,
  },
  {
    question: 'Derive the formula for kinetic energy.',
    subject: 'Physics',
    topic: 'Energy',
    difficulty: 'medium',
    marks: 8,
  },
  {
    question: 'Describe the structure of an atom.',
    subject: 'Chemistry',
    topic: 'Atomic Structure',
    difficulty: 'hard',
    marks: 15,
  },
  {
    question: 'Sample question 5',
    subject: 'Math',
    topic: 'Algebra',
    difficulty: 'easy',
    marks: 3,
  },
  {
    question: 'Sample question 6',
    subject: 'Math',
    topic: 'Geometry',
    difficulty: 'medium',
    marks: 7,
  },
  {
    question: 'Sample question 7',
    subject: 'Math',
    topic: 'Calculus',
    difficulty: 'hard',
    marks: 12,
  },
  {
    question: 'Sample question 8',
    subject: 'Biology',
    topic: 'Genetics',
    difficulty: 'medium',
    marks: 9,
  },
  {
    question: 'Sample question 9',
    subject: 'Biology',
    topic: 'Ecology',
    difficulty: 'easy',
    marks: 4,
  },
  {
    question: 'Sample question 10',
    subject: 'Biology',
    topic: 'Cell Biology',
    difficulty: 'hard',
    marks: 14,
  },
  {
    question: 'Sample question 11',
    subject: 'History',
    topic: 'World War II',
    difficulty: 'medium',
    marks: 6,
  },
  {
    question: 'Sample question 12',
    subject: 'History',
    topic: 'Ancient Civilizations',
    difficulty: 'hard',
    marks: 13,
  },
  {
    question: 'Sample question 13',
    subject: 'Geography',
    topic: 'Physical Geography',
    difficulty: 'easy',
    marks: 5,
  },
  {
    question: 'Sample question 14',
    subject: 'Geography',
    topic: 'Human Geography',
    difficulty: 'medium',
    marks: 8,
  },
  {
    question: 'Sample question 15',
    subject: 'Geography',
    topic: 'Climate Change',
    difficulty: 'hard',
    marks: 12,
  },
  {
    question: 'Sample question 16',
    subject: 'Computer Science',
    topic: 'Programming',
    difficulty: 'easy',
    marks: 4,
  },
  {
    question: 'Sample question 17',
    subject: 'Computer Science',
    topic: 'Data Structures',
    difficulty: 'medium',
    marks: 9,
  },
  {
    question: 'Sample question 18',
    subject: 'Computer Science',
    topic: 'Artificial Intelligence',
    difficulty: 'hard',
    marks: 15,
  },
  {
    question: 'Sample question 19',
    subject: 'English',
    topic: 'Literature',
    difficulty: 'medium',
    marks: 7,
  },
  {
    question: 'Sample question 20',
    subject: 'English',
    topic: 'Grammar',
    difficulty: 'easy',
    marks: 5,
  },
  {
    question: 'Sample question 21',
    subject: 'English',
    topic: 'Poetry',
    difficulty: 'hard',
    marks: 13,
  },
  {
    question: 'Sample question 22',
    subject: 'Economics',
    topic: 'Microeconomics',
    difficulty: 'medium',
    marks: 8,
  },
  {
    question: 'Sample question 23',
    subject: 'Economics',
    topic: 'Macroeconomics',
    difficulty: 'hard',
    marks: 14,
  },
  {
    question: 'Sample question 24',
    subject: 'Political Science',
    topic: 'Government Systems',
    difficulty: 'easy',
    marks: 3,
  },
  {
    question: 'Sample question 25',
    subject: 'Political Science',
    topic: 'International Relations',
    difficulty: 'medium',
    marks: 10,
  },
  {
    question: 'Sample question 26',
    subject: 'Psychology',
    topic: 'Cognitive Psychology',
    difficulty: 'hard',
    marks: 12,
  },
  {
    question: 'Sample question 27',
    subject: 'Psychology',
    topic: 'Abnormal Psychology',
    difficulty: 'medium',
    marks: 8,
  },
  {
    question: 'Sample question 28',
    subject: 'Sociology',
    topic: 'Social Institutions',
    difficulty: 'easy',
    marks: 5,
  },
  {
    question: 'Sample question 29',
    subject: 'Sociology',
    topic: 'Cultural Sociology',
    difficulty: 'medium',
    marks: 9,
  },
  {
    question: 'Sample question 30',
    subject: 'Sociology',
    topic: 'Deviance and Crime',
    difficulty: 'hard',
    marks: 14,
  },
  {
    question: 'Sample question 31',
    subject: 'Sociology',
    topic: 'Deviance and Crime',
    difficulty: 'easy',
    marks: 1,
  },
];

const seedDatabase = async () => {
  try {
    await Question.deleteMany();

    for (const questionData of sampleQuestions) {
      const question = new Question(questionData);
      await question.save();
    }

    console.log('Sample data inserted successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedDatabase();
