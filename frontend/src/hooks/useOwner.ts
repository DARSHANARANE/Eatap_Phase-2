// src/hooks/useOwner.ts
import { useState, useEffect } from "react";
import axios from "axios";

interface Owner {
  _id: string;
  name: string;
  email: string;
  messId: string;
}

export const useOwner = () => {
  const [owner, setOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await axios.get<Owner>(
          "http://localhost:5000/api/owner/profile", // API to get logged-in owner
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOwner(res.data);
      } catch (err) {
        console.error("Failed to fetch owner info", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOwner();
  }, [token]);

  return { owner, loading };
};
