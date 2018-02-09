const fs = require('fs');
const path = require('path');
const http = require('http');
const debug = require('debug');

const logger = debug('mylogger')

const server = http.createServer((req, res) => {
  logger(process.memoryUsage());

  const filename = req.url === '/' ? 'index.html' : req.url;

  fs.readFile(path.join(__dirname, 'public', filename), (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end();
      return;
    }

    res.write(data);
    res.end();
  });
});

server.listen(process.env.PORT || 3000);
