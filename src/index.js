const serialport = require("serialport");
const Readline = require("@serialport/parser-readline");
const express = require("express");
// const app = express();
const path = require("path");

// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

/////////
const http = require("http");
const io = require("socket.io");
const { Client,IntentsBitField} = require('discord.js');
const app = express();
const server = http.createServer(app);
const socketIO = io(server);

// const bot = require('/workspaces/smart_dustbin/src/public/assets/js/discordAI.js');
//for counting the discord message 
let count = 0;

//for discord 
console.log("this is discord ai ");

const discordToken = "MTE4ODA3NjQ2NjQ5NjM0NDExNQ.GiWR56.QwPDWwCSUmfmvut-5sOSIgiuO8hwqubPIAI22E"; // Replace with your Discord bot token

const bot = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers,IntentsBitField.Flags.GuildMessages,IntentsBitField.Flags.MessageContent]
});

bot.login(discordToken);

bot.on('ready',(c)=>{
  console.log(`${c.user.tag}  is ready`);
});
///

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile("index.html");
});

socketIO.on("connection", (socket) => {
  console.log("User connected", socket.id);
});

const serialPort = new serialport.SerialPort({
  path: "COM7",
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
  // console.log(data);
  // console.log(typeof data);

  const inputString = data;
  // const inputString = "valueOutsideSensor: 331 valueInsideSensor: 29 dustbinInfo: 0";

// Split the input string by spaces
const keyValuePairs = inputString.split(' ');

// Initialize an empty object to store key-value pairs
const resultObject = {};

// Iterate through the key-value pairs and populate the object
for (let i = 0; i < keyValuePairs.length; i += 2) {
    const key = keyValuePairs[i];
    const value = keyValuePairs[i + 1];
    resultObject[key.substring(0, key.length - 1)] = parseInt(value);
}

console.log(resultObject);

socketIO.emit("fakeData", resultObject);

    if (Math.ceil((1 - resultObject.valueInsideSensor / 30) * 100) >= 100) {
        const channel = bot.channels.cache.get('1188078011745050727');
        if (channel) {
            count++;
            channel.send(`COUNT ${count} : DUSTBIN BAGAR FULL!`);
        }
    }

});

serialPort.on("error", (err) => {
  console.error("Error:", err.message);
});

const port = 5500;
server.listen(port, () => {
  const serverUrl = `http://localhost:${port}`;
  console.log(`Server is listening on ${serverUrl}`);
});
