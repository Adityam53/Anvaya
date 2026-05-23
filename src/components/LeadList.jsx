import { Link } from "react-router-dom";
import { useLeadContext } from "../contexts/LeadContext";
import Button from "./Button";
import Heading from "./Heading";
import Filters from "./Filters";

const LeadList = ({ hideHeading = false, hideDelete = false }) => {
  const { leads, error, loading } = useLeadContext();

  return (
    <>
      <div className="leads">
        {!hideHeading && <Heading tag="h2" name="Lead Summary" />}
        <Filters showAgentFilter showPriorityFilter />

        <div className="lead-list">
          {loading && <p className="loading">Loading leads...</p>}
          {error && <p className="loading">Error : {error.message}</p>}
          {leads?.length > 0
            ? leads.map((lead) => (
                <Link
                  key={lead._id}
                  className="lead-list-item"
                  to={`/leads/${lead._id}`}
                >
                  <div>
                    <strong>{lead.name}</strong>
                    <br />

                    <span className="lead-meta">
                      Status: {lead.status}
                      <br />
                      Agent: {lead.salesAgent?.name || "Unassigned"}
                      <br />
                      Priority: {lead.priority}
                      <br />
                      Closing in: {lead.timeToClose} days
                    </span>

                    {hideDelete && (
                      <button
                        className="delete-btn"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </Link>
              ))
            : !loading && (
                <div className="empty-state">
                  <h3>No leads found</h3>
                  <p>
                    No leads match the selected filters. Try changing or
                    clearing filters.
                  </p>
                </div>
              )}
        </div>
        <div className="btn-section">
          <Button to="/addLead" label="+ Add New Lead" />
        </div>
      </div>
    </>
  );
};

export default LeadList;
