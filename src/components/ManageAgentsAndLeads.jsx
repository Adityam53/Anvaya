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
        <Heading tag={"h2"} name={"Administration"} />

        <div className="leads-agents">
          <div className="manage-lead">
            <Heading tag={"h3"} name={"Lead Operations"} />
            {leadLoading && <p className="loading">Loading leads...</p>}
            {leadError && <p className="loading">Error: {leadError}</p>}

            {leadData &&
              leadData.map((lead) => (
                <div key={lead._id}>
                  <Link to={`/leads/${lead._id}`} className="lead-list-item">
                    <p>
                      <strong>{lead.name}</strong>
                    </p>
                    <p>Source: {lead.source}</p>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => deleteLead(lead._id, leadUrl, "Lead")}
                  >
                    Delete Lead
                  </button>
                </div>
              ))}
          </div>

          <div className="manage-agent">
            <Heading tag={"h3"} name={"Agent Management"} />
            {agentLoading && <p className="loading">Loading agents...</p>}
            {agentError && <p className="loading">Error: {agentError}</p>}

            {agentData &&
              agentData.map((agent) => (
                <div key={agent._id}>
                  <Link to={`/agents/${agent._id}`} className="lead-list-item">
                    <p>
                      <strong>{agent.name}</strong>
                    </p>
                    <p>{agent.email}</p>
                  </Link>
                  <button
                    onClick={() => deleteAgent(agent._id, agentUrl, "Agent")}
                    className="delete-btn"
                  >
                    Delete Agent
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageAgentsAndLeads;
