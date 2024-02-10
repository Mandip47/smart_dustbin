// Import necessary libraries/modules
const serialport = require("serialport");
const Readline = require("@serialport/parser-readline");
const express = require("express");
const path = require("path");
const http = require("http");
const io = require("socket.io");
const { Client,IntentsBitField} = require('discord.js');

// Create an instance of the Express application
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO for real-time communication
const socketIO = io(server);

//for counting the discord message 
let count = 0;

//for discord 
console.log("this is discord ai ");

// Discord bot token
const discordToken = "MTE4ODA3NjQ2NjQ5NjM0NDExNQ.GboVsZ.rMs87PDZFKYl2lZtfF3kxbZBMZmU3ZgeN3hk8o"; // Replace with your Discord bot token

// Create a Discord bot instance
const bot = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers,IntentsBitField.Flags.GuildMessages,IntentsBitField.Flags.MessageContent]
});

bot.login(discordToken);

// Log when the bot is ready
bot.on('ready',(c)=>{
  console.log(`${c.user.tag}  is ready`);
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Route for serving the index.html file when the root URL is accessed
app.get("/", function (req, res) {
  res.sendFile("index.html");
});

// Log when a user connects via Socket.IO
socketIO.on("connection", (socket) => {
  console.log("User connected", socket.id);
});

// Configure and open the serial port connection
const serialPort = new serialport.SerialPort({
  path: "COM7",
  baudRate: 9600,
  dataBits: 8,
  parity: "none",
  stopBits: 1,
  flowControl: false,
});

// Create a parser to read lines from the serial port
const parser = serialPort.pipe(
  new Readline.ReadlineParser({ delimiter: "\r\n" })
);

serialPort.on("open", () => {
  console.log("Serial Port Opened");
});

// Log when the serial port is opened
parser.on("data", (data) => {
  // console.log(data);

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
console.log((1 - resultObject.valueInsideSensor / 31) * 100);

  // If the dustbin is almost full, send a message to the Discord channel
    if (Math.ceil((1 - resultObject.valueInsideSensor / 31) * 100) >= 80) {
        const channel = bot.channels.cache.get('1188078011745050727');
        if (channel) {
            count++;
            channel.send(`COUNT ${count} : DUSTBIN BAGAR ALMOST FULL!`);
        }
    }

});

serialPort.on("error", (err) => {
  console.error("Error:", err.message);
});

// Start the server and listen on the defined port
const port = 5500;
server.listen(port, () => {
  const serverUrl = `http://localhost:${port}`;
  console.log(`Server is listening on ${serverUrl}`);
});
