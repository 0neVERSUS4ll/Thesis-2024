import "./listOrder.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"

const ListOrder = () => {
  return (
    <div className="listOrder">
      <Sidebar/>
      <div className="listOrderContainer">
        <Navbar/>
        This is the list order page
      </div>
    </div>
  )
}

export default ListOrder