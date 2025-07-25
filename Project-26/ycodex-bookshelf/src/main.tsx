import { createRoot } from "react-dom/client";
import store from "./store.ts";
import App from "./App.tsx";
import {Provider} from "react-redux"
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
