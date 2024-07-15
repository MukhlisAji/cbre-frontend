import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./rooot";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <RouterProvider router={createBrowserRouter([{ path: "/", element: <App /> }])} /> */}

    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter> */}
    <App />
  </React.StrictMode>
);
