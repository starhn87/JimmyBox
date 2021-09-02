import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

const handleHome = (req, res, next) => {
  return res.send("I love middleware.");
};

const handleProtected = (req, res) => {
  return res.send("Welcome to the private lounge.");
};

const handleLogin = (req, res) => {
  return res.send("Login here");
};

app.use(logger);
app.get("/", handleHome);
app.get("/protected", handleProtected);
app.get("/login", handleLogin);

const handleListening = () =>
  console.log(`Server listening on port http://location:${PORT} 🚀`);

app.listen(PORT, handleListening);
