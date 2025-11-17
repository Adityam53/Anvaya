import { useParams } from "react-router-dom";
import { useLeadContext } from "../contexts/LeadContext";
import useFetch from "../hooks/useFetch";
import Heading from "./Heading";
import Comments from "./Comments";
import Select from "react-select";
import { useSalesAgentContext } from "../contexts/SalesAgentContext";
import { useTagsContext } from "../contexts/TagsContext";

const LeadDetails = () => {
  const { leadId } = useParams();
  const {
    baseUrl,
    isEditing,
    editFormData,
    loadLeadForEdit,
    handleEditSubmit,
    cancelEdit,
    handleChange,
    handleSelectChange,
    refreshKey,
    handleMultiSelectChange,
  } = useLeadContext();

  const url = `${baseUrl}/${leadId}?refresh=${refreshKey}`;
  const { data: leadData, loading, error } = useFetch(url);
  const { agents = [] } = useSalesAgentContext();
  const { tags = [] } = useTagsContext();

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

  // if (loading) return <p className="loading">Loading...</p>;
  // if (error) return <p className="loading">Error : {error.message}</p>;

  return (
    <div className="lead-details">
      <Heading tag="h2" name="Lead Details" />
      {loading && <p className="loading">Loading leads...</p>}
      {error && <p className="loading">Error : {error.message}</p>}
      {/* VIEW MODE -------------------------- */}
      {!isEditing && leadData && (
        <div className="lead-details-content">
          <p className="lead-info">
            <strong>Name:</strong> {leadData.name}
          </p>
          <p className="lead-info">
            <strong>Source:</strong> {leadData.source}
          </p>
          <p className="lead-info">
            <strong>Status:</strong> {leadData.status}
          </p>
          <p className="lead-info">
            <strong>Priority:</strong> {leadData.priority}
          </p>
          <p className="lead-info">
            <strong>Sales Agent:</strong> {leadData.salesAgent?.name}
          </p>
          <p className="lead-info">
            <strong>Time to Close:</strong> {leadData.timeToClose} days
          </p>
          <p className="lead-info">
            <strong>Tags:</strong> {leadData.tags.join(", ")}
          </p>

          <button
            className="edit-btn"
            onClick={() => loadLeadForEdit(leadData)}
          >
            Edit Details
          </button>

          <Comments />
        </div>
      )}

      {/* EDIT MODE -------------------------- */}
      {isEditing && editFormData && (
        <div className="edit-form">
          {/* Name */}
          <div className="form-group">
            <label>Name:</label>
            <input
              name="name"
              className="form-input"
              value={editFormData.name}
              onChange={handleChange}
            />
          </div>

          {/* Source */}
          <div className="form-group">
            <label>Source:</label>
            <select
              name="source"
              className="form-input"
              value={editFormData.source}
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

          {/* Agent */}
          <div className="form-group">
            <label>Sales Agent:</label>
            <Select
              isClearable
              options={agentOptions}
              value={agentOptions.find(
                (opt) => opt.value === editFormData.salesAgent
              )}
              onChange={(selected) =>
                handleSelectChange(selected, "salesAgent")
              }
            />
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              className="form-input"
              value={editFormData.status}
              onChange={handleChange}
            >
              {statusEnums.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div className="form-group">
            <label>Priority:</label>
            <select
              name="priority"
              className="form-input"
              value={editFormData.priority}
              onChange={handleChange}
            >
              {priorityEnums.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Time to Close */}
          <div className="form-group">
            <label>Time to Close:</label>
            <input
              name="timeToClose"
              type="number"
              className="form-input"
              value={editFormData.timeToClose}
              onChange={handleChange}
            />
          </div>

          {/* Tags */}
          <div className="form-group">
            <label>Tags:</label>
            <Select
              isMulti
              options={tagOptions}
              value={tagOptions.filter((opt) =>
                editFormData.tags.includes(opt.value)
              )}
              onChange={(selected) => handleMultiSelectChange(selected, "tags")}
            />
          </div>

          {/* Buttons */}
          <button className="save-btn" onClick={() => handleEditSubmit(leadId)}>
            Save Changes
          </button>

          <button className="cancel-btn" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadDetails;
