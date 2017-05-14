import express from 'express';
import exphbs from 'express-handlebars';
import http from 'http';
import mongoose from 'mongoose';
import twitter from 'ntwitter';
import routes from './routes';
import config from './config';
import streamHandler from './utils/streamHandler';

const app = express();
const port = process.env.PORT || 8080;

// Set handlebars as templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

mongoose.connect('mongodb://localhost/react-tweets');

// Create new ntwitter instance
const twit = new twitter(config.twitter);

// Default route
app.get('/', routes.index);

// Page route
app.get('/page/:page/:skip', routes.page);

// Set /public as static content dir
app.use("/", express.static(__dirname + "/public/"));

// Start server
const server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port', port);
});

// Initialize socket.io
const io = require('socket.io-client').listen(server);

// Set stream listener for tweets matching tracking keywords
twit.stream('statuses/filter', { track: 'scotch_io, #scotchio' }, function(stream) {
  streamHandler(stream, io);
});
