import "./viewLearning.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Linkify from 'react-linkify';

const ViewLearning = () => {
  const { learningId } = useParams();
  const [learningMaterial, setLearningMaterial] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLearningMaterial = async () => {
      const learningDoc = await getDoc(doc(db, "learning-materials", learningId));
      if (learningDoc.exists()) {
        setLearningMaterial(learningDoc.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchLearningMaterial();
  }, [learningId]);

  return (
    <div className="viewLearning">
      <button onClick={() => navigate("/learning")}>Back</button>
      {learningMaterial ? (
        <>
          <div className="header">
            <h1>{learningMaterial.title}</h1>
            <span className="category">{learningMaterial.category}</span>
          </div>
          <p className="description">{learningMaterial.description}</p>
          <div className="content">
            <Linkify>{learningMaterial.content}</Linkify>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewLearning;