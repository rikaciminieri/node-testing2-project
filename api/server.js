const express = require("express");
const server = express();

const celebritiesRouter = require("./celebrities/celebrities-router");

server.use(express.json());

server.use("/api/celebrities", celebritiesRouter);

server.use("*", (req, res) => {
  next({ status: 404, message: "NOT FOUND" });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = server;
