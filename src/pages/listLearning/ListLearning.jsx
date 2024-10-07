import "./listLearning.scss";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"

const ListLearning = () => {
  return (
    <div className="listLearning">
      <Sidebar />
      <div className="listLearningContainer">
        <Navbar />
      </div>
    </div>
  );
};

export default ListLearning;