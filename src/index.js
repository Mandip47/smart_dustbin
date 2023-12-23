const serialport = require("serialport");
const Readline = require("@serialport/parser-readline");
const express = require("express");
const app = express();
const path = require("path");

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const bot = require('/workspaces/smart_dustbin/src/public/assets/js/discordAI.js');

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile("index.html");
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
});

const serialPort = new serialport.SerialPort({
  path: "COM5",
  baudRate: 9600,
  dataBits: 8,
  parity: "none",
  stopBits: 1,
  flowControl: false,
});

const parser = serialPort.pipe(
  new Readline.ReadlineParser({ delimiter: "\r\n" })
);

serialPort.on("open", () => {
  console.log("Serial Port Opened");
});

parser.on("data", (data) => {
  if (+data === 1) {
    console.log(data);
    io.emit("data", { msg: "LED IS ON" });
    return;
  }
  io.emit("data", { msg: "LED IS OFF" });
});

serialPort.on("error", (err) => {
  console.error("Error:", err.message);
});
server.listen(3000, function () {
  console.log("Starting");
});
