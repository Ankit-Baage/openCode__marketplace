import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "./index.css";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ConfirmationModal } from "./components/modal/confirmationModal/ConfirmationModal";
import { ReturnModal } from "./components/modal/returnShipmentModal/ReturnModal";
import { CancellationModal } from "./components/modal/cancellationModal/CancellatioModal";

// ✅ Import HelmetProvider
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      {/* ✅ Wrap everything in HelmetProvider */}
      <HelmetProvider>
        <ConfirmationModal />
        <ReturnModal />
        <CancellationModal />

        <App />

        <ToastContainer
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </HelmetProvider>
    </Provider>
  </QueryClientProvider>
);

serviceWorkerRegistration.register();
reportWebVitals();