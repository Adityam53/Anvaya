import { useParams } from "react-router-dom";
import { useSalesAgentContext } from "../contexts/SalesAgentContext";
import { useLeadContext } from "../contexts/LeadContext";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Filters from "./Filters";
import { useMemo } from "react";

const AgentDetails = () => {
  const { baseUrl: agentBaseUrl } = useSalesAgentContext();
  const { filters, buildUrl } = useLeadContext();
  const { agentId } = useParams();

  /* =========================================
      FETCH AGENT
  ========================================= */

  const {
    data: agent,
    error: agentError,
    loading: agentLoading,
  } = useFetch(`${agentBaseUrl}/${agentId}`);

  /* =========================================
      FETCH FILTERED LEADS
  ========================================= */

  const agentLeadsUrl = useMemo(() => buildUrl(agentId), [filters, agentId]);

  const {
    data: agentFilteredData,
    loading: leadLoading,
    error: leadError,
  } = useFetch(agentLeadsUrl);

  /* =========================================
      LOCAL SORTING
  ========================================= */

  const sortedAgentLeads = useMemo(() => {
    if (!agentFilteredData) return [];

    let sorted = [...agentFilteredData];

    if (filters.sortBy === "priority") {
      const priorityRank = {
        Low: 1,
        Medium: 2,
        High: 3,
      };

      sorted.sort((a, b) =>
        filters.sortOrder === "asc"
          ? priorityRank[a.priority] - priorityRank[b.priority]
          : priorityRank[b.priority] - priorityRank[a.priority],
      );
    }

    if (filters.sortBy === "timeToClose") {
      sorted.sort((a, b) =>
        filters.sortOrder === "asc"
          ? a.timeToClose - b.timeToClose
          : b.timeToClose - a.timeToClose,
      );
    }

    return sorted;
  }, [agentFilteredData, filters.sortBy, filters.sortOrder]);

  return (
    <div className="agent-details">
      {/* =========================================
          LOADING & ERROR STATES
      ========================================= */}

      {agentLoading && <p className="loading">Loading agent details...</p>}

      {agentError && <p className="loading">Error loading agent details</p>}

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      {!agentLoading && agent && (
        <>
          {/* =========================================
              HERO SECTION
          ========================================= */}

          <div className="agent-hero-card">
            <div className="agent-hero-left">
              <div className="agent-hero-avatar">
                {agent.name?.charAt(0).toUpperCase()}
              </div>

              <div className="agent-hero-content">
                <h1>{agent.name}</h1>

                <p>{agent.email}</p>

                <div className="agent-role-badge">Sales Representative</div>
              </div>
            </div>

            <div className="agent-performance-card">
              <span>Total Assigned Leads</span>

              <h2>{sortedAgentLeads.length}</h2>
            </div>
          </div>

          {/* =========================================
              FILTERS
          ========================================= */}

          <div className="agent-filters-wrapper">
            <Filters showPriorityFilter />
          </div>

          {/* =========================================
              LEADS SECTION
          ========================================= */}

          <div className="agent-leads-section">
            <div className="section-heading-row">
              <div>
                <h2>Assigned Leads</h2>

                <p>Leads currently managed by this representative.</p>
              </div>
            </div>

            {/* =========================================
                LEADS LOADING
            ========================================= */}

            {leadLoading && (
              <p className="loading">Loading assigned leads...</p>
            )}

            {leadError && <p className="loading">Error loading leads</p>}

            {/* =========================================
                LEADS GRID
            ========================================= */}

            {!leadLoading && (
              <div className="lead-list">
                {sortedAgentLeads.length > 0 ? (
                  sortedAgentLeads.map((lead) => (
                    <Link
                      key={lead._id}
                      className="lead-list-item"
                      to={`/leads/${lead._id}`}
                    >
                      {/* =====================
                          HEADER
                      ===================== */}

                      <div className="lead-card-header">
                        <h3>{lead.name}</h3>

                        <span
                          className={`status-badge status-${lead.status
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {lead.status}
                        </span>
                      </div>

                      {/* =====================
                          DIVIDER
                      ===================== */}

                      <div className="lead-divider"></div>

                      {/* =====================
                          META GRID
                      ===================== */}

                      <div className="lead-meta-grid">
                        <div className="meta-item">
                          <span className="meta-label">Priority</span>

                          <span
                            className={`priority-badge priority-${lead.priority.toLowerCase()}`}
                          >
                            {lead.priority}
                          </span>
                        </div>

                        <div className="meta-item">
                          <span className="meta-label">Closing Time</span>

                          <span className="closing-time">
                            {lead.timeToClose} days
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="empty-state modern-empty">
                    <h3>
                      {Object.values(filters).some(Boolean)
                        ? "No matching leads found"
                        : "No leads assigned"}
                    </h3>

                    <p>
                      {Object.values(filters).some(Boolean)
                        ? "Try adjusting your active filters."
                        : "This sales representative currently has no assigned leads."}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AgentDetails;
