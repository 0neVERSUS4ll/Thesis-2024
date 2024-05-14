import "./QuizesTable.scss";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const QuizesTable = () => {
    const [quizData, setQuizData] = useState([]);
    let isAdmin = true;
    let {currentUser} = useContext(AuthContext);

    if(currentUser.email === "adam@adam.com"){
      isAdmin = true;
    } else {
      isAdmin = false;
    }

    useEffect(() => {
        const unsub = onSnapshot(
          collection(db, "quizzes"),
          (snapShot) => {
            let quizzes = [];
            snapShot.docs.forEach((doc) => {
              quizzes.push({ id: doc.id, ...doc.data() });
            });
            setQuizData(quizzes);
          },
          (error) => {
            console.log(error);
          }
        );
    
        return () => {
          unsub();
        };
      }, []);

      const handleDelete = async (id) => {
        try {
          await deleteDoc(doc(db, "quizzes", id));
          setQuizData(quizData.filter((quiz) => quiz.id !== id));
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <div className="quizestable">
            <div className="quizesTableTitle">
                Add New Quiz
                <Link to="/quizes/new" className="link">
                    Add New
                </Link>
            </div>
            <div>
                {quizData.map((quiz) => (
                    <div key={quiz.id} className="quiz-box">
                        <h2>{quiz.question}</h2>
                        <div className="cellAction">
                            {isAdmin ? (
                              <div className="deleteButton" onClick={() => handleDelete(quiz.id)}>
                                Delete
                              </div>
                            ): null}
                            <Link to={`/quizes/view/${quiz.id}`} className="viewButton" style={{textDecoration: "none"}}>
                              View
                            </Link>
                        </div>                    
            </div>
        ))}
    </div>
        </div>
    )
};

export default QuizesTable;