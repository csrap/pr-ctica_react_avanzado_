import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom';
import AnnouncementsPage from './components/ads/AnnouncementsPage/AnnouncementsPage';
import NewAdsPage from './components/ads/NewAdsPage/NewAdsPage'
import PrivateRoute from './components/auth/PrivateRoute'


import LoginPage from './components/auth/LoginPage'
import { useState } from 'react';
import { logout } from './components/auth/service';


import AdsDetails from './components/ads/AdPage/AdsDetails';


function App() {
  // const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  // const handleLogin = () => {
  //   setIsLogged(true);
  // };

  // const handleLogout = () => {
  //   logout().then(() => setIsLogged(false));
  // };

  return (
    <div className="app" >
      {
        <Switch>
          <Route path="/login">
            {routeProps => <LoginPage {...routeProps} />}
          </Route>
          <PrivateRoute path="/adverts/new" component={NewAdsPage} />
          <PrivateRoute path="/adverts/:id" component={AdsDetails} />
          <PrivateRoute path="/adverts" component={AnnouncementsPage} />
          <Route exact path="/">
            <Redirect to="/adverts" />
          </Route>
          <Route>
            <div> 404 Found Page</div>
          </Route>
        </Switch>
      }
    </div>

  );
}

export default App;
