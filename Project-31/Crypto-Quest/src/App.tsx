import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import Challenges from "./pages/Challenges";
import Simulators from "./pages/Simulators";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AppLayout from "./pages/AppLayout";
import UserProvider from "./components/features/UserData/UserProvider";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserProvider><AppLayout /></UserProvider>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/playground",
          element: <Playground />,
        },
        {
          path: "/challenges",
          element: <Challenges />,
        },
        {
          path: "/simulators",
          element: <Simulators />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
