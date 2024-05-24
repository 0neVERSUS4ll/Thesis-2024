import "./QuizesTable.scss";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
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
                // disableSelectionOnClick
            />
        </div>
    )
};

export default QuizesTable;