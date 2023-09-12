import { Navigate, Outlet, useNavigate } from "react-router-dom";
import DashboardHeader from "../components/dashboardHeader";
import DashboardSideNav from "../components/dashboardSideNav";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../redux/reducers/authSlice";
import { toast } from 'react-toastify';
import { useEffect } from "react";

export default function Layout({ layoutName, proctedRoute = false,onlyAdmin=false }) {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { isLoggedIn,tokenData } = useSelector((state) => state.auth);
   

    useEffect(() => {
         if (proctedRoute) {
                if (isLoggedIn) {
                    const currentTime = new Date().getTime() / 1000;
                    const timeUntilExpiration = Math.floor(tokenData.exp - currentTime);
                    if (timeUntilExpiration <= 0) {
                        dispatch(logoutRequest());
                    } else{
                       let tokenExpiryTimer = setTimeout(() => {
                            toast("Session time Expired");
                            dispatch(logoutRequest());
                        }, timeUntilExpiration * 1000);
                         return () => {
                          clearTimeout(tokenExpiryTimer);
                        };
                    }
                }else{
                    navigate("/login");
                }
            }

      }, [proctedRoute,isLoggedIn]);

      
      if((proctedRoute && !isLoggedIn) || (tokenData?.role !== "admin" && onlyAdmin)){
        return <Navigate to="/login" />
      }
    if (layoutName === "Dashboard") {
        return (
            <div id="wrapper">
                <DashboardHeader />
                <div className="container-fluid custom-height-full">
                    <div className="row">
                        <DashboardSideNav />
                        <Outlet />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Outlet />
    );
}