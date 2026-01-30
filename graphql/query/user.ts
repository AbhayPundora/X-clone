import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql

  #here we write the exact same as the /graphql sandbox
  query verifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);
