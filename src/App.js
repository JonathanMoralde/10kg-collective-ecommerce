import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import User from "./pages/User";
import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import SingleProduct from "./pages/SingleProduct";
import AdminLayout from "./components/AdminLayout";
import Admin from "./pages/admin pages/Admin";
import Products from "./pages/admin pages/Products";
import Orders from "./pages/admin pages/Orders";
import AdminLogin from "./pages/admin pages/AdminLogin";
import ProductForm from "./components/ProductForm";
import { useState } from "react";
import Checkout from "./pages/Checkout";
import UserDashboard from "./pages/UserDashboard";
// footer pages
import FooterPageLayout from "./components/FooterPageLayout";
import Privacy from "./pages/footer pages/Privacy";
import SizeGuide from "./pages/footer pages/SizeGuide";
import Faqs from "./pages/footer pages/Faqs";
import Returns from "./pages/footer pages/Returns";

function App() {
  const [adminUser, setAdminUser] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} setUser={setUser} />}>
            <Route index element={<Home user={user} />} />
            <Route path="/Shop" element={<Shop user={user} />} />
            <Route path="/Shop/:id" element={<SingleProduct user={user} />} />
            <Route
              path="/Shop/Checkout/:id/:size/:variant/:qty/:name/:price"
              element={<Checkout user={user} />}
            />
            <Route path="/About" element={<About />} />
          </Route>

          {/* no footer in layout routes */}
          <Route path="/User" element={<User setUser={setUser} />} />
          {/* <Route
            path="/User"
            element={
              user ? (
                // <UserDashboard user={user} setUser={setUser} />
                // <UserDropdown />
              ) : (
                <User setUser={setUser} />
              )
            }
          /> */}
          
          <Route
            path="/UserDashboard"
            element={<UserDashboard user={user} setUser={setUser} />}
          />

          {/* admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin adminUser={adminUser} />} />
            <Route exact path="/admin/Products" element={<Products />} />
            <Route exact path="/admin/product-form" element={<ProductForm />} />
            <Route path="/admin/Orders" element={<Orders />} />
          </Route>
          <Route
              path="/admin/Login"
              element={<AdminLogin setAdminUser={setAdminUser} />}
            />

          {/* footer routes */}
          <Route element={<FooterPageLayout user={user} setUser={setUser} />} >
            <Route path="/Privacy" element={<Privacy />} />
            <Route path="/SizeGuide" element={<SizeGuide />} />
            <Route path="/Faqs" element={<Faqs />} />
            <Route path="/Returns" element={<Returns />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
