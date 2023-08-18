import React from "react";
import ReactDOM from "react-dom/client";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

import App from "./App.tsx";
import "./index.css";
import { api } from "./features/api.ts";
import { ModeProvider } from "./context/Mode.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider api={api}>
      <ModeProvider>
        <App />
      </ModeProvider>
    </ApiProvider>
  </React.StrictMode>
);
