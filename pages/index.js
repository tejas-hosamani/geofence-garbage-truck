import { getCookie } from "../lib/CoockieHandler";

import { useEffect } from "react";
import { handleRoute } from "../lib/handleRouteAndCookie";

function Home() {
  useEffect(() => {
    const usageCookie = getCookie("usageType");
    if (usageCookie) {
      handleRoute(usageCookie);
    }
  }, []);

  return (
    <div className="container">
      <div>
        <h2>Why do you want to use this app?</h2>
        <a onClick={() => handleRoute("track-truck")}>TRACK TRUCK</a>
        <br />
        <br />
        OR
        <br />
        <br />
        <strong style={{ color: "#f00", letterSpacing: 1 }}>
          Only for truck drivers
        </strong>{" "}
        <br />
        <a onClick={() => handleRoute("broadcast")}>BROADCAST TRUCK LOCATION</a>
        <br />
      </div>

      <style jsx>{`
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
        }
        a:hover {
          background: linear-gradient(180deg, #1d3557, #457b9d);
        }
        .container {
          // overflow: scroll;
          display: flex;
          flex-direction: column;
          text-align: center;
          height: calc(100vh - 63px);
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
