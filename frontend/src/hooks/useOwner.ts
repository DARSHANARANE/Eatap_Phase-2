import { useEffect, useState } from "react";
import axios from "axios";

export const useOwner = () => {
  const [owner, setOwner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/owner/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

       setOwner({
          ...res.data,
          messId: res.data._id,
        });
      } catch (error) {
        setOwner(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOwner();
  }, []);

  return { owner, loading };
};