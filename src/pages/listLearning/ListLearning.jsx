import "./listLearning.scss";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import LearningTable from "../../components/learningTable/LearningTable";

const ListLearning = () => {
  return (
    <div className="listLearning">
      <Sidebar />
      <div className="listLearningContainer">
        <Navbar />
        <LearningTable />
      </div>
    </div>
  );
};

export default ListLearning;