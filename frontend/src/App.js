import React, { useState} from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [questions, setQuestions] = useState([]);
  const [totalMarks, setTotalMarks] = useState('');
  const [easyPercentage, setEasyPercentage] = useState('');
  const [mediumPercentage, setMediumPercentage] = useState('');
  const [hardPercentage, setHardPercentage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchQuestions = async () => {
    try {

      setQuestions([]);
      setLoading(true);

      const requestData = {
        easy: parseInt(easyPercentage),
        medium: parseInt(mediumPercentage),
        hard: parseInt(hardPercentage),
        total: parseInt(totalMarks),
      };

      const totalPercentage = parseInt(easyPercentage) + parseInt(mediumPercentage) + parseInt(hardPercentage);
      if (totalPercentage !== 100) {
        setErrorMessage('Invalid percentage distribution. The total should be 100%.');
        setLoading(false);
        return;
      }
      setErrorMessage('');

      const response = await axios.post('http://localhost:3001/api/questions', requestData);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuestions();
  };

  return (
    <div>
      <h1>Question Paper Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Total Marks:
          <input type="number" value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} />
        </label>
        <br />
        <label>
          Easy Percentage:
          <input type="number" value={easyPercentage} onChange={(e) => setEasyPercentage(e.target.value)} />
        </label>
        <br />
        <label>
          Medium Percentage:
          <input type="number" value={mediumPercentage} onChange={(e) => setMediumPercentage(e.target.value)} />
        </label>
        <br />
        <label>
          Hard Percentage:
          <input type="number" value={hardPercentage} onChange={(e) => setHardPercentage(e.target.value)} />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Questions'}
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
      <h2>Questions:</h2>
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <strong>Question:</strong> {question.question} <br />
            <strong>Subject:</strong> {question.subject} <br />
            <strong>Topic:</strong> {question.topic} <br />
            <strong>Difficulty:</strong> {question.difficulty} <br />
            <strong>Marks:</strong> {question.marks} <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

