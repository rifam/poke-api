import React from "react";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import { Route, Switch } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';


const App = () => (
  <Switch>
    <Route exact path="/" render={(props) => <Pokedex {...props} />} />
    <Route
      exact
      path="/:pokemonId"
      render={(props) => <Pokemon {...props} />}
    />
  </Switch>
);

export default App;