import Heading from "../components/Heading";
import Sidebar from "../components/Sidebar";
import AgentForm from "../components/AgentForm";

const AddSalesAgent = () => {
  return (
    <>
      <div>
        <Heading name="Add New Sales Agent" tag="h1" />
        <div className="row">
          <Sidebar />
          <AgentForm />
        </div>
      </div>
    </>
  );
};

export default AddSalesAgent;
