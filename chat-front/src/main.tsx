import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { RouterProvider } from "react-router/dom";

import "./index.css";
import { client } from "./constants/apollo-client.ts";
import { Toaster } from "./components/ui/toast.tsx";
import { router } from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
      <Toaster />
    </ApolloProvider>
  </StrictMode>,
);
