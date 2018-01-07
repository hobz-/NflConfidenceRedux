import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import thunkMiddleware from 'redux-thunk';
//import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import GamesContainer from './components/GamesContainer';
import ResultsPage from './components/ResultsPage';
import WeeksDropDown from './components/WeeksDropDown';
import LoginForm from './components/LoginForm';
import ProfilePage from './components/ProfilePage';
import firebase from './components/Firebase';

import rootReducer from './reducers/';
import { fetchResults } from './actions/ResultsActions';
import { fetchPicks } from './actions/PicksActions';
import { fetchGames } from './actions/GamesActions';
import { receiveAuth, fetchUsers } from './actions/AuthActions';

import './App.css';
import 'react-dropdown/style.css';
import 'react-tabs/style/react-tabs.css';

//const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
)

const currentWeek = 16;

class App extends Component {
  componentWillMount() {
    store.dispatch(fetchGames(currentWeek));
    store.dispatch(fetchUsers());
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch(receiveAuth(user))
        store.dispatch(fetchPicks(user, currentWeek));
        store.dispatch(fetchResults(currentWeek));
      }
    })
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div style={styles.mainContent}>
            <LoginForm />
            <Tabs>
              <TabList>
                <Tab>Picks</Tab>
                <Tab>Results</Tab>
                <Tab>Profile</Tab>
              </TabList>
              <WeeksDropDown />
              <TabPanel>
                <GamesContainer />
              </TabPanel>
              <TabPanel>
                <ResultsPage />
              </TabPanel>
              <TabPanel>
                <ProfilePage />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </Provider>
    );
  }
}

const styles = {
    mainContent: {
    marginRight: '40px'
  }
}

export default App;
