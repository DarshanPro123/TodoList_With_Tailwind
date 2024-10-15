import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      pauseOnHover={false}
      autoClose={2000}
      hideProgressBar={true}
      theme="colored"
      transition={Slide}
    />
  </StrictMode>
);
