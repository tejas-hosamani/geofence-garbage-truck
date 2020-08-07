import App from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
// import { getCookie } from "../lib/HandleCookies";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta charset="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            // eslint-disable-next-line max-len
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta
            name="description"
            content="Garbage truck tracking and geofencing"
          />
          <meta name="keywords" content="Geofence" />
          <title>Geogar</title>

          <link rel="manifest" href="/manifest.json" />
          <link
            href="/icons/favicon-16x16-dunplab-manifest-13907.jpg"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/icons/favicon-32x32-dunplab-manifest-13907.jpg"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-icon-180x180-dunplab-manifest-13907.jpg"
          ></link>
          <meta name="theme-color" content="#317EFB" />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </>
    );
  }
}

export default MyApp;
