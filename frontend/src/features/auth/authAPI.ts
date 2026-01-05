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
