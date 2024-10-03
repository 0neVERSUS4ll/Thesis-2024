import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import {handleLogin} from "../login/Login";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        This Is A Study Platform that Teaches User about Computer Network and Network Security, Enjoy!   
        <br />
        <br />
        We Have:
        <br />
        <br />
        - Dashboard: which serves as a main page and the first page after login to the Application
        <br />
        <br />
        - Network-Quiz: which contains many questions about computer network and network security, and the user can answer the questions and get more knowledge about network security 
        <br />
        <br />
        - Topology-Quiz: which contains many questions about network topology and the user can answer the questions and get more knowledge about network topology
        <br />
        <br />
        - Performa: which contains the score of the user after answering the questions in the Network-Quiz and Topology-Quiz
      </div>
    </div>
  );
};

export default Home;

{/* <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div> */}
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}