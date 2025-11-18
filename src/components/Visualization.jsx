import useFetch from "../hooks/useFetch";
import Heading from "./Heading";
import ReusableChart from "./ReusableChart";

const Visualization = () => {
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

  return (
    <div className="visualization">
      <Heading tag="h2" name="Report Overview" />
      <div className="charts">
        <section className="section">
          {lwLoading && <p className="loading">Loading last week’s data...</p>}
          {lwError && <p className="loading"> Error: {lwError}</p>}
          {lastWeekData && lastWeekData.length > 0 && (
            <ReusableChart
              type="bar"
              title="Leads Closed in Last 7 Days"
              labels={lastWeekData.map((lead) =>
                new Date(lead.closedAt).toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })
              )}
              data={Array(lastWeekData.length).fill(1)} // one per lead
              datasetLabel="Closed Leads"
              colors={["#36A2EB"]}
            />
          )}
        </section>

        <section className="section">
          {pLoading && <p className="loading">Loading pipeline data...</p>}
          {pError && <p className="loading">Error: {pError}</p>}
          {pipelineData && (
            <ReusableChart
              type="Doughnut"
              title="Total Leads in Pipeline"
              labels={Object.keys(pipelineData)}
              data={Object.values(pipelineData)}
              datasetLabel="Pipeline Leads"
              colors={["#FFCE56", "#36A2EB", "#FF6384"]}
            />
          )}
        </section>

        <section className="section">
          {" "}
          {caLoading && (
            <p className="loading">Loading closed leads by agent...</p>
          )}
          {caError && <p className="loading">Error: {caError}</p>}
          {closedByAgentData && closedByAgentData.length > 0 && (
            <ReusableChart
              type="pie"
              title="Closed Leads by Sales Agent"
              labels={closedByAgentData.map((a) => a.salesAgentName)}
              data={closedByAgentData.map((a) => a.closedLeadsCount)}
              datasetLabel="Closed Leads"
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Visualization;
