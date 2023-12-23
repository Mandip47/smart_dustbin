/*=============== Dustbin Level Indicator ===============*/
import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

const socket = io();
console.log("hello world main");


const batteryLiquid = document.querySelector(".battery__liquid"),
batteryStatus = document.querySelector(".battery__status"),
batteryPercentage = document.querySelector(".battery__percentage"),
batteryText = document.querySelector(".battery__text");
const maxLength = 110;

initBattery();

   function initBattery() {

    socket.on("fakeData", (data) => {
      console.log("main : ",data);
      updateBattery(data);
      toggleRedAndGreenClass(data.info);

      // text.innerHTML = data.msg;
    });
  }

  function toggleRedAndGreenClass(condition) {
    
    // Remove only red and green classes
    batteryText.classList.remove('red', 'green','animited-green','animited-red');
  
    // Add the appropriate class based on the condition
    // green => open and red => close

    if (condition === 1) {
      batteryText.classList.add('green');
      batteryText.classList.add('animited-green');
    } else {
      batteryText.classList.add('red');
      batteryText.classList.add('animited-red');
    }
  }

  const updateBattery = (data) => {
    /* 1. We update the number level of the battery */
    if(data.value >= maxLength && data.value && data.value < 0 ) return;

    let level = Math.ceil((data.value) * 0.909);
    // let level = 100; // just test


    batteryPercentage.innerHTML = level + "%";

    /* 2. We update the background level of the battery */
    batteryLiquid.style.height = `${parseInt(level)}%`;

    /* 3. We validate full battery, low battery and if it is charging or not */
    
      // batteryText.innerHTML = data.info ? `Dustbin <i class="ri-mail-open-line"></i>` : `Dustbin <i class="ri-mail-line"></i>` ;
     

    if (level == 100) {
      /* We validate if the battery is full */
      // batteryStatus.innerHTML = `Full and Needs Emptying <i class="ri-battery-2-fill green-color"></i>`;
      batteryStatus.innerHTML = `Full and Needs Emptying <i class="ri-archive-drawer-line green-color"></i>`;
      batteryLiquid.style.height = "103%"; /* To hide the ellipse */
    } else if (level <= 5) {
      /* We validate if the battery is low */
      // batteryStatus.innerHTML = `Empty and Ready <i class="ri-plug-line animated-red"></i>`;
      batteryStatus.innerHTML = `Empty and Ready <i class="ri-archive-2-line animated-red"></i>`;
    } else if (level > 5 && level <= 99) {
      /* We validate if the battery is charging */
      // batteryStatus.innerHTML = `In Progress... <i class="ri-flashlight-line animated-green"></i>`;
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
