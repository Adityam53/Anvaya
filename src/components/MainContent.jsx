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
  if (loading) return <p className="loading">Loading leads...</p>;
  if (error) return <p className="loading">Error : {error.message}</p>;

  return (
    <div className="main-content">
      <div className="section">
        <Heading tag="h3" name={`Leads`} />
        <div className="lead-list">
          {leads.slice(0, 5).map((lead) => (
            <div key={lead._id}>{lead.name}</div>
          ))}
        </div>
      </div>

      <div className="section">
        <Heading tag="h3" name="Lead Status" />
        <div className="status-list">
          <div>- New: {leadCounts.new} Leads</div>
          <div>- Contacted: {leadCounts.contacted} Leads</div>
          <div>- Qualified: {leadCounts.qualified} Leads</div>
          <div>- Closed: {leadCounts.closed} Leads</div>
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
        <Button label="+ Add New Lead" to="/addLead" />
      </div>
    </div>
  );
};

export default MainContent;
