import Navbar from "../../components/navbar/Navbar";
import QuizPerformance from "../../components/performanceTable/PerformanceTable";
import Sidebar from "../../components/sidebar/Sidebar";
import "./listPerformance.scss";

const ListPerformance = () => {
  return (
    <div className="listPerformance">
      <Sidebar/>
      <div className="listPerformanceContainer">
        <Navbar/>
        <QuizPerformance/>        
      </div>
    </div>
  )
}

export default ListPerformance