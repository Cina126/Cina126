import ReactDOM from "react-dom/client";
import "./index.css";
// import moduleName from './Css/Reset/Reset.css'
import { BrowserRouter } from "react-router-dom";
import App from './App/App'
const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
);

