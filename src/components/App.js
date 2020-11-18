import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import Event from "./Event";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/:id" exact component={Event} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
