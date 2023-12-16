import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

const text = document.querySelector("p");
const socket = io();

socket.on("data", (data) => {
  console.log(data);
  text.innerHTML = data.msg;
});
