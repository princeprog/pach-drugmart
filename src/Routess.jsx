import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import NavBar from "./components/Navigation/NavBar";
import Register from "./pages/Login and Signup/Register";
import Login from "./pages/Login and Signup/Login";
import AdminLogin from "./admin pages/login page/AdminLogin";
import Sidebar from "./components/Navigation/Sidebar";
import Product from "./admin pages/Product/Product";
import About from "./pages/About/About";
import Booking from "./pages/Booking/Booking";
import Drug from "./pages/Drug/Drug";
import DrugDetails from "./pages/Drug/DrugDetails";
import Dashboard from "./admin pages/Dashboard/Dashboard";
import Schedule from "./admin pages/Schedule/Schedule";
import Messages from "./admin pages/Messages/Messages";
import UserManagement from "./admin pages/User Management/UserManagement";
import Profile from "./pages/Profile/Profile"
import AdminBookings from "./admin pages/adminBookings/adminBookings";
import ViewDrugs from "./pages/Drug/ViewDrugs";
import Cart from "./pages/Cart/Cart";

export default function Routess() {
    return (
        <Routes> 
            <Route path="/" element={<NavBar/>}>
                <Route index element={<Navigate to="home" />} />
                <Route path="home" element={<Home/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="drug" element={<Drug/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="booking" element={<Booking/>}/>
                <Route path="drug/details/:productId" element={<DrugDetails/>}/>
                <Route path="Profile" element={<Profile/>}/>
                <Route path="drug/view" element={<ViewDrugs/>}/>
                <Route path="/cart" element={<Cart/>}/>
            </Route>
            <Route path="/admin/login" element={<AdminLogin/>}/>
            <Route path="/admin" element={<Sidebar/>}>
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="products" element={<Product/>}/>
                <Route path="dashboard" element={<Dashboard/>}></Route>
                <Route path="schedule" element={<Schedule/>}></Route>
                <Route path="messages" element={<Messages/>}></Route>
                <Route path="user-management" element={<UserManagement/>}></Route>
                <Route path="adminbookings" element={<AdminBookings/>}></Route>
            </Route>
        </Routes>
    )
}