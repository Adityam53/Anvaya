import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import SalesAgentManagement from "./pages/SalesAgentManagement";
import Reports from "./pages/Reports";
import { LeadProvider } from "./contexts/LeadContext";
import { SalesAgentProvider } from "./contexts/SalesAgentContext";
import LeadManagement from "./pages/LeadManagement";
import SalesAgentView from "./pages/SalesAgentView";
import AddSalesAgent from "./pages/AddSalesAgent";
import AddLead from "./pages/AddLead";
import LeadStatusView from "./pages/LeadStatusView";
import { TagsContextProvider } from "./contexts/TagsContext";

function App() {
  return (
    <>
      <Router>
        <LeadProvider>
          <SalesAgentProvider>
            <TagsContextProvider>
              <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/leads" element={<Leads />}></Route>
                <Route
                  path="/leads/:leadId"
                  element={<LeadManagement />}
                ></Route>
                <Route
                  path="/Leads By Status"
                  element={<LeadStatusView />}
                ></Route>
                <Route path="/addLead" element={<AddLead />}></Route>
                <Route
                  path="/agents"
                  element={<SalesAgentManagement />}
                ></Route>
                <Route
                  path="/agents/:agentId"
                  element={<SalesAgentView />}
                ></Route>
                <Route path="/addAgent" element={<AddSalesAgent />}></Route>
                <Route path="/reports" element={<Reports />}></Route>
              </Routes>
            </TagsContextProvider>
          </SalesAgentProvider>
        </LeadProvider>
      </Router>
    </>
  );
}

export default App;
