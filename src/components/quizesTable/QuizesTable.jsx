import "./QuizesTable.scss";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { DataGrid } from "@mui/x-data-grid";
import { quizColumns, quizNetworkColumns } from "../../datatablesource";

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
        const fetchQuizzesAndResults = async () => {
          const quizSnapshot = await getDocs(collection(db, "quizzes"));
          let quizzes = quizSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

          const resultsSnapshot = await getDocs(query(collection(db, "quiz-results"), where("userId", "==", currentUser.uid)));
          let results = resultsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

          // quizzes = quizzes.map((quiz) => {
          //   const result = results.find((result) => result.quizId === quiz.id);
          //   return { ...quiz, isCorrect: result ? result.isCorrect : undefined };
          // });

          quizzes = quizzes.map((quiz) => {
            const result = results.find((result) => result.quizId === quiz.id);
            return { ...quiz, firstAttemptCorrect: result ? result.firstAttemptCorrect : undefined};
          });

          setQuizData(quizzes);
        };

        fetchQuizzesAndResults();
      }, [currentUser.uid]);

      const handleDelete = async (id) => {
        try {
          await deleteDoc(doc(db, "quizzes", id));
          setQuizData(quizData.filter((quiz) => quiz.id !== id));
        } catch (err) {
          console.log(err);
        }
      };

      const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="cellAction">
                {isAdmin ? (
                  <>
                  <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
                    Delete
                  </div>
                  <Link to={`/quizes/edit/${params.row.id}`} className="editButton" id="edit-button" style={{textDecoration: "none"}}>
                      Edit
                  </Link>
                  </>
                ): null}
                  <Link to={`/quizes/view/${params.row.id}`} className="viewButton" style={{textDecoration: "none"}}>
                    View
                  </Link>
              </div>
            )
          }
        }
      ];

    return (
        <div className="quizestable">
            <div className="quizesTableTitle">
                Add New Quiz
                {isAdmin ? (
                  <Link to="/quizes/new" className="link">
                    Add New
                  </Link>
                ) : null}
            </div>            
            <DataGrid
                className="datagrid"
                rows={quizData}
                columns={[...quizNetworkColumns, ...actionColumn]}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                getRowClassName={(params) => {
                  if(params.row.firstAttemptCorrect === true){                    
                    return 'correct-first-attempt';
                  } else if(params.row.firstAttemptCorrect === false){
                    return 'incorrect-first-attempt';
                  } else {
                    return '';
                  }
                }}
                // disableSelectionOnClick
            />
        </div>
    )
};

export default QuizesTable;