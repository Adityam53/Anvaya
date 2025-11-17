import Heading from "./Heading";
import useFetch from "../hooks/useFetch";
import Select from "react-select";
import { useLeadContext } from "../contexts/LeadContext";
import { useParams } from "react-router-dom";
import { useSalesAgentContext } from "../contexts/SalesAgentContext";

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

  const agentOptions = agents.map((a) => ({ value: a._id, label: a.name }));

  return (
    <>
      <Heading tag="h2" name="Comments" />
      <div className="comments-section">
        <div>
          <div>
            {commentsLoading && (
              <p className="comment-card loading">Loading...</p>
            )}
          </div>

          {comments?.length > 0 ? (
            comments.map((comment) => (
              <div className="comment-card" key={comment._id}>
                <p className="comment-meta">
                  <strong>{comment.author?.name || "Unknown"}</strong> —{" "}
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                <p className="comment-text">
                  <strong>Comment:</strong> {comment.commentText}
                </p>
              </div>
            ))
          ) : (
            <p className="comment-card">No comments yet.</p>
          )}
        </div>
        <div>
          <form action="" onSubmit={(e) => handleCommentSubmit(e, leadId)}>
            <div className="form-group">
              <label className="form-label" htmlFor="commentText">
                Add Comment:
              </label>
              <input
                type="text"
                className="form-input"
                onChange={handleChange}
                value={commentFormData.commentText}
                name="commentText"
                id="comment"
              />
              <label htmlFor="author" className="form-label">
                Author:
              </label>
              <Select
                className="form-input"
                isClearable
                name="author"
                onChange={(selected) => handleSelectChange(selected, "author")}
                value={
                  agentOptions.find(
                    (opt) => opt.value === commentFormData.author
                  ) || null
                }
                options={agentOptions}
                placeholder="Select Author"
              ></Select>{" "}
              <button className="form-btn">Submit Comment</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Comments;
