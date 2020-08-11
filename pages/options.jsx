import Link from "next/link";
import Router from "next/router";
import { eraseCookie } from "../lib/CoockieHandler";

function MoreOptions() {
  return (
    <div>
      <h1>More options</h1>
      <Link href="/register-new-truck">
        <a>Register New Truck</a>
      </Link>
      <br />
      <br />
      <a
        className="danger"
        onClick={() => {
          eraseCookie("usageType");
          Router.push("/");
        }}
      >
        Reset memory
      </a>
      <style jsx>{`
        .danger {
          cursor: pointer;
          display: inline-block;
          padding: 12px 15px;
          margin: 5px 10px;
          color: white;
          text-decoration: none;
          background: #e63946ff;

          border-radius: 15px;
          box-shadow: 0 5px 16px -8px #e63946ff;
          align-self: center;
          align-items: center;
        }
        .danger:hover {
          background: #e63946dd;
        }
      `}</style>
    </div>
  );
}

export default MoreOptions;
