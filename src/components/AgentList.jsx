import { Link } from "react-router-dom";

import { FiArrowRight, FiMail, FiUserPlus, FiUsers } from "react-icons/fi";

import { useSalesAgentContext } from "../contexts/SalesAgentContext";

import Button from "./Button";
import Heading from "./Heading";

const AgentList = () => {
  const { agents, error, loading } = useSalesAgentContext();

  return (
    <div className="agents">
      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="page-header">
        <div>
          <Heading tag="h2" name="Sales Representatives" />

          <p className="crm-description">
            Manage your sales team, monitor assigned agents, and organize
            customer ownership efficiently.
          </p>
        </div>

        <Button to="/addAgent" label="Add New Agent" icon={<FiUserPlus />} />
      </div>

      {/* ======================================================
          LOADING & ERROR
      ====================================================== */}

      {loading && (
        <div className="section">
          <p className="loading">Loading agents...</p>
        </div>
      )}

      {error && (
        <div className="section">
          <p className="loading">Error : {error.message}</p>
        </div>
      )}

      {/* ======================================================
          AGENT SUMMARY
      ====================================================== */}

      {!loading && (
        <div className="dashboard-stats agent-stats">
          <div className="stats-card primary-card">
            <div className="stats-icon">
              <FiUsers />
            </div>

            <div className="stats-content">
              <p>Total Agents</p>
              <h2>{agents.length}</h2>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          AGENTS GRID
      ====================================================== */}

      {!loading && agents?.length > 0 ? (
        <div className="lead-list">
          {agents.map((agent) => (
            <Link
              key={agent._id}
              className="agent-list-item"
              to={`/agents/${agent._id}`}
            >
              {/* ======================
                  AVATAR
              ====================== */}

              <div className="agent-avatar">
                {agent.name?.charAt(0).toUpperCase()}
              </div>

              {/* ======================
                  CONTENT
              ====================== */}

              <div className="agent-card-content">
                <div className="agent-main-info">
                  <h3>{agent.name}</h3>

                  {/* <span className="agent-role-badge">Sales Representative</span> */}
                </div>

                <div className="agent-email">
                  <FiMail />

                  <span>{agent.email}</span>
                </div>

                <div className="agent-card-footer">
                  <span>View Profile</span>

                  <FiArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="empty-state">
            <h3>No Agents Found</h3>

            <p>
              Start building your sales team by adding your first
              representative.
            </p>

            <Button to="/addAgent" label="Add Agent" icon={<FiUserPlus />} />
          </div>
        )
      )}
    </div>
  );
};

export default AgentList;
