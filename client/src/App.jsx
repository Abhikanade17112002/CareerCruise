import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./components/shared/Layout/Layout";
import SignUp from "./components/shared/SignUp/SignUp";
import SignIn from "./components/shared/SignIn/SignIn";
import AuthLayout from "./components/shared/Layout/AuthLayout";
import {
  getIsAuthenticated,
  getIsLoading,
  getUserInfo,
} from "./store/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "./components/shared/HeroSection/HeroSection";
import CategoryCarousel from "./components/shared/CategoryCarousel/CategoryCarousel";
import LatestJobs from "./components/shared/LatestJobOpenings/LatestJobs";
import Jobs from "./components/shared/Jobs/Jobs";
import BrowseJobs from "./components/shared/BrowseJobs/BrowseJobs";
import UserProfile from "./components/shared/UserProfile.jsx/UserProfile";
import JobDetails from "./components/shared/JobDetails/JobDetails";
import { useEffect } from "react";
import { getAllJobs, getAllJobsAction } from "./store/jobSlice/jobSlice";
import Auth from "./components/shared/ProtectedRoutes/Auth/Auth";
import Admin from "./components/shared/ProtectedRoutes/Admin/Admin";
import User from "./components/shared/ProtectedRoutes/User/User";
import Companies from "./components/shared/Companies/Companies";
import AdminLayout from "./components/shared/Layout/AdminLayout";
import RegisterCompany from "./components/shared/RegisterCompany/RegisterCompany";
import CompanyDetails from "./components/shared/CompanyDetails/CompanyDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Auth>  <Admin><Layout /></Admin></Auth>,
    children: [
      {
        path: "/",
        element: (
          <div className="w-full">
            <HeroSection></HeroSection>
            <CategoryCarousel></CategoryCarousel>
            <LatestJobs></LatestJobs>
          </div>
        ),
      },
    ],
  },

  {
    path: "/auth",
    element:  <Auth>
      <AuthLayout /> </Auth>
    ,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/jobs",
    element: <Auth>  <Admin><User><Layout></Layout></User></Admin> </Auth>,
    children: [
      {
        path: "",
        element:  <Jobs></Jobs> ,
      },
      {
        path: "browse",
        element: <BrowseJobs></BrowseJobs>,
      },
      {
        path: ":id",
        element: <JobDetails></JobDetails>,
      },
    ],
  },
  {
    path: "/user",
    element: <Auth><Admin><User><Layout></Layout></User></Admin></Auth>,
    children: [
      {
        path: "profile",
        element: <UserProfile></UserProfile>,
      },
    ],
  },
  {
    path: "/admin",
    element: <Auth><Admin><User><AdminLayout></AdminLayout></User></Admin></Auth>,
    children: [
      {
        path: "companies",
        element: <Companies></Companies>,
      },
      {
        path: "company/register",
        element: < RegisterCompany ></RegisterCompany>
      },
      {
        path: "company/:companyId",
        element: < CompanyDetails ></CompanyDetails>
      }
    ],
  },
]);
function App() {
  const dispatch = useDispatch() ;
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isLoading = useSelector(getIsLoading);
  const userInfo = useSelector(getUserInfo);

  

  useEffect(() => {
    dispatch(getAllJobsAction());
  }, [dispatch, userInfo]);


  return (
    <div className="w-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
