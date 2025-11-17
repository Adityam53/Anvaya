import Heading from "../components/Heading";
import Sidebar from "../components/Sidebar";
import Visualization from "../components/Visualization";
const Reports = () => {
  return (
    <>
      <div>
        <Heading name=" Anvaya Reports" tag="h1" />
        <div className="row">
          <Sidebar />
          <Visualization />
        </div>
      </div>
    </>
  );
};

export default Reports;
