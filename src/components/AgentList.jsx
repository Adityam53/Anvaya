import { Link } from "react-router-dom";
import { useSalesAgentContext } from "../contexts/SalesAgentContext";
import Button from "./Button";
import Heading from "./Heading";
import Filters from "./Filters";

const AgentList = () => {
  const { agents, error, loading } = useSalesAgentContext();

  // if (loading) return <p className="loading">Loading Agents...</p>;
  // if (error) return <p className="loading">Error : {error.message}</p>;
  return (
    <>
      <div className="agents">
        <Heading tag="h2" name="Sales Agent List" />
        <div className="lead-list">
          {loading && <p className="loading">Loading agents...</p>}
          {error && <p className="loading">Error : {error.message}</p>}
          {agents.map((agent) => (
            <Link className="agent-list-item" to={`/agents/${agent._id}`}>
              <div key={agent._id}>
                Agent: {agent.name} - {agent.email}
              </div>
            </Link>
          ))}
        </div>

        <div className="btn-section">
          <Button to="/addAgent" label="+ Add New Agent" />
        </div>
      </div>
    </>
  );
};

export default AgentList;
