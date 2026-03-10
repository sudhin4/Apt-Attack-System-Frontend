import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Containers from "./Components/Containers.jsx";
import Filevaluecontainer from "./Components/FileValuecontainer.jsx";
import HeaderButtons from "./Components/HeaderButtons.jsx";
import SuspiciousIPTable from "./Components/ResponseAction.jsx";


createRoot(document.getElementById("root")).render(<App />);
