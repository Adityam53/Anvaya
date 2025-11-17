import LeadStatus from "../components/LeadStatus";
import Heading from "../components/Heading";
import Sidebar from "../components/Sidebar";
const LeadStatusView = () => {
  return (
    <>
      <div>
        <Heading name="Leads By Status" tag="h1" />
        <div className="row">
          <Sidebar />
          <LeadStatus />
        </div>
      </div>
    </>
  );
};

export default LeadStatusView;
