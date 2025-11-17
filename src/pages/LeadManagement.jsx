import LeadDetails from "../components/LeadDetails";
import Sidebar from "../components/Sidebar";
import Heading from "../components/Heading";
const LeadManagement = () => {
  return (
    <>
      <div>
        <Heading name="Lead Management" tag="h1" />
        <div className="row">
          <Sidebar />
          <LeadDetails />
        </div>
      </div>
    </>
  );
};

export default LeadManagement;
