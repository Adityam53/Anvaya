import Select from "react-select";

import { FiFilter, FiClock, FiFlag } from "react-icons/fi";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { useSalesAgentContext } from "../contexts/SalesAgentContext";
import { useLeadContext } from "../contexts/LeadContext";

const Filters = ({ showAgentFilter, showPriorityFilter }) => {
  const { agents } = useSalesAgentContext();

  const { applyFilters, filters } = useLeadContext();

  const statusEnums = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];

  const priorityEnums = ["High", "Medium", "Low"];

  const agentOptions = agents.map((a) => ({
    value: a._id,
    label: a.name,
  }));

  const statusOptions = statusEnums.map((stat) => ({
    value: stat,
    label: stat,
  }));

  const priorityOptions = priorityEnums.map((prior) => ({
    value: prior,
    label: prior,
  }));

  const handleAgentChange = (selectedAgent) => {
    applyFilters({
      salesAgent: selectedAgent ? selectedAgent.value : "",
    });
  };

  const handleStatusChange = (selectedOption) => {
    applyFilters({
      status: selectedOption ? selectedOption.value : "",
    });
  };

  const handlePriorityChange = (selectedOption) => {
    applyFilters({
      priority: selectedOption ? selectedOption.value : "",
    });
  };

  return (
    <div className="section filters">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="filters-header">
        <div className="filters-title">
          <FiFilter />

          <span>Filter & Sort Leads</span>
        </div>
      </div>

      {/* ======================================================
          FILTERS
      ====================================================== */}

      <div className="filter-section">
        {showAgentFilter && (
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            options={agentOptions}
            isClearable
            onChange={handleAgentChange}
            value={
              filters.salesAgent
                ? agentOptions.find((opt) => opt.value === filters.salesAgent)
                : null
            }
            placeholder="Filter by Agent"
          />
        )}

        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={statusOptions}
          placeholder="Filter by Status"
          onChange={handleStatusChange}
          value={
            filters.status
              ? statusOptions.find((opt) => opt.value === filters.status)
              : null
          }
          isClearable
        />

        {showPriorityFilter && (
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            options={priorityOptions}
            onChange={handlePriorityChange}
            value={
              filters.priority
                ? priorityOptions.find((opt) => opt.value === filters.priority)
                : null
            }
            isClearable
            placeholder="Filter by Priority"
          />
        )}
      </div>

      {/* ======================================================
          SORTING
      ====================================================== */}

      <div className="sort-section">
        <button
          className={`filter-btn ${
            filters.sortBy === "priority" ? "active" : ""
          }`}
          onClick={() =>
            applyFilters({
              sortBy: "priority",
            })
          }
        >
          <FiFlag />
          Priority
        </button>

        <button
          className={`filter-btn ${
            filters.sortBy === "timeToClose" ? "active" : ""
          }`}
          onClick={() =>
            applyFilters({
              sortBy: "timeToClose",
            })
          }
        >
          <FiClock />
          Time to Close
        </button>

        <button
          className="filter-btn"
          onClick={() =>
            applyFilters({
              sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
            })
          }
        >
          {filters.sortOrder === "asc" ? <FiArrowUp /> : <FiArrowDown />}
          {filters.sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>
    </div>
  );
};

export default Filters;
