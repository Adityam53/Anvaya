import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const LeadContext = createContext();
export const useLeadContext = () => useContext(LeadContext);

export const LeadProvider = ({ children }) => {
  const baseUrl = "https://anvaya-backend-teal.vercel.app/leads";

  const location = useLocation();

  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  const [url, setUrl] = useState(baseUrl);

  const fullUrl = url.includes("?")
    ? `${url}&refresh=${refreshKey}`
    : `${url}?refresh=${refreshKey}`;

  const { data, loading, error } = useFetch(fullUrl);

  const [leads, setLeads] = useState([]);

  const [filters, setFilters] = useState({
    salesAgent: "",
    status: "",
    priority: "",
    sortBy: "",
    sortOrder: "asc",
  });

  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: [],
    timeToClose: "",
    priority: "",
  });

  const [commentFormData, setCommentFormData] = useState({
    author: "",
    commentText: "",
  });

  const [editFormData, setEditFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const loadLeadForEdit = (lead) => {
    setEditFormData({
      name: lead.name,
      source: lead.source,
      salesAgent: lead.salesAgent?._id || "",
      status: lead.status,
      priority: lead.priority,
      timeToClose: lead.timeToClose,
      tags: lead.tags || [],
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setCommentFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setEditFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMultiSelectChange = (selectedOptions, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    }));
    setEditFormData((prev) => ({
      ...prev,
      [field]: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    }));
  };

  const handleSelectChange = (selectedOption, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption ? selectedOption.value : "",
    }));
    setCommentFormData((prev) => ({
      ...prev,
      [field]: selectedOption ? selectedOption.value : "",
    }));
    setEditFormData((prev) => ({
      ...prev,
      [field]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleEditSubmit = async (leadId) => {
    try {
      const res = await fetch(`${baseUrl}/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (!res.ok) throw new Error("Failed to update lead");

      toast.success("Lead updated successfully!");

      setIsEditing(false);

      triggerRefresh();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditFormData(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.source ||
      !formData.salesAgent ||
      !formData.status ||
      !formData.priority ||
      !formData.tags ||
      !formData.tags
    ) {
      toast.error("Please fill all the fields");
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

      const newLead = await response.json();
      setLeads((prev) => [...prev, newLead]);
      toast.success("Lead created successfully!");

      setUrl(`${baseUrl}?t=${Date.now()}`);
      triggerRefresh();

      setFormData({
        name: "",
        source: "",
        salesAgent: "",
        status: "",
        priority: "",
        timeToClose: "",
        tags: [],
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCommentSubmit = async (e, leadId) => {
    e.preventDefault();

    if (!commentFormData.author || !commentFormData.commentText) {
      return toast.error("Please fill all the details.");
    }
    try {
      const res = await fetch(`${baseUrl}/${leadId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lead: leadId,
          author: commentFormData.author,
          commentText: commentFormData.commentText,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const newComment = await res.json();
      toast.success("Comment Added successfully!");

      setCommentFormData({
        commentText: "",
        author: "",
      });
      triggerRefresh();
    } catch (error) {}
  };

  useEffect(() => {
    if (!data) return;

    let sorted = [...data];

    if (filters.sortBy === "priority") {
      const priorityRank = { Low: 1, Medium: 2, High: 3 };

      sorted.sort((a, b) => {
        return filters.sortOrder === "asc"
          ? priorityRank[a.priority] - priorityRank[b.priority]
          : priorityRank[b.priority] - priorityRank[a.priority];
      });
    }

    if (filters.sortBy === "timeToClose") {
      sorted.sort((a, b) => {
        return filters.sortOrder === "asc"
          ? a.timeToClose - b.timeToClose
          : b.timeToClose - a.timeToClose;
      });
    }
    setLeads(sorted);
  }, [data, filters.sortBy, filters.sortOrder]);

  useEffect(() => {
    setUrl(baseUrl);
    setFilters({
      salesAgent: "",
      status: "",
      priority: "",
      sortBy: "",
      sortOrder: "asc",
    });
  }, [location.pathname]);

  const leadCounts = {
    new: leads.filter((l) => l.status === "New").length,
    contacted: leads.filter((l) => l.status === "Contacted").length,
    qualified: leads.filter((l) => l.status === "Qualified").length,
    closed: leads.filter((l) => l.status === "Closed").length,
  };

  // const filterByStatus = (status) => {
  //   if (!status) {
  //     setUrl(baseUrl);
  //   } else {
  //     setUrl(`${baseUrl}?status=${encodeURIComponent(status)}`);
  //   }
  // };

  const buildUrl = (agentId = null) => {
    const params = [];

    if (filters.status)
      params.push(`status=${encodeURIComponent(filters.status)}`);
    if (filters.priority)
      params.push(`priority=${encodeURIComponent(filters.priority)}`);
    if (filters.salesAgent)
      params.push(`salesAgent=${encodeURIComponent(filters.salesAgent)}`);

    const query = params.length ? `?${params.join("&")}` : "";
    return agentId
      ? `${baseUrl}/agent/${agentId}${query}`
      : `${baseUrl}${query}`;
  };

  const applyFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    setUrl(buildUrl());
  }, [filters.status, filters.priority, filters.salesAgent]);

  console.log(leads);

  return (
    <LeadContext.Provider
      value={{
        leads,
        loading,
        error,
        leadCounts,
        formData,
        handleChange,
        handleMultiSelectChange,
        handleSubmit,
        handleSelectChange,
        baseUrl,
        applyFilters,
        filters,
        buildUrl,
        commentFormData,
        handleCommentSubmit,
        handleEditSubmit,
        cancelEdit,
        setEditFormData,
        loadLeadForEdit,
        editFormData,
        isEditing,
        refreshKey,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};
