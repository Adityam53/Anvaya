import { Link } from "react-router-dom";
import { FiArrowRight, FiClock, FiUser, FiFlag } from "react-icons/fi";

import { useLeadContext } from "../contexts/LeadContext";

import Button from "./Button";
import Heading from "./Heading";
import Filters from "./Filters";

const LeadList = ({ hideHeading = false, hideDelete = false }) => {
  const { leads, error, loading } = useLeadContext();

  return (
    <div className="leads">
      {!hideHeading && (
        <div className="page-header">
          <div>
            <Heading tag="h2" name="Lead Management" />

            <p className="crm-description">
              Track, manage, and monitor your entire customer acquisition
              pipeline.
            </p>
          </div>

          <Button to="/addLead" label="+ Add New Lead" />
        </div>
      )}

      <Filters showAgentFilter showPriorityFilter />

      {loading && (
        <div className="section">
          <p className="loading">Loading leads...</p>
        </div>
      )}

      {error && (
        <div className="section">
          <p className="loading">Error: {error.message}</p>
        </div>
      )}

      {!loading && leads?.length > 0 ? (
        <div className="lead-list">
          {leads.map((lead) => (
            <Link
              key={lead._id}
              className="lead-list-item"
              to={`/leads/${lead._id}`}
            >
              <div className="lead-card-header">
                <div className="lead-header-content">
                  <h3>{lead.name}</h3>

                  <p className="lead-source">{lead.source || "Direct Lead"}</p>
                </div>

                <span
                  className={`status-badge status-${lead.status
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {lead.status}
                </span>
              </div>

              {/* ================= DIVIDER ================= */}

              <div className="lead-divider"></div>

              {/* ================= META GRID ================= */}

              <div className="lead-meta-grid">
                {/* AGENT */}

                <div className="meta-item">
                  <span className="meta-label">
                    <FiUser />
                    Agent
                  </span>

                  <span className="meta-value">
                    {lead.salesAgent?.name || "Unassigned"}
                  </span>
                </div>

                {/* PRIORITY */}

                <div className="meta-item">
                  <span className="meta-label">
                    <FiFlag />
                    Priority
                  </span>

                  <span
                    className={`priority-badge priority-${lead.priority?.toLowerCase()}`}
                  >
                    {lead.priority || "Medium"}
                  </span>
                </div>

                {/* TIME */}

                <div className="meta-item full-width">
                  <span className="meta-label">
                    <FiClock />
                    Expected Closing
                  </span>

                  <span className="closing-time">{lead.timeToClose} days</span>
                </div>
              </div>

              {/* ================= FOOTER ================= */}

              <div className="lead-card-footer">
                <span>View Lead Details</span>

                <FiArrowRight />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="empty-state">
            <h3>No leads found</h3>

            <p>
              No leads match the current filters. Try adjusting your search
              criteria.
            </p>

            <Button to="/addLead" label="+ Create Lead" />
          </div>
        )
      )}
    </div>
  );
};

export default LeadList;
