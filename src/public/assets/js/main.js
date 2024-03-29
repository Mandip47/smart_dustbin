/*=============== Dustbin Level Indicator ===============*/
import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
const socket = io();

console.log("hello world main");

const batteryLiquid = document.querySelector(".battery__liquid"),
  batteryStatus = document.querySelector(".battery__status"),
  batteryPercentage = document.querySelector(".battery__percentage"),
  batteryText = document.querySelector(".battery__text");
const maxLength = 31;

socket.on("fakeData", (data) => {
  console.log("main : ", data);
  updateBattery(data);
  toggleRedAndGreenClass(data.dustbinInfo);
});

function toggleRedAndGreenClass(condition) {
  // Remove only red and green classes
  batteryText.classList.remove(
    "red",
    "green",
    "animited-green",
    "animited-red"
  );

  // Add the appropriate class based on the condition
  // green => open and red => close

  if (condition === 1) {
    batteryText.classList.add("green");
    batteryText.classList.add("animited-green");
  } else if(condition === 0) {
    batteryText.classList.add("red");
    batteryText.classList.add("animited-red");
  }
}

const updateBattery = (data) => {
  /* 1. We update the number level of the battery */
  // if (data.value > maxLength && data.value && data.value < 0) return;
  if (data.value > maxLength && data.valueInsideSensor && data.valueInsideSensor < 0) return;

  // for test data
  // let level = Math.ceil(data.value * 0.909);
  // let level = 100; // just test

  // opposite to normal or requires value 
  //////
  
  let level = Math.ceil((1 - data.valueInsideSensor / maxLength) * 100);

// Ensure level is between 0 and 100
  level = Math.max(0, Math.min(100, level));
  ///////


  batteryPercentage.innerHTML = level + "%";

  /* 2. We update the background level of the dustbin */
  batteryLiquid.style.height = `${parseInt(level)}%`;

  if (level == 100) {
    /* We validate if the dustbin is full */
    batteryStatus.innerHTML = `Full and Needs Emptying <i class="ri-archive-drawer-line green-color"></i>`;
    batteryLiquid.style.height = "103%"; /* To hide the ellipse */
  } else if (level <= 5) {
    /* We validate if the dustbin is low */
    batteryStatus.innerHTML = `Empty and Ready <i class="ri-archive-2-line animated-red"></i>`;
  } else if (level > 5 && level <= 99) {
    /* We validate if the dustbin is filling */
    batteryStatus.innerHTML = `In Progress... <i class="ri-archive-stack-line animated-green"></i>`;
  } else {
    /* If it's not loading, don't show anything. */
    batteryStatus.innerHTML = "";
  }

  /* 4. We change the colors of the battery and remove the other colors */
  if (level <= 5) {
    batteryLiquid.classList.add("gradient-color-red");
    batteryLiquid.classList.remove(
      "gradient-color-orange",
      "gradient-color-yellow",
      "gradient-color-green"
    );
  } else if (level <= 40) {
    batteryLiquid.classList.add("gradient-color-orange");
    batteryLiquid.classList.remove(
      "gradient-color-red",
      "gradient-color-yellow",
      "gradient-color-green"
    );
  } else if (level <= 80) {
    batteryLiquid.classList.add("gradient-color-yellow");
    batteryLiquid.classList.remove(
      "gradient-color-red",
      "gradient-color-orange",
      "gradient-color-green"
    );
  } else {
    batteryLiquid.classList.add("gradient-color-green");
    batteryLiquid.classList.remove(
      "gradient-color-red",
      "gradient-color-orange",
      "gradient-color-yellow"
    );
  }
};