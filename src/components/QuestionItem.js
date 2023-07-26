import React from "react";

function QuestionItem({ question, updateQuestion, deleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;


  const options =
    answers &&
    answers.map((answer, index) => (
      <option key={index} value={index}>
        {answer}
      </option>
    ));

  const handleAnswerChange = (event) => {
    const newCorrectIndex = parseInt(event.target.value);
    
    updateQuestion(id, { ...question, correctIndex: newCorrectIndex });
  };

  const handleDelete = () => {
    
    deleteQuestion(id);
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
