import useFetch from "../hooks/useFetch";
import Heading from "./Heading";
import ReusableChart from "./ReusableChart";

const Visualization = () => {
  /* ==========================================================================
     FETCH ANALYTICS DATA
     ========================================================================== */

  const {
    data: lastWeekData,
    loading: lwLoading,
    error: lwError,
  } = useFetch("https://anvaya-backend-teal.vercel.app/report/last-week");

  const {
    data: pipelineData,
    loading: pLoading,
    error: pError,
  } = useFetch("https://anvaya-backend-teal.vercel.app/report/pipeline");

  const {
    data: closedByAgentData,
    loading: caLoading,
    error: caError,
  } = useFetch("https://anvaya-backend-teal.vercel.app/report/closed-by-agent");

  /* ==========================================================================
     SAFE DATA EXTRACTION
     ========================================================================== */

  const recentClosedLeads = Array.isArray(lastWeekData?.data)
    ? lastWeekData.data
    : [];

  const pipelineDistribution = Array.isArray(pipelineData?.data)
    ? pipelineData.data
    : [];

  const closedLeadsByAgent = Array.isArray(closedByAgentData?.data)
    ? closedByAgentData.data
    : [];

  /* ==========================================================================
     KPI VALUES
     ========================================================================== */

  const totalPipelineLeads = pipelineData?.totalPipelineLeads || 0;

  const totalClosedLeads = closedLeadsByAgent.reduce(
    (acc, curr) => acc + curr.closedLeadsCount,
    0,
  );

  const totalLastWeekClosures = lastWeekData?.totalClosedLeads || 0;

  return (
    <div className="visualization">
      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="analytics-header">
        <Heading tag="h2" name="Analytics Dashboard" />

        <p className="analytics-description">
          Monitor sales performance, lead conversion trends, and pipeline
          distribution across your CRM ecosystem.
        </p>
      </div>

      {/* =========================================
          KPI CARDS
      ========================================= */}

      <div className="analytics-kpis">
        <div className="analytics-kpi-card">
          <span>Total Pipeline Leads</span>

          <h2>{totalPipelineLeads}</h2>
        </div>

        <div className="analytics-kpi-card">
          <span>Total Closed Leads</span>

          <h2>{totalClosedLeads}</h2>
        </div>

        <div className="analytics-kpi-card">
          <span>Closed Last 7 Days</span>

          <h2>{totalLastWeekClosures}</h2>
        </div>
      </div>

      {/* =========================================
          CHART GRID
      ========================================= */}

      <div className="charts">
        {/* =====================================
            LAST WEEK CLOSED LEADS
        ===================================== */}

        <section className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <h3>Leads Closed Last Week</h3>

              <p>Daily breakdown of successfully closed leads.</p>
            </div>
          </div>

          {lwLoading && <p className="loading">Loading analytics...</p>}

          {lwError && <p className="loading">Error: {lwError}</p>}

          {!lwLoading && !lwError && recentClosedLeads.length > 0 && (
            <ReusableChart
              type="bar"
              title="Closed Leads - Last 7 Days"
              labels={recentClosedLeads.map((item) =>
                new Date(item.date).toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                }),
              )}
              data={recentClosedLeads.map((item) => item.closedCount)}
              datasetLabel="Closed Leads"
              colors={["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"]}
            />
          )}

          {!lwLoading && !lwError && recentClosedLeads.length === 0 && (
            <p className="loading">No closed leads found.</p>
          )}
        </section>

        {/* =====================================
            PIPELINE DISTRIBUTION
        ===================================== */}

        <section className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <h3>Pipeline Distribution</h3>

              <p>Lead count across all active pipeline stages.</p>
            </div>
          </div>

          {pLoading && <p className="loading">Loading pipeline data...</p>}

          {pError && <p className="loading">Error: {pError}</p>}

          {!pLoading && !pError && pipelineDistribution.length > 0 && (
            <ReusableChart
              type="bar"
              title="Pipeline Lead Distribution"
              labels={pipelineDistribution.map((item) => item.status)}
              data={pipelineDistribution.map((item) => item.totalLeads)}
              datasetLabel="Pipeline Leads"
              colors={["#2563eb", "#7c3aed", "#14b8a6", "#f59e0b", "#ef4444"]}
            />
          )}

          {!pLoading && !pError && pipelineDistribution.length === 0 && (
            <p className="loading">No pipeline data available.</p>
          )}
        </section>

        {/* =====================================
            CLOSED LEADS BY AGENT
        ===================================== */}

        <section className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <h3>Lead Distribution By Sales Agent</h3>

              <p>Closed lead contribution by sales representatives.</p>
            </div>
          </div>

          {caLoading && <p className="loading">Loading agent analytics...</p>}

          {caError && <p className="loading">Error: {caError}</p>}

          {!caLoading && !caError && closedLeadsByAgent.length > 0 && (
            <ReusableChart
              type="pie"
              title="Closed Leads By Agent"
              labels={closedLeadsByAgent.map((agent) => agent.salesAgentName)}
              data={closedLeadsByAgent.map((agent) => agent.closedLeadsCount)}
              datasetLabel="Closed Leads"
              colors={["#2563eb", "#7c3aed", "#14b8a6", "#f59e0b", "#ef4444"]}
            />
          )}

          {!caLoading && !caError && closedLeadsByAgent.length === 0 && (
            <p className="loading">No sales analytics available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Visualization;
