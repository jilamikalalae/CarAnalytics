import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Highlight from './routes/highlight'
import Dashboard from "./routes/dashboard";


const router = createBrowserRouter([
  {
    path: "/CarAnalytics",
    element: <Root />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'highlight',
        element: <Highlight />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
