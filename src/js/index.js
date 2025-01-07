import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";


const container = document.querySelector("#app");

if (container) {
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
} else {
    console.error("El contenedor con ID 'root' no fue encontrado en el DOM.");
}
