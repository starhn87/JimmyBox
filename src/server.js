import express from "express";

const PORT = 4000;

const app = express();

const handleHome = () => console.log("Somebody is tryining to go home.");

app.get("/", handleHome);

const handleListening = () =>
  console.log(`✅ Server listening on port http://location:${PORT} 🚀`);

app.listen(PORT, handleListening);
