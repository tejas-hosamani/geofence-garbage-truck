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
    if (getTenResults.length > 50) {
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
      <button
        onClick={() => {
          setEnableBroadcast(!enableBroadcast);
          if (!enableBroadcast) {
            requestWakeLock();
            navigator.geolocation.getCurrentPosition(
              position => {
                // setCurrentHaltPoint({
                //   coords: {
                //     latitude: position.coords.latitude,
                //     longitude: position.coords.longitude,
                //   },
                // });
                setLocalStorage("truckHaltPoints", [
                  {
                    coords: {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                    },
                  },
                ]);
              },
              geoLocationError,
              options
            );
          }
        }}
      >
        Toggle Enable Broadcast
      </button>{" "}
      &nbsp;: {enableBroadcast ? "Enabled" : "Disabled"}
      <br />
      <br />
      <div
        style={{
          overflowX: "auto",
        }}
      >
        <table>
          <tbody>
            <tr>
              <th>longitude</th> {/* decimal degrees */}
              <th>latitude</th> {/* decimal degrees */}
              <th>accuracy</th> {/* In meters */}
              <th>altitude</th>
              <th>altitudeAccuracy</th>
              <th>heading</th>
              {/*  the direction in which the device is traveling. 
                  Zero degrees represents true true north, and the direction is determined 
                  clockwise (which means that east is 90 degrees and west is 270 degrees). 
              */}
              <th>speed</th> {/* meters per second */}
              <th>timestamp</th>
            </tr>
            {locationData.map(location => {
              return (
                <tr key={Math.random()}>
                  <td>{location.coords.longitude}</td>
                  <td>{location.coords.latitude}</td>
                  <td>{location.coords.accuracy}</td>
                  <td>{location.coords.altitude}</td>
                  <td>{location.coords.altitudeAccuracy}</td>
                  <td>{location.coords.heading}</td>
                  <td>{location.coords.speed}</td>
                  <td>{location.timestamp}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
        button {
          display: inline-block;
          padding: 5px 12px;
          margin: 5px 10px;
          color: white;
          text-decoration: none;
          background: #1d3557;
        }
      `}</style>
    </div>
  );
}

export default broadcast;
