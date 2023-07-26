import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    fetchQuestions();
  }, []);

  
  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:4000/questions");
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await response.json();
      setQuestions(data); 
      setIsLoading(false); 
    } catch (error) {
      console.error("Error fetching questions:", error);
      setIsLoading(false); 
    }
  };


  const addQuestion = async (formData) => {
    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add the question");
      }

      
      fetchQuestions();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  
  const updateQuestion = async (questionId, formData) => {
    try {
      const response = await fetch(
        `http://localhost:4000/questions/${questionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the question");
      }

      
      fetchQuestions();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  
  const deleteQuestion = async (questionId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/questions/${questionId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the question");
      }

      
      fetchQuestions();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <QuestionList
          key={questions.length} 
          questions={questions}
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
        />
      )}
    </main>
  );
}

export default App;
