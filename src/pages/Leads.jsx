import Heading from "../components/Heading";
import LeadList from "../components/LeadList";
import Sidebar from "../components/Sidebar";

const Leads = () => {
  return (
    <>
      <div>
        <Heading tag="h1" name="Lead List" />
        <div className="row">
          <Sidebar />
          <LeadList />
        </div>
      </div>
    </>
  );
};

export default Leads;
