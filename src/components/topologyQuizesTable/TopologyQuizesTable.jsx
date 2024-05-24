import { Link } from "react-router-dom";
import "./TopologyQuizesTable.scss"
import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
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
        const unsub = onSnapshot(
            collection(db, "topology-quizzes"),
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
    },[]);

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
            />
        </div>
    )
}

export default TopologyQuizesTable;