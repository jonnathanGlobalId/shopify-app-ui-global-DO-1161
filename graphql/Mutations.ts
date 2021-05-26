import gql from 'graphql-tag';

const CREATE_SCRIPT_TAG = gql`
  mutation scriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      scriptTag {
        id 
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const DELETE_SCRIPTTAG = gql`
  mutation scriptTagDelete($id: ID!) {
    scriptTagDelete(id: $id) {
      deletedScriptTagId
        userErrors {
          field
          message
      }
    }
  }
`;

export {CREATE_SCRIPT_TAG, DELETE_SCRIPTTAG};