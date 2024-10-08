import "./LearningTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { learningColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const LearningTable = () => {
    const [rows, setRows] = useState([]);
    let isAdmin = true;
    let {currentUser} = useContext(AuthContext);

    if(currentUser.email === "adam@adam.com"){
        isAdmin = true;
    } else {
        isAdmin = false;
    }

    useEffect(() => {
        const fetchLearningMaterial = async () => {
            try {
                const learningSnapshot = await getDocs(collection(db, "learning-materials"));
                const learningMat = learningSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setRows(learningMat);
            } catch (err) {
                console.error("Error fetching learning materials: ", err);
            }
        };

        fetchLearningMaterial();
    }, [currentUser.uid]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "learning-materials", id));
            setRows(rows.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Error deleting learning material: ", err);
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
                            </>
                        ) : null}
                        <Link to={`/learning/view/${params.row.id}`} className="viewButton" style={{textDecoration: "none"}}>
                            View
                        </Link>
                    </div>
                )
            }
        }
    ];

    return (
        <div className="learningTable">
            <div className="learningTableContainer">
                Add New Material
                {isAdmin ? (
                    <Link to="/learning/new" className="link">
                        Add New
                    </Link>
                ) : null}
            </div>
            <DataGrid
                rows={rows}
                columns={[...learningColumns, ...actionColumn]}
                pageSize={10}
                rowsPerPageOptions={[5, 10 ,20]}
                checkboxSelection
            />                    
        </div>
    );
}

export default LearningTable;