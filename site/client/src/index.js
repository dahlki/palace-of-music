import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//Containers
import Home from './containers/Home';
import Homepage from './containers/Homepage';
import ComposersContainer from "./containers/ComposersContainer";
import Composers from './components/Composers';
import Tickets from './components/Tickets';
import MuseumMap from './components/Map';
import Music from './components/Music';
import MembersContainer from './containers/MembersContainer';

import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRedirect, IndexRoute, hashHistory } from 'react-router';
import store from './store.js';

import { getComposersByPeriod } from './reducers/composers-reducer'
import { retrieveVisitors } from './reducers/visitors-reducer'

const onPeriodEnter = (nextRouterState) => {
  store.dispatch(
    getComposersByPeriod(nextRouterState.params.period)
  )
}
const onMembersEnter =() => {
  store.dispatch(
    retrieveVisitors()
  )
}

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path="/" component={ Home }>
        <IndexRedirect to="/palace-of-music" />
        <Route path="/palace-of-music" component={ Homepage }/>
        <Route path="/period" component={ ComposersContainer } />
        <Route path="/period/:period" component={ ComposersContainer } onEnter={onPeriodEnter}/>
        <Route path="/museum/tickets" component={ Tickets } />
        <Route path="/museum/map" component={ MuseumMap } />
        <Route path="/museum/music" component={ Music } />
        <Route path="/museum/members" component={ MembersContainer } onEnter={onMembersEnter}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
