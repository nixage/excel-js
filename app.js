const express = require('express');
const path = require('path');

const server = express();

/* ===========================SERVER USE=========================== */
server.use(express.static(__dirname + '/dist'))

/* ================================================================ */


server.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'))
});

server.listen(process.env.PORT || 3001);
