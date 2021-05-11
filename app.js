//Request
//when user first makes a request, it is accepted by this application

const express = require('express');
const http = require('http');

const app = express();
const server = http.Server(app);

module.exports = { app, server };
