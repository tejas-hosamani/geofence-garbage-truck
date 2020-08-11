import NavLinks from "./NavLinks";

function Header() {
  return (
    <div>
      <nav className="navBar">
        <NavLinks />
      </nav>
      <div className="headerSpace"></div>
      <style jsx>{`
        .navBar {
          position: fixed;
          width: 100%;
          background: #ccc;
          padding: 7px 12px;
          background: #457b9d;
        }
        .navBar a {
          color: white;
          text-decoration: none;
          // background: #f00;
          padding: 5px 10px;
          margin: 0 4px;
        }
        .navBar a:hover {
          color: #a8dadc;
        }
        .headerSpace {
          height: 32px;
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: #f1faee;
          font-family: Roboto;
          letter-spacing: 2px;
        }
      `}</style>
    </div>
  );
}

export default Header;
