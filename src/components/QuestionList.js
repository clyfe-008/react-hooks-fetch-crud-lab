import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, updateQuestion, deleteQuestion }) {
  // Check if questions is undefined or an empty array
  if (!questions || questions.length === 0) {
    return <div>No questions available.</div>;
  }

  return (
    <div>
      <h1>Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            updateQuestion={updateQuestion}
            deleteQuestion={deleteQuestion}
          />
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
