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
    draftOrders(first: 5) {
      edges {
        node {
          id
          email
          name
          createdAt
          completedAt
        }
      }
    }
  }
`;

export {QUERY_SCRIPTTAGS, QUERY_SHOPID, QUERY_DRAFT_ORDERS};