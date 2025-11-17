import Select from "react-select";
import { useSalesAgentContext } from "../contexts/SalesAgentContext";
import { useLeadContext } from "../contexts/LeadContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const Filters = ({ showAgentFilter, showPriorityFilter }) => {
  const { agents } = useSalesAgentContext();
  const { applyFilters, filters } = useLeadContext();
  const location = useLocation();
  const statusEnums = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];

  const priorityEnums = ["High", "Medium", "Low"];
  const agentOptions = agents.map((a) => ({ value: a._id, label: a.name }));
  const statusOptions = statusEnums.map((stat) => ({
    value: stat,
    label: stat,
  }));
  const priorityOptions = priorityEnums.map((prior) => ({
    value: prior,
    label: prior,
  }));
  const handleAgentChange = (selectedAgent) => {
    applyFilters({ salesAgent: selectedAgent ? selectedAgent.value : "" });
  };

  const handleStatusChange = (selectedOption) => {
    applyFilters({ status: selectedOption ? selectedOption.value : "" });
  };

  const handlePriorityChange = (selectedOption) => {
    console.log("Priority filter applied:", selectedOption?.value);
    applyFilters({ priority: selectedOption ? selectedOption.value : "" });
  };
  return (
    <>
      <div className="section filters">
        <strong>Filter And Sort</strong>
        <div className="filter-section">
          {showAgentFilter && (
            <Select
              className="form-input"
              options={agentOptions}
              isClearable
              onChange={handleAgentChange}
              value={
                filters.salesAgent
                  ? agentOptions.find((opt) => opt.value === filters.salesAgent)
                  : null
              }
              placeholder="Select SalesAgent"
            ></Select>
          )}

          <Select
            className="form-input"
            options={statusOptions}
            placeholder="Select Lead Status"
            onChange={handleStatusChange}
            value={
              filters.status
                ? statusOptions.find((opt) => opt.value === filters.status)
                : null
            }
            isClearable
          ></Select>

          {showPriorityFilter && (
            <Select
              className="form-input"
              options={priorityOptions}
              onChange={handlePriorityChange}
              value={
                filters.priority
                  ? priorityOptions.find(
                      (opt) => opt.value === filters.priority
                    )
                  : null
              }
              isClearable
              placeholder="Select Lead Priority"
            ></Select>
          )}
        </div>
        <div className="sort-section">
          <button
            className={`filter-btn ${
              filters.sortBy === "priority" ? "active" : ""
            }`}
            onClick={() => applyFilters({ sortBy: "priority" })}
          >
            Sort by Priority
          </button>

          <button
            className={`filter-btn ${
              filters.sortBy === "timeToClose" ? "active" : ""
            }`}
            onClick={() => applyFilters({ sortBy: "timeToClose" })}
          >
            Sort by Time to Close
          </button>

          <button
            className="filter-btn"
            onClick={() =>
              applyFilters({
                sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
              })
            }
          >
            Toggle Order (ASC/DESC)
          </button>
        </div>
      </div>
    </>
  );
};
export default Filters;
