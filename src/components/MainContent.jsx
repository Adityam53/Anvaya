import { Link } from "react-router-dom";
import { useLeadContext } from "../contexts/LeadContext";
import Button from "./Button";
import Heading from "./Heading";

const MainContent = () => {
  const { leads, error, loading, leadCounts, filters, applyFilters } =
    useLeadContext();

  const handleStatusClick = (status) => {
    applyFilters({ status: filters.status === status ? "" : status });
  };

  return (
    <div className="main-content">
      {/* Introduction Block */}
      <div className="section">
        <Heading tag="h3" name="Welcome to Anvaya CRM" />
        <p className="crm-description">
          Anvaya is your dedicated Customer Relationship Management platform.
          Use this dashboard to track your pipeline, monitor lead status, and
          streamline your sales process with ease.
        </p>
      </div>

      {loading && <p className="loading">Loading leads...</p>}
      {error && <p className="loading">Error : {error.message}</p>}

      <div className="section">
        <Heading tag="h3" name={`Recent Leads`} />
        <div className="lead-list">
          {leads.slice(0, 5).map((lead) => (
            <Link
              className="lead-list-item"
              to={`/leads/${lead._id}`}
              key={lead._id}
            >
              <div>
                <strong>{lead.name}</strong>
              </div>
              <div>Status: {lead.status}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="section">
        <Heading tag="h3" name="Pipeline Overview" />
        <div className="status-list">
          <div>New: {leadCounts.new} Leads</div>
          <div>Contacted: {leadCounts.contacted} Leads</div>
          <div>Qualified: {leadCounts.qualified} Leads</div>
          <div>Closed: {leadCounts.closed} Leads</div>
        </div>
      </div>

      <div className="section">
        <Heading tag="h3" name="Quick Filters" />
        <div className="quick-filters">
          {["", "New", "Contacted", "Qualified", "Closed"].map((s) => (
            <button
              key={s || "All"}
              className={`filter-btn ${filters.status === s ? "active" : ""}`}
              onClick={() => handleStatusClick(s)}
            >
              {s || "All"}
            </button>
          ))}
        </div>
        <div className="btn-section">
          <Button label="+ Add New Lead" to="/addLead" />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
