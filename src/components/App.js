import "./App.css";
import {BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import Event from "./Event";
import Error404 from "./Error404"
import Error500 from "./Error500"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route component={Error404} />
          <Route path="/:id" exact component={Event} />
          <Route path="/error/500" exact component={Error500} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
