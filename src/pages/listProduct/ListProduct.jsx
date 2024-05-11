import "./listProduct.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"

const ListProduct = () => {
  return (
    <div className="listProduct">
      <Sidebar />
      <div className="listProductContainer">
        <Navbar />
        Hi This is Product
      </div>
    </div>
  );
};

export default ListProduct;