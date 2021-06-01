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
      myshopifyDomain
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

const QUERY_DRAFT_ORDERS = gql`
  query {
    draftOrders(first: 5) {
      edges {
        node {
          id
          email
          name
        }
      }
    }
  }
`;

export {QUERY_SCRIPTTAGS, QUERY_SHOPID, QUERY_ORDERS, QUERY_DRAFT_ORDERS};