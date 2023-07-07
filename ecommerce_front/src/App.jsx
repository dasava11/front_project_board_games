import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/Home";
import CreateGame from "./components/Admin/Forms/CreateGame";
import Games from "./components/Games/Games";
import { EditProduct } from "./components/Admin/Forms/EditProduct/EditProduct";
import CardDetail from "./components/CardDetail/CardDetail";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ContactUs from "./components/ContactUs/ContactUs";
import { LogIn } from "./components/LogIn/LogIn";
import { SignUp } from "./components/SignUp/SignUp";
import { DashboardAdmin } from "./components/Admin/Dashboard Admin/DashboardAdmin";
import Faq from "./components/FAQ/Faq";
import { AuthProvider } from "./components/Auth/authContext";
//import { ProtectedRoutes } from "./components/Auth/ProtectedRoutes";

import CheckOut from "./components/CheckOut/CheckOut";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Cart from "./components/Cart/Cart";
import PayPalPaymentButton from "./components/Paypal/Paypal";

function App() {
  //localStorage.clear();
  return (
    <div>
      <BrowserRouter>
        <PayPalScriptProvider
          options={{
            "client-id":
              "AZF_WsZpFRtTjw6nRirMxga20RmU3isWNrl1BR_udWCxEtPh2MXQ0rXgPkAqAOnj5PHFWKckEsMmSnGm",
          }}
        >
          <ToastContainer />

          <AuthProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createproduct" element={<CreateGame />} />
              <Route path="/games" element={<Games />} />
              <Route path="details/:id" element={<CardDetail />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/admin" element={<DashboardAdmin />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/paypal" element={<PayPalPaymentButton />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/editproduct" element={<EditProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/questions" element={<Faq />} />
            </Routes>
            <Footer />
          </AuthProvider>
        </PayPalScriptProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
