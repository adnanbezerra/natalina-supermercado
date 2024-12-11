import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/ProductList";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ManageUser from "./pages/ManageUser";
import Product from "./pages/Product/ProductDetails";
import Profile from "./pages/Profile/profile";
import Users from "./pages/Users";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./layout/header";
import ProductDetails from "./pages/Product/ProductDetails";
// import Sidebar from "./layout/Sidebar/Sidebar";
import { DrawerProvider } from "./contexts/drawer-context";

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

            <DrawerProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route
                            path="/products"
                            element={localStorage.getItem("token") ? (
                                <Header>
                                    <Main />
                                </Header>
                            ) : (
                                <Navigate to="/" />
                            )}
                        />
                        <Route
                            path="/forgot-password"
                            element={
                                <Header>
                                    <ForgotPassword />
                                </Header>
                            }
                        />
                        <Route
                            path="/manage-user/:id"
                            element={
                                <Header>
                                    <ManageUser />
                                </Header>
                            }
                        />
                        <Route
                            path="/product/:id"
                            element={
                                <Header>
                                    <Product />
                                </Header>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <Header>
                                    <Profile />
                                </Header>
                            }
                        />
                        <Route
                            path="/users"
                            element={
                                <Header>
                                    <Users />
                                </Header>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </DrawerProvider>
        </>
    );
}

export default App;
