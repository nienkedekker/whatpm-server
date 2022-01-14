#!/usr/bin/env node
import http from "http";
import app from "../app";

require("dotenv").config();

const normalizePort = (value) => {
  const port = parseInt(value, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    return value;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || "3000");
const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

const onListening = () => {
  const addr = server.address();
  console.log(
    "\x1b[32m",
    `→ Node server started successfully in ${process.env.NODE_ENV} mode and listening on: http://localhost:${addr.port}`
  );
};

app.set("port", port);

server.listen(process.env.PORT || 3000);
server.on("error", onError);
server.on("listening", onListening);
