// this is the testing code for js

const serialport = require("serialport");
const Readline = require("@serialport/parser-readline");
const path = require("path");

// new modules
const express = require("express");
const http = require("http");
const io = require("socket.io");
const { Client,IntentsBitField} = require('discord.js');
const app = express();
const server = http.createServer(app);
const socketIO = io(server);

//for counting the discord message 
let count = 0;


app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

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

// for serial port
const serialPort = new serialport.SerialPort({
  path: "COM7",
  baudRate: 1200,
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

///
// for socket connnection status 
socketIO.on("connection",(socket) => {
  console.log("User connected",socket.id);
});

parser.on("data", (data) => {
  // console.log(data);
  // socketIO.emit("data", data);

  // converting normal string into json object 

  const dataOfDustbin = data;
  const jsonString = dataOfDustbin;
  const validJsonString = jsonString
  .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
  .replace(/'/g, '"');
  const jsonObject = JSON.parse(validJsonString);

// console.log(jsonObject);

  if (!data) return;

  // set inverval of 2 sec 

  const processData = () => {
    const data1 = jsonObject.valueInsideSensor;
    const infoData = jsonObject.dustbinInfo;
    const dataOfDustbin = { value: data1, info: infoData };

    console.log(dataOfDustbin);
    socketIO.emit("fakeData", dataOfDustbin);

    if (Math.ceil((1 - dataOfDustbin.value / 30) * 100) >= 100) {
        const channel = bot.channels.cache.get('1188078011745050727');
        if (channel) {
            count++;
            channel.send(`COUNT ${count} : DUSTBIN BAGAR FULL!`);
        }
    }

    // Process the next set of data after a delay
    setTimeout(processData, 5000);
};

// Start the initial data processing
processData();


  // Move clearInterval here
// setTimeout(() => {
//   clearInterval(dataInterval);
// }, 60000);


});

// local host website link
const port = 5500;
server.listen(port, () => {
  const serverUrl = `http://localhost:${port}`;
  console.log(`Server is listening on ${serverUrl}`);
});

////////////
// socketIO.on("connection", (socket) => {
//   console.log("User connected", socket.id);

//   // Send fake data to the client at regular intervals
//   const fakeDataInterval = setInterval(() => {
//     // const fakeData = Math.floor(Math.random() * (110 - 10 + 1)) + 10;
//     const fakeData = Math.floor(Math.random() * (110 - 105 + 1) + 105);
//     // const fakeData = 110;

//     const fakeInfoData = Math.round(Math.random());
//     const dataOfDustbin = { value: fakeData , info: fakeInfoData}
//     socket.emit("fakeData",dataOfDustbin);

//     if (Math.ceil(dataOfDustbin.value * 0.909) == 100) {
//       const channel = bot.channels.cache.get('1188078011745050727'); // Replace with your Discord channel ID
//       if (channel) {
//         channel.send('DUSTBIN 1 FULL!');
//       }
//     }

//   }, 2000);

//   // Stop sending fake data when the client disconnects
//   socket.on("disconnect", () => {
//     console.log("User disconnected", socket.id);
//     clearInterval(fakeDataInterval);
//   });
// });

///real code 

// socketIO.on("connection", (socket) => {
//   console.log("User connected", socket.id);

//   // Send fake data to the client at regular intervals
//   const fakeDataInterval = setInterval(() => {
//     // const fakeData = Math.floor(Math.random() * (110 - 10 + 1)) + 10;
//     const fakeData = Math.floor(Math.random() * (110 - 105 + 1) + 105);
//     // const fakeData = 110;

//     const fakeInfoData = Math.round(Math.random());
//     const dataOfDustbin = { value: fakeData , info: fakeInfoData}
//     socket.emit("fakeData",dataOfDustbin);

//     if (Math.ceil(dataOfDustbin.value * 0.909) == 100) {
//       const channel = bot.channels.cache.get('1188078011745050727'); // Replace with your Discord channel ID
//       if (channel) {
//         channel.send('DUSTBIN 1 FULL!');
//       }
//     }

//   }, 2000);

//   // Stop sending fake data when the client disconnects
//   socket.on("disconnect", () => {
//     console.log("User disconnected", socket.id);
//     clearInterval(fakeDataInterval);
//   });
// });



// const discordSendMessage = () => {
// bot.on('messageCreate', (message) => {
//      message.channel.send('DUSTBIN FULL!');
// });
// }

/////////////



