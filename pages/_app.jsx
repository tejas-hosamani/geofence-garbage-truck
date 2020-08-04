import App from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import { getCookie } from "../lib/HandleCookies";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </>
    );
  }
}

export default MyApp;
