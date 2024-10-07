import "./viewTopologyQuiz.scss";
import { useContext, useEffect, useState } from "react";
import { Await, useNavigate, useParams } from "react-router-dom";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const ViewTopologyQuiz = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const navigate = useNavigate();
    let {currentUser} = useContext(AuthContext);
    let isAdmin = true;
    const [explanation, setExplanation] = useState(null);
    
    if(currentUser.email === "adam@adam.com"){
        isAdmin = true;
    } else {
        isAdmin = false;
    }

    useEffect(() => {
        const fetchQuiz = async () => {
            const quizDoc = await getDoc(doc(db, "topology-quizzes", quizId));
            if(quizDoc.exists()){
                setQuiz(quizDoc.data());
            } else {
                console.log("No such document!");
            }
        };

        fetchQuiz();
    }, [quizId]);

    const updateQuizResult = async (quizId, isCorrect) => {
        const quizResultRef = doc(db, "topology-quiz-results", `${currentUser.uid}_${quizId}`);
        const quizResultSnap = await getDoc(quizResultRef);
    
        if (quizResultSnap.exists()) {
          const resultData = quizResultSnap.data();
          const attemptCount = resultData.attemptCount + 1;
          await updateDoc(quizResultRef, {
            isCorrect: isCorrect,
            attemptCount: attemptCount,
            firstAttemptCorrect: resultData.firstAttemptCorrect !== undefined ? resultData.firstAttemptCorrect : (attemptCount === 1 && isCorrect),
          });
        } else {
          await setDoc(quizResultRef, {
            userId: currentUser.uid,
            quizId: quizId,
            isCorrect: isCorrect,
            attemptCount: 1,
            firstAttemptCorrect: isCorrect,
          });
        }
      };

    const handleOptionClick = async (option) => {
        setSelectedOption(option);
        const correct = option === quiz.answer;
        setIsCorrect(correct);
        if(correct){
            setExplanation(quiz.explanation);
        }

        await updateQuizResult(quizId, correct);

        // const quizResultRef = doc(db, "topology-quiz-results", `${currentUser.uid}_${quizId}`);
        // const quizResultSnap = await getDoc(quizResultRef);

        // if(quizResultSnap.exists()){
        //     const attemptCount = quizResultSnap.data().attemptCount + 1;
        //     await updateDoc(quizResultRef, {
        //         isCorrect: correct,
        //         attemptCount: attemptCount,
        //         firstAttemptCorrect: attemptCount === 1 && correct,
        //     });
        // } else {
        //     await setDoc(quizResultRef, {
        //         userId: currentUser.uid,
        //         quizId,
        //         isCorrect: correct,
        //         attemptCount: 1,
        //         firstAttemptCorrect: correct,
        //     });
        // }
    };

    return (
        <div className="quiz-view">
            <button onClick={() => navigate("/topologyQuizes")}>Back</button>
            {quiz && (
                <div className="quiz-box">
                    <img className="cellImg" src={quiz.img} alt="avatar" />
                    <h2>{quiz.question}</h2>
                    {["optionA", "optionB", "optionC", "optionD"].map((optionKey) => (
                        <button key={optionKey} onClick={() => handleOptionClick(quiz[optionKey])}>
                            {quiz[optionKey]}
                        </button>
                    ))}
                    {selectedOption && (
                        <div>
                            <p>
                                You selected {selectedOption}. This is {isCorrect ? "correct" : "incorrect"}.
                            </p>
                            {isCorrect && {explanation} && (
                                <p>Explanation: {explanation}</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ViewTopologyQuiz;