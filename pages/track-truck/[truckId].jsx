import openSocket from "socket.io-client";
import { useEffect, useState } from "react";
import Map from "../../components/Map";

const TruckInfo = {
  truckNumber: "TRACK",
  driverName: "Driver Full Name",
  areaCode: "580007",
  areaName: "Kalyan Nagar",
  trackChannel: 465,
  stopLists: [
    {
      id: 0,
      longitude: 74.99597,
      latitude: 15.44171,
      areaName: "6th Cross - Library",
    },
    {
      id: 1,
      longitude: 74.99663,
      latitude: 15.44174,
      areaName: "6th Cross - post office",
    },
    {
      id: 2,
      longitude: 74.99704,
      latitude: 15.44051,
      areaName: "6th Cross - Water tank",
    },
  ],
};

let newSocket;

function TrackTruckWithId({ truckId }) {
  const [truckLocation, setTruckLocation] = useState([]);
  const [distance, setDistance] = useState(1000);
  const [selectedLocation, setSelectedLocation] = useState(
    TruckInfo.stopLists[0]
  );

  useEffect(() => {
    newSocket = openSocket(
      process.env.NEXT_PUBLIC_SERVER_URI ||
        "https://geofence-garbage-truck.herokuapp.com/"
    );

    if (truckId) {
      newSocket.emit("subscribe_to_truck", {
        truckId,
      });
    }
  }, []);

  useEffect(() => {
    newSocket.on("truck_location", location => {
      setTruckLocation([location, ...truckLocation]);
      const { latitude, longitude } = location;

      const myLongitude = selectedLocation.longitude || 74.99597;
      const myLatitude = selectedLocation.latitude || 15.44171;

      const R = 6371e3; // metres
      const φ1 = (latitude * Math.PI) / 180; // φ, λ in radians
      const φ2 = (myLatitude * Math.PI) / 180;
      const Δφ = ((myLatitude - latitude) * Math.PI) / 180;
      const Δλ = ((myLongitude - longitude) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const d = parseFloat(R * c).toFixed(2); // in metres

      setDistance(d);
    });
  }, [selectedLocation]);

  const selectArea = e => {
    setSelectedLocation(TruckInfo.stopLists[e.target.value]);
  };

  return (
    <div className="container">
      {/* <h1>Track truck with ID: {truckId}</h1> */}
      <h3 className="h3">Select a place nearby:</h3>
      <div className="dropdown-container">
        <select
          onChange={selectArea}
          value={selectedLocation.id}
          className="select-css"
        >
          {TruckInfo.stopLists.map(loc => {
            return (
              <option key={loc.id} value={loc.id}>
                {loc.areaName}
              </option>
            );
          })}
        </select>
      </div>
      Distance from truck: {distance}m
      <br />
      <br />
      <div className="dropdown-container">
        <Map
          selectedLocation={selectedLocation}
          truckLocation={truckLocation.length ? truckLocation[0] : {}}
          stopList={TruckInfo.stopLists.length ? TruckInfo.stopLists : []}
        />
      </div>
      <style jsx>{`
        .container {
          // overflow: scroll;
          display: flex;
          flex-direction: column;
          text-align: center;
          height: calc(100vh - 63px);
          // justify-content: center;
        }

        .h3 {
          margin: 0px;
          margin-top: 10px;
        }

        .dropdown-container {
          width: calc(100% - 15px);
          margin: 10px auto;
          position: relative;
        }
        @media only screen and (min-width: 600px) {
          .dropdown-container {
            width: 450px;
          }
        }
        .select-css {
          display: block;
          font-size: 16px;
          font-family: sans-serif;
          font-weight: 700;
          color: #444;
          line-height: 1.3;
          padding: 0.6em 1.4em 0.5em 0.8em;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          margin: 0;
          border: 1px solid #aaa;
          box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
          border-radius: 0.5em;
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
          background-color: #fff;
          background-image: url("/icons/down-arrow.svg"),
            linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
          background-repeat: no-repeat, repeat;
          background-position: right 0.7em top 50%, 0 0;
          background-size: 0.65em auto, 100%;
        }
        .select-css::-ms-expand {
          display: none;
        }
        .select-css:hover {
          border-color: #888;
        }
        .select-css:focus {
          border-color: #aaa;
          box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
          box-shadow: 0 0 0 3px -moz-mac-focusring;
          color: #222;
          outline: none;
        }
        .select-css option {
          font-weight: normal;
        }
      `}</style>
    </div>
  );
}

TrackTruckWithId.getInitialProps = context => {
  return context.query;
};

export default TrackTruckWithId;
