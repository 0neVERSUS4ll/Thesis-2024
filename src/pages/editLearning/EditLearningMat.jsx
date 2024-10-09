import { useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const EditLearningMat = ({ inputs = [], title }) => {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const { learningId } = useParams(); // Use learningId instead of learningMatId

    useEffect(() => {
        if (!learningId) {
            console.error("learningId is undefined");
            return;
        }

        console.log("learningId:", learningId); // Log the learningId

        const fetchLearningMat = async () => {
            const docRef = doc(db, "learning-materials", learningId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setData(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        fetchLearningMat();
    }, [learningId]);

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, "learning-materials", learningId);
            await updateDoc(docRef, data);
            alert("Learning Material updated successfully");
            navigate(-1);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleUpdate}>
                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    {input.type === "textarea" ? (
                                        <textarea
                                            id={input.id}
                                            placeholder={input.placeholder}
                                            value={data[input.id] || ''}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                    ) : (
                                        <input
                                            id={input.id}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            value={data[input.id] || ''}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                    )}
                                </div>
                            ))}
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditLearningMat;