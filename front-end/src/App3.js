import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from "graphql-tag";

import { ApolloProvider } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://countries.trevorblades.com/graphql'
})

const client = new ApolloClient({
  cache,
  link
})

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/countries" component={Countries} />
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}


function Country({ match }) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Countries({ match }) {
  return (
    <div>
      <h2>Countries</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Country} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a country.</h3>}
      />
    </div>
  );
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/countries">Countries</Link>
      </li>
    </ul>
  );
}

export default App;
