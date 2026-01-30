import { GraphQLClient } from "graphql-request";

//if the page is server side rendered page (Next js) then isClient will be false, bcz we only want to check this "__twitter_token" when we are on client side
const isClient = typeof window !== "undefined";

// responsible for making graphql requests to our server
export const graphqlClient = new GraphQLClient(
  "http://localhost:8000/graphql",
  {
    headers: () => ({
      Authorization: isClient
        ? `Bearer ${window.localStorage.getItem("__twitter_token")}`
        : "",
    }),
  },
);
