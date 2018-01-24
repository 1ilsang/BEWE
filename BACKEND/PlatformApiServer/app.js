'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.r = (result) => {
    res.json({
      status: true,
      message: "success",
      result,
    });
  };
  next();
});

require('./routes')(app);

//error handler
require('./ErrorHandler')(app);

const PORT = 3457;
app.listen(PORT, () => {
  console.info(`[BEWE-PlatformApiServer] Listening on Port ${PORT}`);
});


/* socket 붙이기 */
const io = require('./controllers/SocketCtrl').initialize(server);

module.exports = app;