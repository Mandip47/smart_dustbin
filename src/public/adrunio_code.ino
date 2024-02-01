#include <Servo.h>

const int trigPin1 = 7;
const int echoPin1 = 8;  // Change this to the new echo pin for the first sensor
const int trigPin2 = 9;  // Change this to the new trigger pin for the second sensor
const int echoPin2 = 10;

int inches1 = 0;
int inches2 = 0;
int cm1 = 0;
int cm2 = 0;

Servo servo;

long readUltrasonicDistance(int triggerPin, int echoPin) {
  pinMode(triggerPin, OUTPUT);
  digitalWrite(triggerPin, LOW);
  delayMicroseconds(2);
  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(triggerPin, LOW);
  pinMode(echoPin, INPUT);
  return pulseIn(echoPin, HIGH);
}

void setup() {
  Serial.begin(9600);
  servo.attach(4);
}

void loop() {
  cm1 = 0.01723 * readUltrasonicDistance(trigPin1, echoPin1);
  cm2 = 0.01723 * readUltrasonicDistance(trigPin2, echoPin2);

  Serial.print("{valueOutsideSensor: ");
  Serial.print(cm1);
  Serial.print(", valueInsideSensor: ");
  Serial.print(1);
  // Serial.print(cm2);
  Serial.print(", dustbinInfo: ");
  
  if (cm2 < 35) {
    Serial.print("1");  // Dustbin Opened
    openDustbin();
    delay(3000);
  } else {
    Serial.print("0");  // Dustbin Closed
    closeDustbin();
  }

  Serial.println("}");

  delay(500);
}

void openDustbin() {
  servo.write(90);
}

void closeDustbin() {
  servo.write(0);
}
