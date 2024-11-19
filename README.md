# Smart Dustbin Project

This project involves creating a smart dustbin system that utilizes sensors, microcontrollers, a servo motor, and real-time communication technologies to monitor and manage waste levels. The system is designed to detect when the dustbin is full and send notifications to users via a Discord bot and a web interface.

## Features

1. **Ultrasonic Sensors:** Ultrasonic sensors are used to measure the distance of waste inside the dustbin, allowing the system to determine the fill level.

2. **Microcontroller:** An Arduino microcontroller is used to process sensor data and control the servo motor that opens and closes the dustbin lid.

3. **Servo Motor:** The servo motor is responsible for opening and closing the dustbin lid based on the fill level detected by the sensors.

4. **Real-time Communication:** The system uses Socket.IO to establish real-time communication between the microcontroller, web interface, and Discord bot.

5. **Web Interface:** Users can access a web interface to monitor the fill level of the dustbin and receive notifications when it reaches a specified threshold.

6. **Discord Bot Integration:** A Discord bot is integrated into the system to send notifications to a designated Discord channel when the dustbin is almost full.

## Components Used

1. Arduino Uno 
2. Ultrasonic sensors (HC-SR04)
3. Servo motor
4. Wires and breadboard for connections
5. Node.js for server-side programming
6. Express.js for web server
7. Socket.IO for real-time communication
8. Discord.js for Discord bot integration

## System Operation

1. **Sensor Data Acquisition:** Ultrasonic sensors measure the distance of waste inside the dustbin, and this data is sent to the Arduino microcontroller.
2. **Data Processing:** The microcontroller processes the sensor data to determine the fill level of the dustbin.
3. **Servo Control:** Based on the fill level, the microcontroller controls the servo motor to open or close the dustbin lid.
4. **Real-time Communication:** The microcontroller sends the fill level data to the web interface and Discord bot via Socket.IO.
5. **User Notifications:** Users receive notifications on the web interface and Discord channel when the dustbin reaches a specified fill level threshold.

## How to Run

1. Connect the ultrasonic sensors, servo motor, and Arduino Uno according to the provided schematic.
2. Install Node.js and required libraries/modules (serialport, @serialport/parser-readline, express, socket.io, discord.js).
3. Upload the Arduino code to the Arduino Uno.
4. Run the Node.js server script on your computer or a Raspberry Pi connected to the Arduino.
5. Access the web interface to monitor the dustbin fill level and receive notifications.
6. Configure the Discord bot token and channel ID in the Node.js script for Discord notifications.

## Some snaps

<figure>
  <img src="https://github.com/Mandip47/smart_dustbin/assets/108076760/1fc64b38-7dd9-4aeb-a064-c780e4f8fadd" style="width: 48%;" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/Mandip47/smart_dustbin/assets/108076760/356666e0-cbef-42cc-80b9-b38468ff4d74" alt="Image 2" style="width:38%;"/>
</figure>
<hr>
&nbsp;&nbsp;&nbsp;&nbsp;
<figure style="margin: auto;">
  <img src="https://github.com/Mandip47/smart_dustbin/assets/108076760/de6b2d48-27a3-4a4a-8bb6-2808e01b215f" style="width: 50%;" />
</figure>

## Simulation of Arduino
[CLick to View](https://www.tinkercad.com/things/0yE8XggpjRl-smart-dustbin-simulation)

## Video Demo

[Watch short video](https://youtu.be/03QzmQV6a2o)
