import Link from "next/link";
function selectTruck() {
  const TruckList = [
    {
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
    },
  ];
  return (
    <div>
      <h1>Select a truck to track</h1>
      <div className="listContainer">
        {TruckList.map((truck, index) => {
          return (
            <div key={index}>
              {`${index + 1}. `}
              {`${truck.areaName} - `}
              <Link href={`/track-truck/${truck.trackChannel}`}>
                <a className="button">{truck.truckNumber}</a>
              </Link>{" "}
              <br />
            </div>
          );
        })}
        <p>
          <small>
            <em>
              More coming soon.. <br />
              ..if enough people use it.
            </em>
          </small>
        </p>
      </div>
      <br />
      <br />
      <style jsx>{`
        .listContainer {
          text-align: left;
          justify-content: center;
          max-width: 600px;
          margin: 0 auto;
          padding: 10px;
        }
        .listContainer > div {
          margin: 5px;
          padding: 10px 0px;
        }
        .button {
          padding: 8px 15px;
          background: #39e683;
          text-decoration: none;
          color: black;
          border-radius: 10px;
          box-shadow: 0 5px 16px -8px #000;
        }
      `}</style>
    </div>
  );
}

export default selectTruck;
