import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const TagsContext = createContext();

export const useTagsContext = () => useContext(TagsContext);

export const TagsContextProvider = ({ children }) => {
  const { data, error, loading } = useFetch(
    "https://anvaya-backend-teal.vercel.app/tags"
  );

  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setTags(data);
    }
  }, [data]);
  return (
    <>
      <TagsContext.Provider value={{ tags, error, loading }}>
        {children}
      </TagsContext.Provider>
    </>
  );
};
