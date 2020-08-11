import { setCookie } from "./CoockieHandler";
import Router from "next/router";

export const handleRoute = ROUTE => {
  switch (ROUTE) {
    case "track-truck":
      setCookie("usageType", ROUTE, 30);
      Router.push(ROUTE);
      break;
    case "broadcast":
      setCookie("usageType", ROUTE, 30);
      Router.push(ROUTE);
      break;

    default:
      break;
  }
};
