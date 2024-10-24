import { BrowserRouter, Route, Router } from "react-router-dom";
import { Main } from "./pages/Main";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ManageUser from "./pages/ManageUser";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Users from "./pages/Users";

function App() {
    return (
        <BrowserRouter>
            <Router>
                <Route path="/" component={<Main />} />
                <Route path="/login" component={<Login />} />
                <Route path="/forgot-password" component={<ForgotPassword />} />
                <Route path="/manage/:id" component={<ManageUser />} />
                <Route path="/product/:id" component={<Product />} />
                <Route path="/profile/:id" component={<Profile />} />
                <Route path="/users" component={<Users />} />
            </Router>
        </BrowserRouter>
    );
}

export default App;
