const http = require("http");
const { NODE_ENV } = process.env;
const port = 8080;

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end("Hello, World!");
};

const server = http.createServer(requestListener);
server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on localhost: ${port} - env ${NODE_ENV}`);
});
