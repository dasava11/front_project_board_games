import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home/Home";
import CreateGame from "./components/Admin/Forms/CreateGame";
import Games from "./components/Games/Games";
import CardDetail from "./components/CardDetail/CardDetail";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ContactUs from "./components/ContactUs/ContactUs";
import { LogIn } from "./components/LogIn/LogIn";
import { SignUp } from "./components/SignUp/SignUp";
import { DashboardAdmin } from "./components/Admin/Dashboard Admin/DashboardAdmin";
import Faq from "./components/FAQ/Faq";
import { AuthProvider } from "./components/Auth/authContext";
import CheckOut from "./components/CheckOut/CheckOut";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Cart from "./components/Cart/Cart";
import MercadoPagoSuccess from "./components/MercadoPagoSuccess/MercadoPagoSuccess";
import MercadoPagoFailure from "./components/MercadoPagoFailure/MercadoPagoFailure";
import MercadoPagoPending from "./components/MercadoPagoPending/MercadoPagoPending";

const PAYPAL_TOKEN = import.meta.env.PAYPAL_TOKEN;

function App() {
  return (
    <div>
      <BrowserRouter>
        <PayPalScriptProvider
          options={{
            "client-id": PAYPAL_TOKEN,
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
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/questions" element={<Faq />} />
              <Route exact path="/success" element={<MercadoPagoSuccess />} />
              <Route exact path="/failure" element={<MercadoPagoFailure />} />
              <Route exact path="/pending" element={<MercadoPagoPending />} />
            </Routes>

            <Footer />
          </AuthProvider>
        </PayPalScriptProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
