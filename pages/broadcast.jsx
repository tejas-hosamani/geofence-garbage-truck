import { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import useInterval from "../lib/useInterval";
import { setLocalStorage } from "../lib/localStorage";

const broadCastFreq = process.env.NEXT_PUBLIC_BROADCAST_FREQUENCY || 5;

function broadcast() {
  const [isGeoLocationSupported, setIsGeoLocationSupported] = useState(false);
  const [enableBroadcast, setEnableBroadcast] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const [socket, setSocket] = useState({});
  // const [currentHaltPoint, setCurrentHaltPoint] = useState({});

  // const areCoordsEqual = (coord1, coord2) => {
  //   if (locationData.length < 4) {
  //     return false;
  //   }

  //   if (
  //     typeof coord1.coords === "undefined" ||
  //     typeof coord2.coords === "undefined"
  //   ) {
  //     return false;
  //   }
  //   return (
  //     coord1.coords.longitude === coord2.coords.longitude &&
  //     coord1.coords.latitude === coord2.coords.latitude
  //   );
  // };

  // const checkForHaltPoint = () => {
  //   const checkLength = 4;
  //   const initCondition = locationData.length > checkLength;

  //   let currentNode = initCondition ? locationData[0] : {};

  //   if (initCondition && !areCoordsEqual(currentHaltPoint, currentNode)) {
  //     for (let i = 1; i < checkLength; i++) {
  //       if (areCoordsEqual(currentNode, locationData[i])) {
  //         currentNode = {
  //           coords: {
  //             latitude: locationData[i].coords.latitude,
  //             longitude: locationData[i].coords.longitude,
  //           },
  //         };
  //       } else {
  //         return;
  //       }
  //     }
  //     // Store in local storage
  //     setCurrentHaltPoint({
  //       coords: {
  //         latitude: currentNode.coords.latitude,
  //         longitude: currentNode.coords.longitude,
  //       },
  //     });

  //     const tempHaltPoints = getLocalStorage("truckHaltPoints") || [];
  //     tempHaltPoints.push({ ...currentNode });
  //     setLocalStorage("truckHaltPoints", tempHaltPoints);
  //   }
  // };

  const requestWakeLock = async () => {
    try {
      navigator.wakeLock.request("screen").then(lock => {
        setTimeout(() => lock.release(), 2 * 60 * 60 * 1000);
      });
    } catch (err) {
      // the wake lock request fails - usually system related, such low as battery

      console.error(`${err.name}, ${err.message}`);
    }
  };

  useInterval(
    () => {
      getLocation();
      // checkForHaltPoint();
    },
    enableBroadcast ? broadCastFreq * 1000 || 5000 : null
  );

  useEffect(() => {
    setIsGeoLocationSupported("geolocation" in navigator);
    if (!socketConnected) {
      setSocketConnected(true);
      const newSocket = openSocket(
        process.env.NEXT_PUBLIC_SERVER_URI ||
          "https://geofence-garbage-truck.herokuapp.com/"
      );
      setSocket(newSocket);

      console.info("2st UseEffect");
    }
  }, []);

  const geoLocationSuccess = position => {
    const getTenResults = [position, ...locationData];
    if (getTenResults.length > 5) {
      getTenResults.pop();
    }

    socket.emit("truck_location", {
      truckId: 465,
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
      accuracy: position.coords.accuracy,
      heading: position.coords.heading,
      speed: position.coords.speed,
    });

    setLocationData([...getTenResults]);
  };

  const geoLocationError = error => {
    console.error("There was an error", error);
  };

  const options = {
    enableHighAccuracy: true,
    maximumAge: 10,
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      geoLocationSuccess,
      geoLocationError,
      options
    );
  };

  if (typeof window !== "object") {
    return <h1>Please wait...</h1>;
  }

  if (!isGeoLocationSupported) {
    return <h1>Not supported</h1>;
  }

  return (
    <div>
      <h1>Broadcast</h1>
      <br />
      <p>
        <small>
          <em>STATUS:</em>
        </small>
      </p>
      <p className="statusText">{enableBroadcast ? "ON" : "OFF"} </p>
      <br />
      <br />
      <a
        className={enableBroadcast ? "danger" : ""}
        onClick={() => {
          setEnableBroadcast(!enableBroadcast);
          if (!enableBroadcast) {
            requestWakeLock();
            // navigator.geolocation.getCurrentPosition(
            //   position => {
            //     // setCurrentHaltPoint({
            //     //   coords: {
            //     //     latitude: position.coords.latitude,
            //     //     longitude: position.coords.longitude,
            //     //   },
            //     // });
            //     // setLocalStorage("truckHaltPoints", [
            //     //   {
            //     //     coords: {
            //     //       latitude: position.coords.latitude,
            //     //       longitude: position.coords.longitude,
            //     //     },
            //     //   },
            //     // ]);
            //   },
            //   geoLocationError,
            //   options
            // );
          }
        }}
      >
        {enableBroadcast ? "STOP" : "START"}
      </a>
      <br />
      {enableBroadcast ? <p>Leave the application open</p> : ""}

      <style jsx>{`
        table {
          overflow-x: auto;
          border-collapse: collapse;
          border-spacing: 0;
          width: 100%;
          border: 1px solid #1d3557;
        }

        th,
        td {
          text-align: left;
          padding: 8px;
        }
        a {
          cursor: pointer;
          display: inline-block;
          padding: 12px 15px;
          margin: 5px 10px;
          color: white;
          text-decoration: none;
          background: #1d3557;
          border-radius: 15px;
          box-shadow: 0 5px 16px -8px #1d3557;
          align-self: center;
          align-items: center;
          padding: 30px;
          font-size: 30px;
        }
        a:hover {
          background: #457b9d;
        }
        .danger {
          background: #e63946ff;
        }
        .danger:hover {
          background: #ff5984;
        }
        .statusText {
          font-size: 40px;
          margin: 5px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default broadcast;
