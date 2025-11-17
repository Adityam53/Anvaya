import LeadForm from "../components/LeadForm";
import Heading from "../components/Heading";
import Sidebar from "../components/Sidebar";
const AddLead = () => {
  return (
    <>
      <div>
        <Heading name="Add New Lead" tag="h1" />
        <div className="row">
          <Sidebar />
          <LeadForm />
        </div>
      </div>
    </>
  );
};

export default AddLead;
