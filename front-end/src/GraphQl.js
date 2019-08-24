import React from 'react';
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



  function Countries({ match }) {
      const { loading, error, data } = useQuery(gql`
        {
          countries {
            name
            code
            languages {
              name
            }
            continent {
              name
            }
          }
        }
      `);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
        return (
          <div>
          <Route path={`/countries/:id`} component={Country} />
          <Route
            exact
            path={`/countries/:id`}
            render={() => <h3>Please select a country.</h3>}
          />
            {
              data.countries.map(({name, code, currency, languages, continent}, i) => (
                <div key={i} className="card">
                  <div className="card-body">
                    <h1><Link to={`/countries/${code}`}>{name}</Link></h1>
                    <p>Languages: {languages.map(({name}, j) => <span key={j}>{name}, </span>)}</p>
                    <p>Continent: {continent.name}</p>
                  </div>
                </div>
              ))
            }

          </div>

        );
    }

  function Country({ match }) {
    const { loading, error, data } = useQuery(gql`
      {
      	country(code:"${match.params.id}"){
          name
          currency
          phone
        }
      }
    `);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
      <div>
        <div>Selected country name: { data.country.name }</div>
        <div>Selected country currency: { data.country.currency }</div>
        <div>Selected country phone: { data.country.phone }</div>
      </div>
    );
  }

  const App2 = () => (
    <ApolloProvider client={client}>
      <div>
        <h2>Countries</h2>
        {<Countries />}
      </div>
    </ApolloProvider>
  );

  export default App2;
