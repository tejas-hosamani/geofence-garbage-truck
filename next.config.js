/* eslint-disable indent */
const withPWA = require("next-pwa");

module.exports =
  process.env.NODE_ENV === "development"
    ? {}
    : withPWA({
        pwa: {
          dest: "public",
        },
      });
