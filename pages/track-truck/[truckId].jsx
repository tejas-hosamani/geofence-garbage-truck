import openSocket from "socket.io-client";
import { useEffect, useState } from "react";

function TrackTruckWithId({ truckId }) {
  const [truckLocation, setTruckLocation] = useState([]);
  const [distance, setDistance] = useState(1000);

  useEffect(() => {
    const newSocket = openSocket(
      process.env.NEXT_PUBLIC_SERVER_URI ||
        "https://geofence-garbage-truck.herokuapp.com/"
    );

    if (truckId) {
      newSocket.emit("subscribe_to_truck", {
        truckId,
      });
    }

    newSocket.on("truck_location", location => {
      setTruckLocation([location, ...truckLocation]);
      const { latitude, longitude } = location;
      const myLatitude = 15.44177;
      const myLongitude = 74.99663;
      const R = 6371e3; // metres
      const φ1 = (latitude * Math.PI) / 180; // φ, λ in radians
      const φ2 = (myLatitude * Math.PI) / 180;
      const Δφ = ((myLatitude - latitude) * Math.PI) / 180;
      const Δλ = ((myLongitude - longitude) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const d = R * c; // in metres
      setDistance(d);
    });
  }, []);

  return (
    <div>
      <h1>Track truck with ID: {truckId}</h1>
      Current Truck location:
      {truckLocation.length ? truckLocation[0].longitude : " Loading..."}
      <br />
      <br />
      Distance: {distance}m
      <br />
      <br />
    </div>
  );
}

TrackTruckWithId.getInitialProps = context => {
  return context.query;
};

export default TrackTruckWithId;
