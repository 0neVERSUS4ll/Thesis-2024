import "./listOrder.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import TopologyQuizesTable from "../../components/topologyQuizesTable/TopologyQuizesTable"

const ListOrder = () => {
  return (
    <div className="listOrder">
      <Sidebar/>
      <div className="listOrderContainer">
        <Navbar/>
        <TopologyQuizesTable/>
      </div>
    </div>
  )
}

export default ListOrder