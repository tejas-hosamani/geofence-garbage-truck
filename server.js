const envVars = require("dotenv").config();
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");

const socketPackage = require("socket.io");

if (envVars.error) {
  throw envVars.error;
}

const PORT = parseInt(process.env.PORT, 10) || 80;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  server.get("/json", function (req, res) {
    console.log("GET the json");
    res.status(200).json({ jsonData: true });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const listeningServer = server.listen(PORT, err => {
    if (err) {
      throw err;
    }
    const actualPort = listeningServer.address().port;
    console.info("Express is working on port " + actualPort);
  });

  /** User flow
   * * 1. Opens website
   * * 2. Selects truck
   * * This could be multistep process when scaled - selecting state, district etc
   * * 3. Select one of areas that truck visits/stops
   * * 4. Set radius or leave to default
   *
   * ? Extra: Maybe need two level radius Geofencing.
   * ? One for initial alert and one for smaller radius
   */

  // Socket setup & pass server
  const io = socketPackage(listeningServer);
  io.on("connection", socket => {
    console.info("made socket connection", socket.id);

    // socket.on("subscribe_to_truck", truckId => {
    //   // respond with available areas to select from that truck
    //   socket.join(truckId);
    // });

    // socket.on("message", ({ truckId, message }) => {
    //   socket.to(truckId).emit("message", {
    //     message,
    //     name: "name"
    //   });
    // });

    // socket.on("event1", ({ truckId }) => {
    //   socket.to(truckId).emit("even1", "Someone is even1");
    // });

    // socket.on("event2", ({ truckId }) => {
    //   socket.to(truckId).emit("event2");
    // });

    // socket.on("new_visitor", user => {
    //   console.info("new_visitor", user);
    //   socket.user = user;
    //   socket.emit("new_visitor", "somedata");
    // });

    // Working
    // socket.on("truck_location", function (data) {
    //   console.log(data);
    //   socket.broadcast.emit("truck_location", data);
    // });

    // Subscribe to truck with ID
    socket.on("subscribe_to_truck", ({ truckId }) => {
      socket.join(truckId);
    });

    // Broadcast to only subscribed user
    socket.on("truck_location", function (data) {
      const { truckId } = data;
      socket.to(truckId).broadcast.emit("truck_location", data);
    });

    socket.on("disconnect", function () {
      console.info("user disconnected");
    });

    // socket.on("event3", function (data) {
    //   io.sockets.emit("event3", data);
    // });

    // socket.on("event4", function (data) {
    //   socket.broadcast.emit("event4", data);
    // });
  });
});
