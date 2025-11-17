import { Link } from "react-router-dom";
import { useLeadContext } from "../contexts/LeadContext";
import Button from "./Button";
import Heading from "./Heading";
import Filters from "./Filters";

const LeadList = ({ hideHeading = false }) => {
  const { leads, error, loading } = useLeadContext();

  if (loading) return <p>Loading leads...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div className="leads">
        {!hideHeading && <Heading tag="h2" name="Lead Overview" />}
        <Filters showAgentFilter showPriorityFilter />

        <div className="lead-list">
          {leads.map((lead) => (
            <Link className="lead-list-item" to={`/leads/${lead._id}`}>
              <div key={lead._id}>
                <strong>Lead: </strong>
                {lead.name} - <strong>Status:</strong> {lead.status} -{" "}
                <strong>Agent:</strong> {lead.salesAgent.name} -{" "}
                <strong>Priority:</strong> {lead.priority} -{" "}
                <strong>TimeToClose:</strong> {lead.timeToClose}
              </div>
            </Link>
          ))}
        </div>
        <div className="btn-section">
          <Button to="/addLead" label="+ Add New Lead" />
        </div>
      </div>
    </>
  );
};

export default LeadList;
