import AgentDetails from "../components/AgentDetails";
import Heading from "../components/Heading";
import Sidebar from "../components/Sidebar";
const SalesAgentView = () => {
  return (
    <>
      <div>
        <Heading name="Leads By Sales Agent" tag="h1" />
        <div className="row">
          <Sidebar />
          <AgentDetails />
        </div>
      </div>
    </>
  );
};

export default SalesAgentView;
