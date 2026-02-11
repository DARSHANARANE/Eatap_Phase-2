import axios from "axios";

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(
    "http://localhost:5000/api/users/login",
    data
  );
  return res.data;
};

export const verifyToken = async (token: string) => {
  const res = await axios.get(
    "http://localhost:5000/api/users/verify",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
