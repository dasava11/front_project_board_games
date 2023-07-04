import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/Home";
import Games from "./components/Games/Games";
import CreateGame from "./components/Admin/Forms/CreateGame";
import CardDetail from "./components/CardDetail/CardDetail";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ContactUs from "./components/ContactUs/ContactUs";
import { LogIn } from "./components/LogIn/LogIn";
import { SignUp } from "./components/SignUp/SignUp";


import Faq from "./components/FAQ/Faq";
import { AuthProvider } from "./components/Auth/authContext";
//import { ProtectedRoutes } from "./components/Auth/ProtectedRoutes";


import PayPalComponent from "./components/Paypal/Paypal";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import Cart from "./components/Cart/Cart";


function App() {
  //localStorage.clear();
  return (
    <div>
      <BrowserRouter>
        <PayPalScriptProvider options={{ 'client-id': 'AZF_WsZpFRtTjw6nRirMxga20RmU3isWNrl1BR_udWCxEtPh2MXQ0rXgPkAqAOnj5PHFWKckEsMmSnGm' }}>
          <ToastContainer />

          <AuthProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createproduct" element={<CreateGame />} />
              <Route path="/games" element={<Games />} />
              <Route path="details/:id" element={<CardDetail />} />
              <Route path="/contact" element={<ContactUs />} />

              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/paypal" element={<PayPalComponent />} />
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
