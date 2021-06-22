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
      myshopifyDomain
    }
  }
`;

const QUERY_DRAFT_ORDERS = gql`
  query {
    draftOrders(first: 250, query: "OPEN") {
      edges {
        node {
          id
          email
          name
          createdAt
          completedAt
          status
        }
      }
    }
  }
`;

const QUERY_ORDERS = gql `
  query {
    orders(first: 250, query: "UNFULFILLED") {
      edges {
        node {
          displayFulfillmentStatus
          email
          name
          id
          createdAt
        }
      }
    }
  }
`;

const QUERY_LOCATION = gql`
  query {
    locations(first: 5) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

export {QUERY_SCRIPTTAGS, QUERY_SHOPID, QUERY_DRAFT_ORDERS, QUERY_ORDERS, QUERY_LOCATION};