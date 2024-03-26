import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import Home from "./pages/Home";
import AuthProvider from "./providers/AuthProvider";
import { UserRoute, GuestRoute } from "./route/Route";

const router = createBrowserRouter([
  {
    element: <UserRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
