import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

import App from "./App";
const Users = () => {
  return <p>Users</p>;
};
const Contact = () => {
  return <p>Contact</p>;
};
const Notfound = () => {
  return <p>Notfound</p>;
};

const routing = (
  <Router>
    <div>
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul> */}
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/users" component={Users} />
        <Route path="/contact" component={Contact} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
registerServiceWorker();
