import ReactDOM from "react-dom/client";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Home from "./routes/Home";
import NavBar from "./components/NavBar";
import PageNotFound from "./routes/PageNotFound";
import store from "./store/store.js";
import { Provider } from "react-redux";
import Account from "./routes/Account/index.jsx";
import Play from "./routes/Play/index.jsx";

const router = createBrowserRouter([
  {
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/account",
        element: <Account />
      },
      {
        path: "*",
        element: <PageNotFound />
      },
    ]
  },
  {
    path: "/play",
    element: <Play />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}  />
  </Provider>
);