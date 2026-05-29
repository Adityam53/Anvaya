import { Link } from "react-router-dom";
import {
  FiUsers,
  FiTrendingUp,
  FiCheckCircle,
  FiTarget,
  FiArrowRight,
  FiPlus,
} from "react-icons/fi";

import { useLeadContext } from "../contexts/LeadContext";
import Button from "./Button";
import Heading from "./Heading";

const MainContent = () => {
  const { leads, error, loading, leadCounts, filters, applyFilters } =
    useLeadContext();

  const handleStatusClick = (status) => {
    applyFilters({
      status: filters.status === status ? "" : status,
    });
  };

  const totalLeads =
    leadCounts.new +
    leadCounts.contacted +
    leadCounts.qualified +
    leadCounts.closed;

  const conversionRate =
    totalLeads > 0 ? Math.round((leadCounts.closed / totalLeads) * 100) : 0;

  return (
    <div className="main-content">
      {/* ======================================================
          HERO SECTION
      ====================================================== */}

      <div className="dashboard-hero section">
        <div className="dashboard-hero-content">
          <div>
            <Heading tag="h1" name="Welcome back" />

            <p className="crm-description">
              Monitor your pipeline, manage customer relationships, and track
              your sales performance in real-time.
            </p>
          </div>

          <Button label="Add New Lead" to="/addLead" icon={<FiPlus />} />
        </div>
      </div>

      {/* ======================================================
          LOADING & ERROR
      ====================================================== */}

      {loading && (
        <div className="section">
          <p className="loading">Loading dashboard...</p>
        </div>
      )}

      {error && (
        <div className="section">
          <p className="loading">Error: {error.message}</p>
        </div>
      )}

      {/* ======================================================
          KPI CARDS
      ====================================================== */}

      <div className="dashboard-stats">
        <div className="stats-card primary-card">
          <div className="stats-icon">
            <FiUsers />
          </div>

          <div className="stats-content">
            <p>Total Leads</p>
            <h2>{totalLeads}</h2>
          </div>
        </div>

        <div className="stats-card success-card">
          <div className="stats-icon">
            <FiCheckCircle />
          </div>

          <div className="stats-content">
            <p>Closed Leads</p>
            <h2>{leadCounts.closed}</h2>
          </div>
        </div>

        <div className="stats-card warning-card">
          <div className="stats-icon">
            <FiTrendingUp />
          </div>

          <div className="stats-content">
            <p>Conversion Rate</p>
            <h2>{conversionRate}%</h2>
          </div>
        </div>

        <div className="stats-card purple-card">
          <div className="stats-icon">
            <FiTarget />
          </div>

          <div className="stats-content">
            <p>Qualified Leads</p>
            <h2>{leadCounts.qualified}</h2>
          </div>
        </div>
      </div>

      {/* ======================================================
          RECENT LEADS
      ====================================================== */}

      <div className="section">
        <div className="section-header">
          <Heading tag="h3" name="Recent Leads" />

          <Link className="view-all-link" to="/leads">
            View All
            <FiArrowRight />
          </Link>
        </div>

        <div className="lead-list">
          {leads.slice(0, 5).map((lead) => (
            <Link
              className="lead-list-item"
              to={`/leads/${lead._id}`}
              key={lead._id}
            >
              <div className="lead-card-header">
                <div>
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

              <div className="lead-divider"></div>

              <div className="lead-meta-grid">
                <div className="meta-item">
                  <span className="meta-label">Priority</span>

                  <span
                    className={`priority-badge priority-${lead.priority?.toLowerCase()}`}
                  >
                    {lead.priority || "Medium"}
                  </span>
                </div>

                <div className="meta-item">
                  <span className="meta-label">Sales Agent</span>

                  <span className="meta-value">
                    {lead.salesAgent?.name || "Unassigned"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ======================================================
          PIPELINE OVERVIEW
      ====================================================== */}

      <div className="section">
        <div className="section-header">
          <Heading tag="h3" name="Pipeline Overview" />
        </div>

        <div className="pipeline-grid">
          <div className="pipeline-card new-pipeline">
            <span>New Leads</span>
            <h2>{leadCounts.new}</h2>
          </div>

          <div className="pipeline-card contacted-pipeline">
            <span>Contacted</span>
            <h2>{leadCounts.contacted}</h2>
          </div>

          <div className="pipeline-card qualified-pipeline">
            <span>Qualified</span>
            <h2>{leadCounts.qualified}</h2>
          </div>

          <div className="pipeline-card closed-pipeline">
            <span>Closed</span>
            <h2>{leadCounts.closed}</h2>
          </div>
        </div>
      </div>

      {/* ======================================================
          QUICK FILTERS
      ====================================================== */}

      <div className="section">
        <div className="section-header">
          <Heading tag="h3" name="Quick Filters" />
        </div>

        <div className="quick-filters">
          {["", "New", "Contacted", "Qualified", "Closed"].map((s) => (
            <button
              key={s || "All"}
              className={`filter-btn ${filters.status === s ? "active" : ""}`}
              onClick={() => handleStatusClick(s)}
            >
              {s || "All Leads"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
