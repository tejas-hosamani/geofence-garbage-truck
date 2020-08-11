import Link from "next/link";

function NavLinks() {
  return (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/options">
        <a>Options</a>
      </Link>
      <Link href="/help">
        <a>Help</a>
      </Link>
      <style jsx>{`
        a {
          color: white;
          text-decoration: none;
          // background: #f00;
          padding: 5px 10px;
          margin: 0 4px;
        }
        a:hover {
          color: #a8dadc;
        }
      `}</style>
    </>
  );
}

export default NavLinks;
