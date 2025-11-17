import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SalesAgentContext = createContext();

export const useSalesAgentContext = () => useContext(SalesAgentContext);

export const SalesAgentProvider = ({ children }) => {
  const baseUrl = "https://anvaya-backend-teal.vercel.app/agents";

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

    if (!formData.name || !formData.email) {
      toast.error("Please fill in all the fields.");
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

      // ✅ Re-fetch latest data from backend (optional, but safest)
      setUrl(`${baseUrl}?t=${Date.now()}`);

      setFormData({ name: "", email: "" }); // Reset form
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to add agent. Try again later.");
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
