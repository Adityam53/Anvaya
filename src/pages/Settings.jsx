import Heading from "../components/Heading";
import ManageAgentsAndLeads from "../components/ManageAgentsAndLeads";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  return (
    <>
      <div>
        <Heading tag="h1" name={"Anvaya CRM"} />
        <div className="row">
          <Sidebar />
          <ManageAgentsAndLeads />
        </div>
      </div>
    </>
  );
};

export default Settings;
