import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/router.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./Provider/ThemeProvider.jsx";

const queryClient = new QueryClient();
// Load your Stripe publishable key
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
    <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <div className="max-w-7xl mx-auto">
          <RouterProvider router={router} />
          
          </div>
        </QueryClientProvider>
    </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
