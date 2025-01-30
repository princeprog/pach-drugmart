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


export default function Routess() {
    return (
        <Routes> 
            <Route path="/" element={<NavBar/>}>
                <Route index element={<Navigate to="home" />} />
                <Route path="home" element={<Home/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="booking" element={<Booking/>}/>
            </Route>
            <Route path="/admin/login" element={<AdminLogin/>}/>
            <Route path="/admin" element={<Sidebar/>}>
                <Route index element={<Navigate to="products" />} />
                <Route path="products" element={<Product/>}/>
            </Route>
        </Routes>
    )
}