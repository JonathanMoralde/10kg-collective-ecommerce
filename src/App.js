import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
// User Pages
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import User from "./pages/User";
import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import SingleProduct from "./pages/SingleProduct";
import Checkout from "./pages/Checkout";
import CartCheckout from "./pages/CartCheckout";
import UserDashboard from "./pages/UserDashboard";
// Admin pages
import AdminLayout from "./components/AdminLayout";
import Admin from "./pages/admin pages/Admin";
import Products from "./pages/admin pages/Products";
import Orders from "./pages/admin pages/Orders";
import AdminLogin from "./pages/admin pages/AdminLogin";
import ProductForm from "./pages/admin pages/ProductForm";
import ProductEdit from "./pages/admin pages/ProductEdit";
// footer pages
import FooterPageLayout from "./components/FooterPageLayout";
import Privacy from "./pages/footer pages/Privacy";
import SizeGuide from "./pages/footer pages/SizeGuide";
import Faqs from "./pages/footer pages/Faqs";
import Returns from "./pages/footer pages/Returns";
// Toastify notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [adminUser, setAdminUser] = useState(null);
  const [user, setUser] = useState(null);

  // check session on initial render or when reloaded
  useEffect(() => {
    // const response = axios.get("https:/localhost/10kg-collective/userModule/checksession.php")

    // // setUser(response.data)
    // // user or admin
    // if(response.data.user_type === "c"){
    //   setUser(response.data)
    // } else if(response.data.user_type === "a"){
    //   setAdminUser(response.data)
    // } else {
    //   setUser(null)
    //   setAdminUser(null)
    // }
    axios
      .get("https:/localhost/10kg-collective/userModule/checksession.php")
      .then((response) => {
        if (response.data.user_type === "c") {
          setUser(response.data);
        } else {
          // alert(response)
        }
      })
      .catch((error) => {
        setUser(null);
        setAdminUser(null);
      });
  }, []);

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
            {/* Checkout for cart */}
            <Route path="/Checkout" element={<CartCheckout user={user} />} />
          </Route>

          {/* User */}
          <Route path="/User" element={<User setUser={setUser} />} />

          <Route
            path="/UserDashboard"
            element={<UserDashboard user={user} setUser={setUser} />}
          />

          {/* admin routes */}
          <Route
            exact
            path="/admin"
            element={
              adminUser ? (
                <AdminLayout
                  adminUser={adminUser}
                  setAdminUser={setAdminUser}
                />
              ) : (
                <AdminLogin setAdminUser={setAdminUser} />
              )
            }
          >
            <Route
              index
              element={
                adminUser ? (
                  <Admin adminUser={adminUser} />
                ) : (
                  <AdminLogin setAdminUser={setAdminUser} />
                )
              }
            />
            <Route
              exact
              path="/admin/Products"
              element={
                adminUser ? (
                  <Products adminUser={adminUser} />
                ) : (
                  <AdminLogin setAdminUser={setAdminUser} />
                )
              }
            />
            <Route
              exact
              path="/admin/product-form"
              element={
                adminUser ? (
                  <ProductForm adminUser={adminUser} />
                ) : (
                  <AdminLogin setAdminUser={setAdminUser} />
                )
              }
            />
            <Route
              path="/admin/edit-product/:id/:name/:price"
              element={
                adminUser ? (
                  <ProductEdit adminUser={adminUser} />
                ) : (
                  <AdminLogin setAdminUser={setAdminUser} />
                )
              }
            />
            <Route
              path="/admin/Orders"
              element={
                adminUser ? (
                  <Orders adminUser={adminUser} />
                ) : (
                  <AdminLogin setAdminUser={setAdminUser} />
                )
              }
            />
          </Route>

          <Route
            path="/admin/Login"
            element={
              adminUser ? (
                <Admin adminUser={adminUser} />
              ) : (
                <AdminLogin setAdminUser={setAdminUser} />
              )
            }
          />

          {/* footer routes */}
          <Route element={<FooterPageLayout user={user} setUser={setUser} />}>
            <Route path="/Privacy" element={<Privacy />} />
            <Route path="/SizeGuide" element={<SizeGuide />} />
            <Route path="/Faqs" element={<Faqs />} />
            <Route path="/Returns" element={<Returns />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        style={{ fontSize: "1rem" }}
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
