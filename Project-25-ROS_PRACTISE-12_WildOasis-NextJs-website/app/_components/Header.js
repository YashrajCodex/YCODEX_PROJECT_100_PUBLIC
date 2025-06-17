import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';

function Header() {
  return (
    <header className='header-bar'>
      <div className='header-container'>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
