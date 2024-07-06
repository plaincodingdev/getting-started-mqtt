const mqtt = require("mqtt");

var client;
const topic = "temperature";
const brokerUrl = `mqtt://127.0.0.1:1883`;
const clientOptions = {
  keepalive: 60,
  clientId: "subscriberUniqueClientId",
  protocolId: "MQTT",
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
}; // Client options for connecting to the broker

function connectToBroker() {
  client = mqtt.connect(brokerUrl, clientOptions);

  client.on("error", (err) => {
    console.log("Error: ", err);
    client.end();
  });

  client.on("connect", () => {
    console.log("Client connected to broker");
  });
}

function subscribeToTopic() {
  client.subscribe(topic, (err) => {
    if (!err) {
      // Subscribe to the topic
      client.on("message", (topic, message) => {
        //  Message is of type Buffer and needs to be converted into a string
        console.log(
          `Received message: ${message.toString()} from topic: ${topic}`
        );
      });
    } else {
      console.log(`Error subscribing to topic: ${topic}`);
    }
  });
}

connectToBroker();

subscribeToTopic();
