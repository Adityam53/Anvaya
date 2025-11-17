import { useParams } from "react-router-dom";
import { useSalesAgentContext } from "../contexts/SalesAgentContext";
import { useLeadContext } from "../contexts/LeadContext";
import useFetch from "../hooks/useFetch";
import Heading from "./Heading";
import { Link } from "react-router-dom";
import Filters from "./Filters";
import { useMemo } from "react";

const AgentDetails = () => {
  const { baseUrl: agentBaseUrl } = useSalesAgentContext();
  const { filters, buildUrl } = useLeadContext();
  const { agentId } = useParams();

  // fetch agent details
  const {
    data: agent,
    error: agentError,
    loading: agentLoading,
  } = useFetch(`${agentBaseUrl}/${agentId}`);

  // URL for fetching filtered leads for this agent
  const agentLeadsUrl = useMemo(() => buildUrl(agentId), [filters, agentId]);

  // fetch actual leads for this agent
  const {
    data: agentFilteredData,
    loading: leadLoading,
    error: leadError,
  } = useFetch(agentLeadsUrl);

  // 🎯 APPLY SORTING ON agentFilteredData LOCALLY
  const sortedAgentLeads = useMemo(() => {
    if (!agentFilteredData) return [];

    let sorted = [...agentFilteredData];

    if (filters.sortBy === "priority") {
      const priorityRank = { Low: 1, Medium: 2, High: 3 };

      sorted.sort((a, b) =>
        filters.sortOrder === "asc"
          ? priorityRank[a.priority] - priorityRank[b.priority]
          : priorityRank[b.priority] - priorityRank[a.priority]
      );
    }

    if (filters.sortBy === "timeToClose") {
      sorted.sort((a, b) =>
        filters.sortOrder === "asc"
          ? a.timeToClose - b.timeToClose
          : b.timeToClose - a.timeToClose
      );
    }

    return sorted;
  }, [agentFilteredData, filters.sortBy, filters.sortOrder]);

  if (agentLoading) return <p>Loading agent...</p>;
  if (agentError) return <p>Error loading agent details</p>;

  return (
    <div className="agent-details">
      <Heading tag="h2" name="Lead List By Agent" />

      {agent && <Heading tag="h2" name={`Sales Agent: ${agent.name}`} />}

      <Filters showPriorityFilter />

      {leadLoading && <p>Loading leads...</p>}
      {leadError && <p>Error loading leads</p>}

      <div className="lead-list">
        {sortedAgentLeads.length > 0 ? (
          sortedAgentLeads.map((lead) => (
            <Link
              key={lead._id}
              className="lead-list-item"
              to={`/leads/${lead._id}`}
            >
              <div>
                {lead.name} – {lead.status} – {lead.priority} -{" "}
                {lead.timeToClose}
              </div>
            </Link>
          ))
        ) : (
          <p>No leads found for this agent.</p>
        )}
      </div>
    </div>
  );
};

export default AgentDetails;
