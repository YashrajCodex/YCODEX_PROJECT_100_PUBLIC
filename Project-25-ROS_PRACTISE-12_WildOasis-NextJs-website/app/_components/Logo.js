import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <Link href="/" className="logo-link">
  <Image
    src="/logo.png"
    height="60"
    width="60"
    quality={100}
    alt="The Wild Oasis logo"
  />
  <span className="logo-text">The Wild Oasis</span>
</Link>

  );
}

export default Logo;
