import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ManageUser from "./pages/ManageUser";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Users from "./pages/Users";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/manage-user/:id" element={<ManageUser />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
