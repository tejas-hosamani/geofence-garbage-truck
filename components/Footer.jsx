import NavLinks from "./NavLinks";
function Footer() {
  return (
    <div>
      <footer className="fooBar">
        <NavLinks />

        <style jsx>{`
          .fooBar {
            background: #ccc;
            padding: 7px 12px;
            background: #457b9d;
          }
        `}</style>
      </footer>
    </div>
  );
}

export default Footer;
