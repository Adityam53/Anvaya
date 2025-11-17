import Select from "react-select";
import { useSalesAgentContext } from "../contexts/SalesAgentContext";
import { useTagsContext } from "../contexts/TagsContext";
import Heading from "./Heading";
import { useLeadContext } from "../contexts/LeadContext";

const LeadForm = () => {
  const { agents = [] } = useSalesAgentContext() || {};
  const { tags = [] } = useTagsContext() || {};
  const {
    formData,
    handleSubmit,
    handleChange,
    handleMultiSelectChange,
    handleSelectChange,
  } = useLeadContext();

  const agentOptions = agents.map((a) => ({ value: a._id, label: a.name }));
  const tagOptions = tags.map((t) => ({ value: t.name, label: t.name }));

  const statusEnums = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];
  const priorityEnums = ["High", "Medium", "Low"];
  const sourceEnums = [
    "Website",
    "Referral",
    "Cold Call",
    "Advertisement",
    "Email",
    "Other",
  ];

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#fafafa",
      borderColor: state.isFocused ? "#007bff" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 123, 255, 0.15)" : "none",
      borderRadius: "6px",
      padding: "2px",
      "&:hover": {
        borderColor: "#007bff",
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#eaf3ff",
      color: "#007bff",
      borderRadius: "6px",
      padding: "0 4px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#007bff",
      fontWeight: 500,
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#007bff",
      ":hover": {
        backgroundColor: "#007bff",
        color: "white",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#888",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  return (
    <div className="add-form">
      <Heading tag="h2" name="Add New Lead" />

      <div className="form">
        <form className="form-content" onSubmit={handleSubmit}>
          {/* Lead Name */}
          <div className="form-group">
            <label className="form-label">Lead Name:</label>
            <input
              name="name"
              type="text"
              className="form-input"
              value={formData.name}
              placeholder="Enter lead name"
              onChange={handleChange}
            />
          </div>

          {/* Lead Source */}
          <div className="form-group">
            <label className="form-label">Lead Source:</label>
            <select
              name="source"
              className="form-input"
              value={formData.source}
              onChange={handleChange}
            >
              <option value="">Select source</option>
              {sourceEnums.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Sales Agents */}
          <div className="form-group">
            <label className="form-label">Sales Agent:</label>
            <Select
              isClearable
              options={agentOptions}
              value={
                agentOptions.find((opt) => formData.salesAgent === opt.value) ||
                null
              }
              onChange={(selected) =>
                handleSelectChange(selected, "salesAgent")
              }
              placeholder="Select agents..."
              styles={customSelectStyles}
            />
          </div>

          {/* Lead Status */}
          <div className="form-group">
            <label className="form-label">Lead Status:</label>
            <select
              name="status"
              className="form-input"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Select status</option>
              {statusEnums.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div className="form-group">
            <label className="form-label">Priority:</label>
            <select
              name="priority"
              className="form-input"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="">Select priority</option>
              {priorityEnums.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Time to Close */}
          <div className="form-group">
            <label className="form-label">Time to Close (days):</label>
            <input
              name="timeToClose"
              type="number"
              className="form-input"
              placeholder="e.g. 30"
              value={formData.timeToClose}
              onChange={handleChange}
            />
          </div>

          {/* Tags */}
          <div className="form-group">
            <label className="form-label">Tags:</label>
            <Select
              isMulti
              options={tagOptions}
              placeholder="Select tags..."
              value={tagOptions.filter((opt) =>
                formData.tags.includes(opt.value)
              )}
              onChange={(selected) => handleMultiSelectChange(selected, "tags")}
              styles={customSelectStyles}
            />
          </div>

          <button className="form-btn" type="submit">
            Create Lead
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
