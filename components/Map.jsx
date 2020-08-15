import Head from "next/head";
import { useEffect } from "react";

let mymap;
let Leaf;
let truck;
let truckAccuracy;
let selectedLandmark;
function Map({ selectedLocation, truckLocation, stopList }) {
  const runOnClient = () => {
    // eslint-disable-next-line no-undef
    Leaf = L;
    mymap = Leaf.map("mapid", {
      center: [51.505, -0.09],
      zoom: 13,
      minZoom: 20,
    });
    Leaf.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
      foo: "bar",
      // attribution:
      //   'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>
      // contributors,
      // <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',

      attribution: "",
    }).addTo(mymap);

    const myIcon = Leaf.icon({
      iconUrl: "/icons/garbage-truck-icon.png",
      iconSize: [45.5, 21.5],
      iconAnchor: [22.75, 10.75],
      popupAnchor: [-3, -76],
      // shadowUrl: 'my-icon-shadow.png',
      shadowSize: [68, 95],
      shadowAnchor: [22, 94],
    });

    selectedLandmark = Leaf.marker([
      selectedLocation.latitude,
      selectedLocation.longitude,
    ]).addTo(mymap);

    truck = Leaf.marker(
      [
        truckLocation.latitude || selectedLocation.latitude,
        truckLocation.longitude || selectedLocation.longitude,
      ],
      { icon: myIcon }
    ).addTo(mymap);
    truckAccuracy = Leaf.circle(
      [
        truckLocation.latitude || selectedLocation.latitude,
        truckLocation.longitude || selectedLocation.longitude,
      ],
      { radius: 50 }
    ).addTo(mymap);

    stopList.map(stop => {
      Leaf.circleMarker([stop.latitude, stop.longitude], {
        radius: 15,
        color: "red",
      })
        .bindTooltip(stop.areaName)
        .addTo(mymap);
    });
  };

  useEffect(() => {
    runOnClient();
  }, []);

  useEffect(() => {
    mymap.setView([selectedLocation.latitude, selectedLocation.longitude], 18);
    if ("remove" in selectedLandmark) {
      selectedLandmark.remove();
    }
    selectedLandmark = Leaf.marker([
      selectedLocation.latitude,
      selectedLocation.longitude,
    ]).addTo(mymap);
  }, [selectedLocation]);

  useEffect(() => {
    truck.setLatLng([
      truckLocation.latitude || selectedLocation.latitude,
      truckLocation.longitude || selectedLocation.longitude,
    ]);

    truckAccuracy
      .setLatLng([
        truckLocation.latitude || selectedLocation.latitude,
        truckLocation.longitude || selectedLocation.longitude,
      ])
      .setRadius(truckLocation.accuracy || 1);
  }, [truckLocation]);

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          // eslint-disable-next-line max-len
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossOrigin=""
        />

        <script
          src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
          // eslint-disable-next-line max-len
          integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
          crossOrigin=""
        ></script>
      </Head>

      <div id="mapid"></div>
      <style jsx>{`
        #mapid {
          height: 65vh;
        }
      `}</style>
    </div>
  );
}

export default Map;
