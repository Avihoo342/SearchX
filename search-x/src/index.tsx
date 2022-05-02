import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';

if (process.env.NODE_ENV === 'production')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    console.log = () => {};

if(navigator.userAgent.indexOf('MSIE')!==-1
    || navigator.appVersion.indexOf('Trident/') > -1){
} else {
    try {
        ReactDOM.render(

                <BrowserRouter>
                    <App/>
                </BrowserRouter>,
            document.getElementById('root')
        );
    }catch (error){
        alert(error)
    }
}
// If you want your redux to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
