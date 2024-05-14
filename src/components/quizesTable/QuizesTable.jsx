import "./QuizesTable.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const QuizesTable = () => {
    const [data, setData] = useState([]);

    return (
        <div className="quizestable">
            <div className="quizesTableTitle">
                Add New Quiz
                <Link to="/quizes/new" className="link">
                    Add New
                </Link>
            </div>

        </div>
    )
};

export default QuizesTable;