import "./viewQuiz.scss";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";

const ViewQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const navigate  = useNavigate();
  let {currentUser} = useContext(AuthContext);
  let isAdmin = true;

  if(currentUser.email === "adam@adam.com"){
    isAdmin = true;
  } else {
    isAdmin = false;
  }

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizDoc = await getDoc(doc(db, "quizzes", quizId));
      if (quizDoc.exists()) {
        setQuiz(quizDoc.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsCorrect(option === quiz.answer);
  };

  return (
    <div className="quiz-view">
      <button onClick={() => navigate("/quizes")}>Back</button>  
      {quiz && (
        <div className="quiz-box">
          <h2>{quiz.question}</h2>
          {["optionA", "optionB", "optionC", "optionD"].map((optionKey) => (
            <button
              key={optionKey}
              onClick={() => handleOptionClick(quiz[optionKey])}
            >
              {quiz[optionKey]}
            </button>
          ))}
          {selectedOption && (
            <p>
              You selected {selectedOption}. This is{" "}
              {isCorrect ? "correct" : "incorrect"}.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewQuiz;
