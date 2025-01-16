import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/router.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const queryClient = new QueryClient();
// Load your Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
console.log(stripePromise);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <Elements stripe={stripePromise}>
        <QueryClientProvider client={queryClient}>
          <div className="max-w-7xl mx-auto">
          <RouterProvider router={router} />
          </div>
        </QueryClientProvider>
        </Elements>
    </AuthProvider>
  </StrictMode>
);
