import Link from "next/link";
function selectTruck() {
  return (
    <div>
      <h1>Select a truck to track</h1>
      1.{" "}
      <Link href="/track-truck/22">
        <button>Track</button>
      </Link>{" "}
      - Truck ID 22
      <br />
      <br />
      2.{" "}
      <Link href="/track-truck/23">
        <button>Track</button>
      </Link>{" "}
      - Truck ID 23
    </div>
  );
}

export default selectTruck;
