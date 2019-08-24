import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { render } from 'react-dom';
import App2 from './GraphQl';

function Index() {
  return (
    <h2>Home</h2>
  )
}

function Countries() {
  return <App2 />
}

function Users() {
  return <h2>Users</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/countries/">Countries</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/countries/" component={Countries} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  );
}

export default AppRouter;
