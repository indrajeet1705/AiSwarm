import { createBrowserRouter, NavLink, RouterProvider } from "react-router-dom";
import Addnew from "./Comonents/Addnew";
import Navigation from "./Comonents/Navigation";
import Manage from "./Comonents/Manage";
import Home from "./Comonents/Home";
import { ToastContainer, toast } from "react-toastify";
import Chat from "./Comonents/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navigation></Navigation>
        <Home></Home>
      </div>
    ),
  },
  {
    path: "/Manage",
    element: (
      <div>
        <Navigation></Navigation>
        <Manage></Manage>
      </div>
    ),
  },
  {
    path: "/Addnew",
    element: (
      <div>
        <Navigation></Navigation>
        <Addnew></Addnew>
      </div>
    ),
  },
  {
    path: "/addnew/:id",
    element: (
      <div>
        <Navigation></Navigation>
        <Addnew></Addnew>
      </div>
    ),
  },
  {
    path: "/chat",
    element: (
      <div>
        <Navigation></Navigation>
        <Chat></Chat>
      </div>
    ),
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
