/*=============== Dustbin Level Indicator ===============*/
// import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

initBattery();

function initBattery() {
  const batteryLiquid = document.querySelector(".battery__liquid"),
    batteryStatus = document.querySelector(".battery__status"),
    batteryPercentage = document.querySelector(".battery__percentage");

  // const socket = io();

  // socket.on("data", (data) => {
  //   console.log(data);
  //   text.innerHTML = data.msg;
  // });

  navigator.getBattery().then((batt) => {
    updateBattery = () => {
      /* 1. We update the number level of the battery */
      let level = Math.floor(batt.level * 100);
      batteryPercentage.innerHTML = level + "%";

      /* 2. We update the background level of the battery */
      batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`;

      /* 3. We validate full battery, low battery and if it is charging or not */
      if (level == 100) {
        /* We validate if the battery is full */
        batteryStatus.innerHTML = `Full and Needs Emptying <i class="ri-battery-2-fill green-color"></i>`;
        // batteryStatus.innerHTML = `Full and Needs Emptying <i class="ri-archive-drawer-line green-color"></i>`;
        batteryLiquid.style.height = "103%"; /* To hide the ellipse */
      } else if (level <= 5) {
        /* We validate if the battery is low */
        batteryStatus.innerHTML = `Empty and Ready <i class="ri-plug-line animated-red"></i>`;
        // batteryStatus.innerHTML = `Empty and Ready <i class="ri-archive-2-line animited-red"></i>`;
      } else if (level > 5 && level < 99) {
        /* We validate if the battery is charging */
        batteryStatus.innerHTML = `In Progress... <i class="ri-flashlight-line animated-green"></i>`;
        // batteryStatus.innerHTML = `In Progress... <i class="ri-archive-stack-line animated-green"></i>`;
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

    updateBattery();

    /* 5. Battery status events */
    // batt.addEventListener("chargingchange", () => {
    //   updateBattery();
    // });
    // batt.addEventListener("levelchange", () => {
    //   updateBattery();
    // });
  });
}
