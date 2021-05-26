import gql from 'graphql-tag';

const QUERY_SCRIPTTAGS = gql`
  query {
    scriptTags(first: 5) {
      edges {
        node {
          id
          src
          displayScope
        }
      }
    }
  }
`;

const QUERY_SHOPID = gql`
  query {
    shop {
      id
      name
      url
    }
  }
`;

const QUERY_ORDERS = gql`
  query {
  orders(first: 5) {
    edges {
      node {
        id
        confirmed
        createdAt
        subtotalPriceSet {
          shopMoney {
            amount 
            currencyCode
          }
        }
      }
    }
  }
}`;

export {QUERY_SCRIPTTAGS, QUERY_SHOPID, QUERY_ORDERS};