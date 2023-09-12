import { Routes, Route } from "react-router-dom";
import Dashboard from "../screens/dashboard";
import AddShow from "../screens/add-show";
import Layout from "../layout";
import Login from "../screens/login";
import EditProfile from "../screens/edit-profile";
import ChangePassword from "../screens/change-password";
import UserList from "../screens/User/UserList";
import AddUser from "../screens/User/addUserForm";
import ForgotPassword from "../screens/forgot-password";
import UpdatePassword from "../screens/update-password";


export default function Navigation() {
  return (
    <>
      <Routes>
          <Route element={<Layout layoutName="Dashboard" proctedRoute={true}/>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-show" element={<AddShow/>} />
            <Route path="/edit-profile" element={<EditProfile/>} />
            <Route path="/change-password" element={<ChangePassword/>} />
          </Route>
          <Route element={<Layout layoutName="Dashboard" proctedRoute={true} onlyAdmin={true}/>}>
            <Route path="/user" element={<UserList/>} />
           <Route path="/add-user" element={<AddUser/>} />
          </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgotPassword/>} />
        <Route path="/update-password" element={<UpdatePassword/>} />
        <Route path="*" element={404} />
      </Routes>
    </>
  );

}