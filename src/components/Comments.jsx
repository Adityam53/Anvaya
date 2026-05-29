import Heading from "./Heading";
import useFetch from "../hooks/useFetch";
import Select from "react-select";
import { useLeadContext } from "../contexts/LeadContext";
import { useParams } from "react-router-dom";
import { useSalesAgentContext } from "../contexts/SalesAgentContext";

import { FiMessageSquare, FiSend, FiClock, FiUser } from "react-icons/fi";

const Comments = () => {
  const { leadId } = useParams();

  const {
    baseUrl,
    handleSelectChange,
    handleChange,
    handleCommentSubmit,
    commentFormData,
    refreshKey,
  } = useLeadContext();

  const { agents } = useSalesAgentContext();

  const {
    data: comments,
    loading: commentsLoading,
    error: commentsError,
  } = useFetch(`${baseUrl}/${leadId}/comments?refresh=${refreshKey}`);

  const agentOptions = agents.map((a) => ({
    value: a._id,
    label: a.name,
  }));

  return (
    <div className="comments-wrapper">
      {/* =========================================
          HEADER
      ========================================= */}

      <div className="comments-header">
        <div>
          <Heading tag="h2" name="Discussion Timeline" />

          <p className="crm-description">
            Collaborate with team members and maintain communication history for
            this lead.
          </p>
        </div>

        <div className="comments-count">
          <FiMessageSquare />

          <span>{comments?.length || 0} Comments</span>
        </div>
      </div>

      {/* =========================================
          COMMENTS FEED
      ========================================= */}

      <div className="comments-feed">
        {commentsLoading && (
          <div className="comment-card loading-card">Loading comments...</div>
        )}

        {commentsError && (
          <div className="comment-card loading-card">
            Error loading comments
          </div>
        )}

        {!commentsLoading && comments?.length > 0
          ? comments.map((comment) => (
              <div className="comment-card" key={comment._id}>
                {/* =====================
                  HEADER
              ===================== */}

                <div className="comment-top">
                  <div className="comment-author">
                    <div className="comment-avatar">
                      {comment.author?.name?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <div>
                      <h4>{comment.author?.name || "Unknown"}</h4>

                      <span>Team Member</span>
                    </div>
                  </div>

                  <div className="comment-date">
                    <FiClock />

                    <span>{new Date(comment.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* =====================
                  BODY
              ===================== */}

                <div className="comment-body">
                  <p>{comment.commentText}</p>
                </div>
              </div>
            ))
          : !commentsLoading && (
              <div className="empty-comments">
                <FiMessageSquare />

                <h3>No Comments Yet</h3>

                <p>
                  Start the discussion by adding the first update for this lead.
                </p>
              </div>
            )}
      </div>

      {/* =========================================
          COMMENT FORM
      ========================================= */}

      <div className="comment-form-card">
        <div className="comment-form-header">
          <FiSend />

          <h3>Add New Comment</h3>
        </div>

        <form onSubmit={(e) => handleCommentSubmit(e, leadId)}>
          <div className="comment-form-grid">
            {/* COMMENT */}

            <div className="form-group full">
              <label className="form-label" htmlFor="commentText">
                Comment
              </label>

              <textarea
                className="form-textarea"
                onChange={handleChange}
                value={commentFormData.commentText}
                name="commentText"
                id="commentText"
                rows="5"
                placeholder="Write your update or notes..."
              />
            </div>

            {/* AUTHOR */}

            <div className="form-group full">
              <label className="form-label">Author</label>

              <Select
                classNamePrefix="react-select"
                isClearable
                name="author"
                onChange={(selected) => handleSelectChange(selected, "author")}
                value={
                  agentOptions.find(
                    (opt) => opt.value === commentFormData.author,
                  ) || null
                }
                options={agentOptions}
                placeholder="Select Author"
              />
            </div>

            {/* ACTION */}

            <div className="comment-submit-row">
              <button className="btn btn-secondary">
                <FiSend />

                <span>Submit Comment</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;
