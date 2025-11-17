import { useSalesAgentContext } from "../contexts/SalesAgentContext";
import Heading from "./Heading";

const AgentForm = () => {
  const { handleChange, handleSubmit, formData } = useSalesAgentContext();
  return (
    <div className="add-form">
      <Heading name="Add New Agent" tag="h2" />

      <div className="form">
        <form className="form-content" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="agentName" className="form-label">
              Agent Name:
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              placeholder="Enter agent name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address:
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter agent email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button className="form-btn" type="submit">
            Add Agent
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentForm;
