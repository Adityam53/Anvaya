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

  return (
    <div className="add-form">
      <Heading tag="h2" name="Add New Lead" />

      <div className="form">
        <form className="form-content" onSubmit={handleSubmit}>
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
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Sales Agent:</label>
            <Select
              className="react-select-container form-input"
              classNamePrefix="react-select"
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
            />
          </div>

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
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

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
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

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

          <div className="form-group">
            <label className="form-label">Tags:</label>
            <Select
              className="react-select-container form-input"
              classNamePrefix="react-select"
              isMulti
              options={tagOptions}
              placeholder="Select tags..."
              value={tagOptions.filter((opt) =>
                formData.tags.includes(opt.value),
              )}
              onChange={(selected) => handleMultiSelectChange(selected, "tags")}
            />
          </div>

          <button
            className="btn btn-secondary"
            type="submit"
            style={{ marginTop: "1rem" }}
          >
            Create Lead
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
