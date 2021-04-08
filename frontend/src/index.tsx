import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Welcome from './welcome/Welcome';
import MyPage from './myPage/MyPage';
import Login from './login/Login';
import Browse from './browse/Browse';
import Stats from './stats/Stats';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, Reducer, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Action, State } from "./store/types";
import {
  eventsReducer,
  orgsReducer,
  categoriesReducer,
  equipmentReducer,
  getCurrentUserReducer,
  signUpsReducer,
  starredReducer,
  myActivitiesReducer,
  statsReducer
} from "./store/reducers";
import 'semantic-ui-css/semantic.min.css'

// reducers used in store
const allReducers: Reducer<State, Action> = combineReducers({
  eventsReducer,
  orgsReducer,
  categoriesReducer,
  equipmentReducer,
  getCurrentUserReducer,
  starredReducer,
  signUpsReducer,
  myActivitiesReducer,
  statsReducer,
});

// redux store
export const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/browse" component={Browse} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/admin" component={Stats} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') || document.createElement("div") //for testing purposes
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
