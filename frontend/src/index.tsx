import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Welcome from './welcome/Welcome';
import MyPage from './myPage/MyPage';
import Login from './login/Login';
import Browse from './browse/Browse';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter >
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/browse" component={Browse} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/mypage" component={MyPage} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
