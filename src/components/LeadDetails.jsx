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

  const agentOptions = agents.map((a) => ({
    value: a._id,
    label: a.name,
  }));

  const tagOptions = tags.map((t) => ({
    value: t.name,
    label: t.name,
  }));

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

  if (loading) return <p className="loading">Loading details...</p>;
  if (error) return <p className="loading">Error: {error.message}</p>;
  if (!leadData) return null;

  return (
    <div className="lead-details-page">
      {isEditing && <Heading tag="h2" name="Edit Profile" />}
      {!isEditing && (
        <>
          {/* =========================================
        HERO SECTION
    ========================================= */}
          <Heading tag="h2" name="Prospect Profile" />

          <div className="lead-hero-card">
            <div className="lead-hero-left">
              <div className="lead-avatar">
                {leadData.name?.charAt(0).toUpperCase()}
              </div>

              <div className="lead-hero-content">
                <h1>{leadData.name}</h1>

                <div className="lead-hero-meta">
                  {/* <span
                    className={`status-badge status-${leadData.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {leadData.status}
                  </span> */}

                  <span
                    className={`priority-badge priority-${leadData.priority.toLowerCase()}`}
                  >
                    {leadData.priority} Priority
                  </span>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => loadLeadForEdit(leadData)}
            >
              Edit Details
            </button>
          </div>

          {/* =========================================
        DETAILS GRID
    ========================================= */}

          <div className="lead-grid modern-grid">
            <div className="lead-card">
              <label>Lead Source</label>

              <p>{leadData.source}</p>
            </div>

            <div className="lead-card">
              <label>Assigned Agent</label>

              <p>{leadData.salesAgent?.name || "Unassigned"}</p>
            </div>

            <div className="lead-card">
              <label>Time to Close</label>

              <p className="closing-highlight">{leadData.timeToClose} days</p>
            </div>

            <div className="lead-card">
              <label>Current Status</label>

              <div>
                <span
                  className={`status-badge status-${leadData.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {leadData.status}
                </span>
              </div>
            </div>

            <div className="lead-card full">
              <label>Tags</label>

              <div className="tags-wrapper">
                {leadData.tags?.length > 0 ? (
                  leadData.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="empty-tags">No tags assigned</span>
                )}
              </div>
            </div>
          </div>

          {/* =========================================
        COMMENTS
    ========================================= */}

          <div className="details-section">
            <Comments />
          </div>
        </>
      )}
      {/* ================= EDIT MODE ================= */}
      {isEditing && (
        <div className="lead-edit-form form-content">
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={editFormData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Source</label>
            <select
              name="source"
              value={editFormData.source}
              onChange={handleChange}
            >
              <option value="">Select Source</option>

              {sourceEnums.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Sales Agent</label>

            <Select
              isClearable
              options={agentOptions}
              value={agentOptions.find(
                (option) => option.value === editFormData.salesAgent,
              )}
              onChange={(value) => handleSelectChange(value, "salesAgent")}
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={editFormData.status}
              onChange={handleChange}
            >
              {statusEnums.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>

            <select
              name="priority"
              value={editFormData.priority}
              onChange={handleChange}
            >
              {priorityEnums.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Time To Close</label>

            <input
              type="number"
              name="timeToClose"
              value={editFormData.timeToClose}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full">
            <label>Tags</label>

            <Select
              isMulti
              options={tagOptions}
              value={tagOptions.filter((option) =>
                editFormData.tags.includes(option.value),
              )}
              onChange={(value) => handleMultiSelectChange(value, "tags")}
            />
          </div>

          <div className="form-actions">
            <button
              className="save-btn"
              onClick={() => handleEditSubmit(leadId)}
            >
              Save Changes
            </button>

            <button className="cancel-btn" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadDetails;
