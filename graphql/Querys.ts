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
    }
  }
`;

export {QUERY_SCRIPTTAGS, QUERY_SHOPID};