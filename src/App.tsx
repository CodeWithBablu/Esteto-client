import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage, Layout, ListPage, LoginPage, NewPostPage, ProfilePage, ProfileUpdatePage, RegisterPage, RequireAuth, SinglePage } from "./pages";
import { listPageLoader, singlePageLoader } from "./lib";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/list",
        element: <ListPage />,
        loader: listPageLoader,
      },
      {
        path: "estate/:id",
        element: <SinglePage />,
        loader: singlePageLoader,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/profile/update",
        element: <ProfileUpdatePage />,
      },
      {
        path: "/add",
        element: <NewPostPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
