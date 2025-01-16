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
import PaymentHistory from './../Pages/DashBoard/Employee/PaymentHistory';
import EmployeeDetails from "../Pages/DashBoard/HR/EmployeeDetails";
import PrivateRoute from './PrivateRoute';

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
  element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
  children:[
    {
      path: 'work-sheet',
      element: <WorkSheet></WorkSheet>
    },
    {
      path: 'payment-history',
      element: <PaymentHistory></PaymentHistory>
    },
    {
      path: 'employee-list',
      element: <EmployeeList></EmployeeList>
    },
    {
      path: 'details/:slug',
      element: <EmployeeDetails></EmployeeDetails>
    }
  ]
 }
 
]);

  export default router;