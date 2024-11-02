import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/productList";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ManageUser from "./pages/ManageUser";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
                transition={Bounce}
            />

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/manage-user/:id" element={<ManageUser />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
