import Select from "react-select";

import { FiFilter, FiClock, FiFlag } from "react-icons/fi";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { useSalesAgentContext } from "../contexts/SalesAgentContext";
import { useLeadContext } from "../contexts/LeadContext";
import { useTagsContext } from "../contexts/TagsContext";

const Filters = ({ showAgentFilter, showPriorityFilter }) => {
  const { agents } = useSalesAgentContext();
  const { tags } = useTagsContext();

  const { applyFilters, filters } = useLeadContext();

  const statusEnums = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];
  const sourceEnums = [
    "Website",
    "Referral",
    "Cold Call",
    "Advertisement",
    "Email",
    "Other",
  ];
  const priorityEnums = ["High", "Medium", "Low"];
  const sourceOptions = sourceEnums.map((src) => ({
    value: src,
    label: src,
  }));
  const agentOptions = agents.map((a) => ({
    value: a._id,
    label: a.name,
  }));
  const tagOptions = tags.map((t) => ({
    value: t.name,
    label: t.name,
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
  const handleTagChange = (selectedOptions) => {
    applyFilters({
      tags: selectedOptions
        ? selectedOptions.map((tag) => tag.value).join(",")
        : "",
    });
  };
  const handlePriorityChange = (selectedOption) => {
    applyFilters({
      priority: selectedOption ? selectedOption.value : "",
    });
  };

  const handleSourceChange = (selectedOption) => {
    applyFilters({
      source: selectedOption ? selectedOption.value : "",
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
            menuPortalTarget={document.body}
            menuPosition="fixed"
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
          menuPortalTarget={document.body}
          menuPosition="fixed"
        />

        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={sourceOptions}
          placeholder="Filter by Source"
          isClearable
          onChange={handleSourceChange}
          value={
            filters.source
              ? sourceOptions.find((opt) => opt.value === filters.source)
              : null
          }
          menuPortalTarget={document.body}
          menuPosition="fixed"
        />

        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={tagOptions}
          isMulti
          placeholder="Filter by Tags"
          onChange={handleTagChange}
          value={
            filters.tags
              ? tagOptions.filter((opt) =>
                  filters.tags.split(",").includes(opt.value),
                )
              : []
          }
          menuPortalTarget={document.body}
          menuPosition="fixed"
        />
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
