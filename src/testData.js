const express = require("express");
const http = require("http");
const io = require("socket.io");
const { Client,IntentsBitField} = require('discord.js');


const app = express();
const server = http.createServer(app);
const socketIO = io(server);
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//for discord 
console.log("this is discord ai ");
const discordToken = "MTE4ODA3NjQ2NjQ5NjM0NDExNQ.GPo8R4.qFGyTZn8IvnxCSaUtqvwtpKcQcbMUwSIvp5RFs"; // Replace with your Discord bot token

const bot = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers,IntentsBitField.Flags.GuildMessages,IntentsBitField.Flags.MessageContent]
});

bot.login(discordToken);

bot.on('ready',(c)=>{
  console.log(`${c.user.tag}  is ready`);
});
///

socketIO.on("connection", (socket) => {
  console.log("User connected", socket.id);

  // Send fake data to the client at regular intervals
  const fakeDataInterval = setInterval(() => {
    // const fakeData = Math.floor(Math.random() * (110 - 10 + 1)) + 10;
    const fakeData = Math.floor(Math.random() * (110 - 105 + 1) + 105);
    // const fakeData = 110;

    const fakeInfoData = Math.round(Math.random());
    const dataOfDustbin = { value: fakeData , info: fakeInfoData}
    socket.emit("fakeData",dataOfDustbin);

    if (Math.ceil(dataOfDustbin.value * 0.909) == 100) {
      const channel = bot.channels.cache.get('1188078011745050727'); // Replace with your Discord channel ID
      if (channel) {
        channel.send('DUSTBIN FULL!');
      }
    }

  }, 2000);

  // Stop sending fake data when the client disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    clearInterval(fakeDataInterval);
  });
});


///
// const discordSendMessage = () => {
// bot.on('messageCreate', (message) => {
//      message.channel.send('DUSTBIN FULL!');
// });
// }

/////////////

const port = 5500;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

