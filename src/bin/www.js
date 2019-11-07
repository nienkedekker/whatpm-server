#!/usr/bin/env node
import app from '../app.js';
import debugLib from 'debug';
import http from 'http';
const debug = debugLib('whatpm:server');
require('dotenv').config();

const normalizePort = (value) => {
  const port = parseInt(value, 10);

  if (isNaN(port)) {
    return value;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges');
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(bind + ' is already in use');
    process.exit(1);
    break;
  default:
    throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}`: `port ${addr.port}`;
  debug('Listening on ' + bind);
  console.log('\x1b[32m', `→ Node server started successfully in ${process.env.NODE_ENV} mode and listening on: http://localhost:${addr.port}`);
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.listen(process.env.PORT || 3000);
server.on('error', onError);
server.on('listening', onListening);
