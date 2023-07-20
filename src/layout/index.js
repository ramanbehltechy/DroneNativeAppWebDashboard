import { Navigate, Outlet } from "react-router-dom";
import DashboardHeader from "../components/dashboardHeader";
import DashboardSideNav from "../components/dashboardSideNav";
import { useSelector } from "react-redux";

export default function Layout({ layoutName, proctedRoute = false }) {
    const { isLoggedIn } = useSelector((state) => state.auth);
    if (proctedRoute) {
        if (!isLoggedIn) {
            return <Navigate to="/login" />
        }
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