#include "WiFi.h"
#include <FirebaseESP32.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <DHT.h>

// Variables WiFi
const char* ssid = "A1601";
const char* pass = "12345678";

// Variables DHT11
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
int tem;
float hum;
String wl;
String mo;


// Variables NTP
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);
const long gmtOffset_sec = -3 * 60 * 60;

// Variables Firebase
#define FIREBASE_HOST "https://flash-char-f1800.firebaseio.com/"
#define FIREBASE_AUTH "nPEVZmgF0nl5rmTefMgrfrXvGZGzovmBwKI2K7no"
FirebaseData firebaseData;
FirebaseJson json;
String epochTime;
String path;

// Setup
void setup() {
  Serial.begin(115200);
  // WiFi Start
  Serial.println("Connect network:");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);
  while(WiFi.status() != WL_CONNECTED){
    delay(250);
    Serial.print(".");
  }
  Serial.println("Connected!");
  Serial.println(WiFi.localIP());;

  // Start NTP
  timeClient.begin();
  timeClient.setTimeOffset(gmtOffset_sec);

  // Start Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  // DHT Start
  dht.begin();
}

// Loop
void loop() {
  
  // Validate WiFi connected
  while(WiFi.status() != WL_CONNECTED){
    delay(250);
    Serial.print(". - . ");
  }
  
  // Update Time
  while(!timeClient.update()) {
    timeClient.forceUpdate();
  }

  // Get Temperature, Humidity and epochTime and set path
  tem = dht.readTemperature();
  hum = dht.readHumidity();
  wl = "100%";
  mo = "98";
  epochTime = timeClient.getEpochTime();
  path = "/";

  // Validate that there are no errors in reading
  if( isnan(tem) || isnan(hum) ){
    Serial.println("----------------  ERROR ----------------");
    Serial.println("Error: sensor DHT11");
    Serial.println("--------------------------------");
    
    // send error
    sendError(epochTime, 111);
  } else {
    
    // Send data To Firebase
    json.clear();
    json.add("Temprature", tem);
    json.add("Humidity", hum);
    json.add("Waterlevel", wl);
    json.add("Moisture", mo);

    if (Firebase.setJSON(firebaseData, path, json)) {
      Serial.println("SEND SUCCESS");
      // pause 5 minutes
      delay(1000*60*5);
        
    } else {
        Serial.println("FAILED");
        Serial.println("REASON: " + firebaseData.errorReason());
        Serial.println("------------------------------------");
        Serial.println();
    }
  }
  delay(30000);
}

void sendError(String epochTime, int codeError) {
  String pathError = "error/T-" + epochTime;
  FirebaseJson jsonError;
  jsonError.clear();
  jsonError.add("code", codeError);
  jsonError.add("epochTime", epochTime);

  switch (codeError) {
    case 111:
      jsonError.add("msj", "DHT11 - NaN value temperature or humidity");
      break;
    default:
      Serial.println("Error not found");
      break;
  }

  if (Firebase.setJSON(firebaseData, pathError, jsonError)) {
      Serial.println("SEND ERROR SUCCESS");
      // pause 1 minutes
      delay(1000*60*1);
        
    } else {
        Serial.println("SEND ERROR FAILED");
        Serial.println("REASON: " + firebaseData.errorReason());
        Serial.println("------------------------------------");
        Serial.println();
        delay(1000);
    }
}
