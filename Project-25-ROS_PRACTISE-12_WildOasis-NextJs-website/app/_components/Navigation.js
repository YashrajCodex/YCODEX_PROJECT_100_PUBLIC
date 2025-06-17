import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="main-nav">
  <ul className="nav-list">
    <li>
      <Link href="/cabins" className="nav-link">Cabins</Link>
    </li>
    <li>
      <Link href="/about" className="nav-link">About</Link>
    </li>
    <li>
      <Link href="/account" className="nav-link">Guest area</Link>
    </li>
  </ul>
</nav>
  );
}
