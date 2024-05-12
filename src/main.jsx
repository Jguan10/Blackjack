import ReactDOM from "react-dom/client";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Home from "./routes/Home";
import NavBar from "./components/NavBar";
import PageNotFound from "./routes/PageNotFound";

const router = createBrowserRouter([
  {
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <PageNotFound />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}  />
);