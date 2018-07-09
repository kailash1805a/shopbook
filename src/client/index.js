import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './helpers/store';
import LoginContainer from './components/containers/loginContainer';
import RegisterContainter from './components/containers/RegisterContainer';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={LoginContainer} />
                <Route exact path="/login" component={LoginContainer} />
                <Route exact path="/register" component={RegisterContainter} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root'));
