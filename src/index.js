import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./CartContext";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();
ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
        <App />
        </QueryClientProvider>
      </CartProvider>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);
