import { Link } from "react-router-dom";
import "./TopologyQuizesTable.scss"
import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { DataGrid } from "@mui/x-data-grid";
import { quizColumns } from "../../datatablesource";

const TopologyQuizesTable = () => {
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
            const quizSnapshot = await getDocs(collection(db, "topology-quizzes"));
            let quizzes = quizSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            
            const resultsSnapshot = await getDocs(query(collection(db, "topology-quiz-results"), where("userId", "==", currentUser.uid)));
            let results = resultsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            quizzes = quizzes.map((quiz) => {
                const result = results.find((result) => result.quizId === quiz.id);
                return { ...quiz, firstAttemptCorrect: result ? result.firstAttemptCorrect : undefined};
            });

            setQuizData(quizzes);
        };
        // const unsub = onSnapshot(
        //     collection(db, "topology-quizzes"),
        //     (snapShot) => {
        //         let quizzes = [];
        //         snapShot.docs.forEach((doc) => {
        //             quizzes.push({ id: doc.id, ...doc.data() });
        //         });
        //         setQuizData(quizzes);
        //     },
        //     (error) => {
        //         console.log(error);
        //     }
        // );

        // return () => {
        //     unsub();
        // };

        fetchQuizzesAndResults();
    },  [currentUser.uid]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "topology-quizzes", id));
            setQuizData(quizData.filter((quiz) => quiz.id !== id));
        } catch (err) {
            console.log(err);
        }
    }

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
                            <Link to={`/topologyQuizes/edit/${params.row.id}`} className="editButton" style={{textDecoration: "none"}}>
                                Edit
                            </Link>
                            </>
                        ) : null}
                        <Link to={`/topologyQuizes/${params.row.id}`} className="viewButton" style={{textDecoration: "none"}}>
                            View
                        </Link>
                    </div>
                );
            },
        },
    ]

    return (
        <div className="topologyQuizTable">
            <div className="topologyQuizTableTitle">
                Add New Topology Quiz
                {isAdmin ? (
                    <Link to="/topologyQuizes/new" className="link">
                        Add New
                    </Link>
                ) : null}
            </div>
            <DataGrid 
                className="dataGrid"
                rows={quizData}
                columns={[...quizColumns, ...actionColumn]}
                pageSize={10}
                rowsPerPageOptions={[10, 15, 20]}
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
            />
        </div>
    )
}

export default TopologyQuizesTable;