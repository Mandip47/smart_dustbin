const express = require("express");
const http = require("http");
const io = require("socket.io");

const app = express();
const server = http.createServer(app);
const socketIO = io(server);
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

socketIO.on("connection", (socket) => {
  console.log("User connected", socket.id);

  // Send fake data to the client at regular intervals
  const fakeDataInterval = setInterval(() => {
    const fakeData = Math.floor(Math.random() * (110 - 10 + 1)) + 10;
    // const fakeData = Math.floor(Math.random() * (10 - 10 + 5));
    const fakeInfoData = Math.round(Math.random());
    socket.emit("fakeData", { value: fakeData , info: fakeInfoData});
  }, 2000);

  // Stop sending fake data when the client disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    clearInterval(fakeDataInterval);
  });
});

const port = 5500;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
