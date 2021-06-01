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

const ACCEPT_DRAFT_ORDER = gql`
  mutation draftOrderComplete($input: DraftOrderDeleteInput!) {
    draftOrderComplete(input: $input) {
      draftOrder {
        order {
          nameid
        }
      }
      userErrors {
        message
        field
      }
    }
  }
`;

const REJECT_DRAFT_ORDER = gql`
  mutation draftOrderComplete($id: ID!) {
    draftOrderComplete(id: $id) {
      draftOrder {
        order {
          name
          id
        }
      }
      userErrors {
        message
        field 
      }
    }
  }
`;

export {CREATE_SCRIPT_TAG, DELETE_SCRIPTTAG, ACCEPT_DRAFT_ORDER, REJECT_DRAFT_ORDER};