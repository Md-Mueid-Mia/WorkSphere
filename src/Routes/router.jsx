import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Layout/Home";
import Login from "../Pages/Login/Login";
import SignUp from './../Pages/SignUp/SignUp';
import ContactUs from "../Pages/ContactUs/ContactUs";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: '/contact-us',
          element: <ContactUs></ContactUs>
        },















        {
          path: "/login",
          element:<Login></Login>
        },
        {
         path: '/signup',
         element:<SignUp></SignUp>
        }
      ]
 },
 
]);

  export default router;