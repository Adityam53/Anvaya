import { Link } from "react-router-dom";
import { useLeadContext } from "../contexts/LeadContext";
import { useSalesAgentContext } from "../contexts/SalesAgentContext";
import Heading from "./Heading";

const ManageAgentsAndLeads = () => {
  const {
    leads: leadData,
    loading: leadLoading,
    error: leadError,
    handleDelete: deleteLead,
    baseUrl: leadUrl,
  } = useLeadContext();

  const {
    agents: agentData,
    loading: agentLoading,
    error: agentError,
    baseUrl: agentUrl,
    handleDelete: deleteAgent,
  } = useSalesAgentContext();

  return (
    <>
      <div className="settings">
        {/* =====================================
          PAGE HEADER
      ===================================== */}

        <div className="settings-header">
          <Heading tag={"h2"} name={"Administration"} />

          <p className="settings-description">
            Manage sales representatives and customer leads from a centralized
            administrative workspace.
          </p>
        </div>

        {/* =====================================
          MANAGEMENT GRID
      ===================================== */}

        <div className="management-grid">
          {/* =====================================
            LEAD MANAGEMENT
        ===================================== */}

          <div className="management-panel">
            <div className="management-panel-header">
              <div>
                <h3>Lead Operations</h3>

                <p>View, monitor, and remove customer leads.</p>
              </div>

              <div className="management-count">{leadData?.length || 0}</div>
            </div>

            {leadLoading && <p className="loading">Loading leads...</p>}

            {leadError && <p className="loading">Error: {leadError}</p>}

            <div className="management-list">
              {leadData?.map((lead) => (
                <div key={lead._id} className="management-card">
                  <Link
                    to={`/leads/${lead._id}`}
                    className="management-card-link"
                  >
                    <div className="management-card-top">
                      <div>
                        <h4>{lead.name}</h4>

                        <p>{lead.source}</p>
                      </div>

                      <span
                        className={`status-badge status-${lead.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {lead.status}
                      </span>
                    </div>
                  </Link>

                  <div className="management-card-actions">
                    <button
                      className="delete-btn"
                      onClick={() => deleteLead(lead._id, leadUrl, "Lead")}
                    >
                      Delete Lead
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =====================================
            AGENT MANAGEMENT
        ===================================== */}

          <div className="management-panel">
            <div className="management-panel-header">
              <div>
                <h3>Agent Management</h3>

                <p>Manage sales representatives and profiles.</p>
              </div>

              <div className="management-count">{agentData?.length || 0}</div>
            </div>

            {agentLoading && <p className="loading">Loading agents...</p>}

            {agentError && <p className="loading">Error: {agentError}</p>}

            <div className="management-list">
              {agentData?.map((agent) => (
                <div key={agent._id} className="management-card">
                  <Link
                    to={`/agents/${agent._id}`}
                    className="management-card-link"
                  >
                    <div className="management-agent-layout">
                      <div className="agent-avatar">
                        {agent.name?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h4>{agent.name}</h4>

                        <p>{agent.email}</p>
                      </div>
                    </div>
                  </Link>

                  <div className="management-card-actions">
                    <button
                      onClick={() => deleteAgent(agent._id, agentUrl, "Agent")}
                      className="delete-btn"
                    >
                      Delete Agent
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageAgentsAndLeads;
