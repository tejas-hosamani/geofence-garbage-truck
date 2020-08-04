// import openSocket from "socket.io-client";
import { useEffect } from "react";
import Link from "next/link";

// const socket = openSocket("http://localhost:5050");

function Home() {
  useEffect(() => {
    // const visitor = {
    //   ip: "geoplugin_request",
    //   city: "geoplugin_city",
    //   state: "geoplugin_region",
    // };
    // socket.emit("new_visitor", visitor);
    // socket.on("visitors", visitors => {
    //   this.setState({
    //     visitors,
    //   });
    // });
  }, []);
  return (
    <div>
      <h1>Hi there</h1>
      <Link href="/select-truck">
        <a>Select Truck</a>
      </Link>

      <Link href="/track-truck">
        <a>Track Truck</a>
      </Link>

      <Link href="/register-new-truck">
        <a>Register New Truck</a>
      </Link>
      <style jsx>{`
        a {
          display: inline-block;
          padding: 5px 12px;
          margin: 5px 10px;
          color: white;
          text-decoration: none;
          background: #06f;
        }
      `}</style>
    </div>
  );
}

export default Home;
