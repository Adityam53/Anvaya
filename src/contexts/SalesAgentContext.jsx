import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SalesAgentContext = createContext();

export const useSalesAgentContext = () => useContext(SalesAgentContext);

export const SalesAgentProvider = ({ children }) => {
  const baseUrl = "https://anvaya-backend-teal.vercel.app/agents";

  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  const [url, setUrl] = useState(baseUrl);
  const { data, error, loading } = useFetch(url);
  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (data) {
      setAgents(data);
    }
  }, [data]);

  console.log(agents);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      toast.error("Agent name is required.");
      return;
    }

    if (formData.name.trim().length < 2) {
      toast.error("Agent name must be at least 2 characters.");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const newAgent = await response.json();
      setAgents((prev) => [...prev, newAgent]);

      toast.success("Agent added successfully!");

      setUrl(`${baseUrl}?t=${Date.now()}`);

      setFormData({ name: "", email: "" }); // Reset form
    } catch (error) {
      console.error(error);
      toast.error("Failed to add agent. Try again later.");
    }
  };

  const handleDelete = async (id, url, name) => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to delete this ${name} ?`,
      );

      if (!confirmed) return;

      const res = await fetch(`${url}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Failed to delete ${name}.`);

      toast.success(`${name} deleted successfully!`);

      setAgents((prev) => prev.filter((agent) => agent._id !== id));
    } catch (error) {
      console.error(error);
      toast.error(`Error in deleting ${name}.`);
    }
  };
  return (
    <SalesAgentContext.Provider
      value={{
        agents,
        error,
        loading,
        formData,
        handleChange,
        handleSubmit,
        baseUrl,
        handleDelete,
        triggerRefresh,
      }}
    >
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </SalesAgentContext.Provider>
  );
};
