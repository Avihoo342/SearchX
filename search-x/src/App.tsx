import React from 'react';
import { CssBaseline } from '@material-ui/core';
import {Redirect, Route, Switch} from "react-router-dom";
import './App.css';
import GoogleSearch from "./containers/Search/GSearch";

function App() {
  return (
      <>
        <CssBaseline/>
        <Switch>
          <Route path="/" element={GoogleSearch}>
            <GoogleSearch/>
          </Route>
          <Redirect
              to={{
                pathname: '/cards',
              }}
          />
        </Switch>
      </>
  );
}

export default App;
