import AgentList from "../components/AgentList";
import Filters from "../components/Filters";
import Heading from "../components/Heading";
import Sidebar from "../components/Sidebar";

const SalesAgentManagement = () => {
  return (
    <>
      <div>
        <Heading tag="h1" name="Sales Agent Management"></Heading>
        <div className="row">
          <Sidebar />
          <AgentList />
        </div>
      </div>
    </>
  );
};

export default SalesAgentManagement;
