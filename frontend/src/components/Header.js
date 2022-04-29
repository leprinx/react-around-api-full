import { NavLink, useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation();
  let textContent = '';

  const returnText = () => {
    if (location.pathname === '/signup') {
      textContent = 'Log In';
      return '/signin';
    }
    if (location.pathname === '/signin') {
      textContent = 'Sign Up';
      return '/signup';
    }
    if (location.pathname === '/') {
      textContent = 'Log Out';
      return '/signin';
    } return '/signin';
  };

  const isEmail = () => {
    if (props.userEmail != null && props.userEmail !== undefined) {
      return props.userEmail;
    } return '';
  };
  return (
    <header className={props.containerClass}>
      <img src={props.vector} alt='Around the US' className={props.logoClass} />
      <div className='header__state-container'>
        <p className='header__state'></p>
        <NavLink
          className='header__state'
          to={returnText()}
          onClick={props.isLoggedIn && props.logout}
        >{`${isEmail()} ${textContent}`}</NavLink>
      </div>
    </header>
  );
}

export default Header;
