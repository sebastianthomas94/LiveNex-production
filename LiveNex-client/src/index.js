import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/DashboardPage";
import { Provider } from "react-redux";
import store from "./store";
import "font-awesome/css/font-awesome.min.css";
import LiveStreamPage from "./pages/LiveStreamPage";
import DestinationPage from "./pages/DestinationPage";
import Broadcasting from "./components/Broadcasting";
import Test from "./components/test";
import SubscriptionPage from "./pages/SubscriptionPage";
import AdminLoginPage from "./pages/admin-pages/AdminLoginPage";
import Dashboard from "./components/admin-components/Dashboard";
import AdminDashboardPage from "./pages/admin-pages/AdminDashboardPage";
import AdminDestinations from "./pages/admin-pages/AdminDestinations";
import TicketsPage from "./pages/TicketsPage";
import CreateTicketPage from "./pages/CreateTicketPage";
import AdminTicketPage from "./pages/admin-pages/AdminTicketPage";
import PastLivesPage from "./pages/PastLivesPage";
import UpcomingLivesPage from "./pages/UpcomingLivesPage";
import SchedulingLivesLoader from "./components/SchedulingLiveLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/stream",
        element: <LiveStreamPage />,
      },
      {
        path: "/destinations",
        element: <DestinationPage />,
      },
      {
        path: "/broadcast",
        element: <Broadcasting />,
      },
      {
        path: "/subscription",
        element: <SubscriptionPage />,
      },
      {
        path: "/admin/login",
        element: <AdminLoginPage />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboardPage />,
      },
      {
        path: "/admin/destinations",
        element: <AdminDestinations />,
      },
      {
        path: "/admin/tickets",
        element: <AdminTicketPage />,
      },
      {
        path: "/tickets",
        element: <TicketsPage />,
      },
      {
        path: "/tickets/create",
        element: <CreateTicketPage />,
      },
      {
        path: "/pastlives",
        element: <PastLivesPage />,
      },
      {
        path: "/upcominglives",
        element: <UpcomingLivesPage />,
      },
      {
        path: "/schedulingLive",
        element: <SchedulingLivesLoader />,
      },
      {
        path: "/test",
        element: <Test />,
      },
    ],
    // path: "/admin",
    // element: <App />,
    // children: [
    //   {
    //     path: "/admin/login",
    //     element: <AdminLoginPage/>
    //   },
    //   {
    //     path: "/admin/dashboard",
    //     element: <Dashboard/>
    //   },
    // ]
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
