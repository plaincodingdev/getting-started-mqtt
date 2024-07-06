const mqtt = require("mqtt");

var client;
const topic = "temperature";
const brokerUrl = `mqtt://127.0.0.1:1883`;
const clientOptions = {
  keepalive: 60,
  clientId: "publisherUniqueClientId",
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

function publishMessage() {
  //  Publish a message every 3 seconds
  setInterval(() => {
    const temperature = (Math.random() * 100).toFixed(2);
    client.publish(topic, temperature.toString());
    console.log(`Sent temperature: ${temperature} on topic: ${topic}`);
  }, 3000);
}

connectToBroker();

publishMessage();
