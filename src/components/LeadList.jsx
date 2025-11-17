import { Link } from "react-router-dom";
import { useLeadContext } from "../contexts/LeadContext";
import Button from "./Button";
import Heading from "./Heading";
import Filters from "./Filters";

const LeadList = ({ hideHeading = false, hideDelete = false }) => {
  const { leads, error, loading } = useLeadContext();

  // if (loading) return <p className="loading">Loading leads...</p>;
  // if (error) return <p className="loading">Error : {error.message}</p>;

  return (
    <>
      <div className="leads">
        {!hideHeading && <Heading tag="h2" name="Lead Overview" />}
        <Filters showAgentFilter showPriorityFilter />

        <div className="lead-list">
          {loading && <p className="loading">Loading leads...</p>}
          {error && <p className="loading">Error : {error.message}</p>}
          {leads &&
            leads.map((lead) => (
              <Link
                key={lead._id}
                className="lead-list-item"
                to={`/leads/${lead._id}`}
              >
                <div>
                  <strong>Lead: </strong>
                  {lead.name} - <strong>Status:</strong> {lead.status} -{" "}
                  <strong>Agent:</strong>{" "}
                  {lead.salesAgent?.name || "Deleted Agent"} -{" "}
                  <strong>Priority:</strong> {lead.priority} -{" "}
                  <strong>TimeToClose:</strong> {lead.timeToClose} <br />
                  {hideDelete && <button className="delete-btn">Delete</button>}
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
