import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Layout/Home";
import Login from "../Pages/Login/Login";
import SignUp from './../Pages/SignUp/SignUp';
import ContactUs from "../Pages/ContactUs/ContactUs";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashBoard from "../Layout/DashBoard";
import WorkSheet from "../Pages/DashBoard/Employee/WorkSheet";
import EmployeeList from './../Pages/DashBoard/HR/EmployeeList';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      errorElement: <ErrorPage></ErrorPage>,
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
 {
  path: '/dashboard',
  element: <DashBoard></DashBoard>,
  children:[
    {
      path: 'work-sheet',
      element: <WorkSheet></WorkSheet>
    },
    {
      path: 'employee-list',
      element: <EmployeeList></EmployeeList>
    }
  ]
 }
 
]);

  export default router;