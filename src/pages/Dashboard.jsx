import Header from "../components/Header";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <>
      <div>
        <Header />
        <div className="row">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
