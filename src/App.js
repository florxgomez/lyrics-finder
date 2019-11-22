import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './context';
import NavBar from './components/layout/NavBar';
import Index from './components/layout/Index';
import Lyrics from './components/tracks/Lyrics';
import './App.css';

function App() {
  return (
    <Provider>
      <Router basename={process.env.PUBLIC_URL}>
        <Fragment>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/lyrics/track/:id" component={Lyrics} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
