import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const NewLearningMat = ({ inputs, title }) => {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "learning-materials"), data);
            alert("Learning Material added successfully");
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
                        <form onSubmit={handleAdd}>
                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    {input.type === "textarea" ? (
                                        <textarea
                                            id={input.id}
                                            placeholder={input.placeholder}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                    ) : (
                                        <input
                                            id={input.id}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                    )}
                                </div>
                            ))}
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewLearningMat;