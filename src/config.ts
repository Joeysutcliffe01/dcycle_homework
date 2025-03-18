// config.ts

// Check if the environment variable is set (on Render)
const isLive = import.meta.env.VITE_IS_LIVE === "true";

console.log("In prod = ", isLive);

// Dynamic base URL based on isLive flag
export const API_BASE_URL = isLive
  ? "https://dcycle-backend.onrender.com"
  : "http://localhost:3200";
