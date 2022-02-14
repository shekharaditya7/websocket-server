const http = require("http");
const fs = require("fs");
const { NODE_ENV } = process.env;
const port = 8080;

const requestListener = function (req, res) {
  //STREAMS : Instead of waiting until the file is fully read, we start streaming it to the HTTP client as soon
  // as we have a chunk of data ready to be sent. ----->

  // const stream = fs.createReadStream(__dirname + "/data.txt");
  // stream.pipe(res);

  res.writeHead(200);
  res.end("Hello, World!");
};

const server = http.createServer(requestListener);
server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on localhost: ${port} - env ${NODE_ENV}`);
});
