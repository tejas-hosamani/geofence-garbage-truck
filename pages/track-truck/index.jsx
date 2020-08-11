import Link from "next/link";
function selectTruck() {
  const TruckList = [
    {
      truckNumber: "3k23",
      driverName: "Driver Full Name",
      areaCode: "580007",
      areaName: "Kalyan Nagar",
      trackChannel: 465,
      stopLists: [
        {
          longitude: 74.99663,
          latitude: 15.44174,
          areaName: "6th Cross",
        },
        {
          longitude: 74.99704,
          latitude: 15.44051,
          areaName: "Water tank",
        },
      ],
    },
    {
      truckNumber: "4k13",
      driverName: "Driver Full Name",
      areaCode: "580001",
      areaName: "Saptapur",
      trackChannel: 484,
      stopLists: [
        {
          longitude: 43.0,
          latitude: 43.0,
          areaName: "Saptapur Cross",
        },
        {
          longitude: 53.0,
          latitude: 53.0,
          areaName: "University Road",
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
              <Link href={`/track-truck/${truck.trackChannel}`}>
                <a className="button">{truck.truckNumber}</a>
              </Link>{" "}
              {`- ${truck.areaName}`}
              <br />
            </div>
          );
        })}
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
          padding: 5px 10px;
        }
      `}</style>
    </div>
  );
}

export default selectTruck;
