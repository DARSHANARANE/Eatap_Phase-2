import dns from "node:dns";

// THIS actually overrides Node's DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);
console.log(await dns.getServers());

import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
