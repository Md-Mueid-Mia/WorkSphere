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
import Progress from "../Pages/DashBoard/HR/Progress";
import AllEmployeeList from './../Pages/DashBoard/Admin/AllEmployeeList';
import AdminRoute from "./AdminRoute";
import HrRoutes from "./HrRoutes";
import EmployeeRoute from "./EmployeeRoute";
import Payroll from "../Pages/DashBoard/Admin/Payroll";
import Message from "../Pages/DashBoard/Admin/Message";

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
      element: <EmployeeRoute><WorkSheet></WorkSheet></EmployeeRoute>
    },
    {
      path: 'payment-history',
      element: <EmployeeRoute><PaymentHistory></PaymentHistory></EmployeeRoute>
    },
    // hr
    {
      path: 'employee-list',
      element: <HrRoutes><EmployeeList></EmployeeList></HrRoutes>
    },
    {
      path: 'details/:slug',
      element: <HrRoutes><EmployeeDetails></EmployeeDetails></HrRoutes>
    },
    {
      path: 'progress',
      element: <HrRoutes><Progress></Progress></HrRoutes>
    },
    // admin routes
    {
      path: 'all-employee-list',
      element: <AdminRoute><AllEmployeeList></AllEmployeeList></AdminRoute>
    },
    {
      path: 'payroll',
      element: <AdminRoute><Payroll></Payroll></AdminRoute>
    },
    {
      path: 'messages',
      element: <AdminRoute><Message></Message></AdminRoute>
    }

  ]
 }
 
]);

  export default router;