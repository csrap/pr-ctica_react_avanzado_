import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import Button from '../common/Button';
import { ReactComponent as Icon } from '../../assets/ads.svg';
import AuthContext from '../auth/context';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../auth/service';
import { getIsLogged } from '../store/selector';
import { authLogout, authLogoutSession, uiResetError } from '../store/actions';
import { getUi } from '../store/selector';
import { connect } from 'react-redux';

function Header({ onLogout, className }) {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();


  const handleLogout = async () => {
    // logout().then(() => {
    //   dispatch(authLogoutSession());
    await onLogout().then(() => {
      console.log("logout succeed");
    });
  };

  return (
    <>
      <header className={classNames('header', className)}>
        <Link to="/adverts">
          <div className="header-logo">
            <Icon width="32" height="32" />
          </div>
        </Link>
        <nav className="header-nav">
          <Button>
            <NavLink to="/adverts/new">New ADS</NavLink>
          </Button>
          {isLogged ? (
            <Button className="header-button" onClick={handleLogout}>
              {' '}
            Log Out{' '}
            </Button>
          ) : (
            <Button variant="primary"
              className="header-button"
              as={Link}
              to="/login"
            >
              {' '}
            Log In{' '}
            </Button>
          )}
        </nav>
      </header>
    </>
  );
}

const mapStateToProps = state => {
  return getUi(state);
};

const mapDispatchToProps = {
  onLogout: authLogoutSession,
  onResetError: uiResetError,
};

const ConnectedLogoutPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default ConnectedLogoutPage;
