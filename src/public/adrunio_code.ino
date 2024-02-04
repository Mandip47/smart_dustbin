#include <Servo.h>

const int trigPin1 = 13;
const int echoPin1 = 12;  
const int trigPin2 = 7;  
const int echoPin2 = 8;

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
// Variables to store the last sensor readings
int lastCm1 = 0;
int lastCm2 = 0;

void setup() {
  Serial.begin(9600);
  servo.attach(4);

  // Initial sensor readings
  lastCm1 = cm1 = 0.01723 * readUltrasonicDistance(trigPin1, echoPin1);
  lastCm2 = cm2 = 0.01723 * readUltrasonicDistance(trigPin2, echoPin2);

}

void loop() {
    cm1 = 0.01723 * readUltrasonicDistance(trigPin1, echoPin1);
    cm2 = 0.01723 * readUltrasonicDistance(trigPin2, echoPin2);

    // Check if the values have changed
    if (cm1 != lastCm1 || cm2 != lastCm2) {
      Serial.print("valueOutsideSensor: ");
      Serial.print(cm1);
      // Serial.print(", valueInsideSensor: ");
       Serial.print(" valueInsideSensor: ");
      Serial.print(cm2);
      // Serial.print(", dustbinInfo: ");
      Serial.print(" dustbinInfo: ");

      if (cm1 < 35) {
        Serial.println("1");  // Dustbin Opened
        openDustbin();
      } else {
        Serial.println("0");  // Dustbin Closed
        closeDustbin();
      }

      // Serial.println("}");

      // Update last sensor readings
      lastCm1 = cm1;
      lastCm2 = cm2;
    }

  delay(2000);  // Additional delay to avoid rapid looping
}

void openDustbin() {
  servo.write(90);
}

void closeDustbin() {
  servo.write(0);
}
