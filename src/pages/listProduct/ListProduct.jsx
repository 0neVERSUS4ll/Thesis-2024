import "./listProduct.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import QuizesTable from "../../components/quizesTable/QuizesTable";

const ListProduct = () => {
  return (
    <div className="listProduct">
      <Sidebar />
      <div className="listProductContainer">
        <Navbar />
        <QuizesTable />
      </div>
    </div>
  );
};

export default ListProduct;