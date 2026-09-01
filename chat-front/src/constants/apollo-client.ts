import {
  ApolloClient,
  CombinedGraphQLErrors,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";

import { API_URL } from "./urls";
import { excludedRoutes } from "./excluded-routes";

export const logoutLink = new ErrorLink(({ error }) => {
  if (!CombinedGraphQLErrors.is(error)) return;

  const currentPath = window.location.pathname;

  // Don't redirect from public routes
  if (excludedRoutes.includes(currentPath)) return;

  const isUnauthorized = error.errors.some(
    ({ message }) => message === "Unauthorized",
  );

  if (!isUnauthorized) return;

  client.resetStore();

  window.location.href = `/login?from=${encodeURIComponent(
    window.location.pathname + window.location.search,
  )}`;
});

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  credentials: "include",
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});
