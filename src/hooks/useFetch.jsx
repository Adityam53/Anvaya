import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Http Error, status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
        setError(null);
      } catch (error) {
        console.error("API Error", error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
