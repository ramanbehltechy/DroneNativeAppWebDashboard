import { Routes, Route } from "react-router-dom";
import Dashboard from "../screens/dashboard";
import AddShow from "../screens/add-show";
import Layout from "../layout";
import Login from "../screens/login";


export default function Navigation() {
  return (
    <>
      <Routes>
          <Route element={<Layout layoutName="Dashboard" proctedRoute={true} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-show" element={<AddShow/>} />
          </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={404} />
      </Routes>
    </>
  );

}