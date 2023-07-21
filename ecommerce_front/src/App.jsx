import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/Home";
import CreateGame from "./components/Admin/Forms/CreateGame";
import Games from "./components/Games/Games";
import CardDetail from "./components/CardDetail/CardDetail";
import User from "./components/User/User";
import ContactUs from "./components/ContactUs/ContactUs";
import { LogIn } from "./components/LogIn/LogIn";
import { SignUp } from "./components/SignUp/SignUp";
import { DashboardAdmin } from "./components/Admin/Dashboard Admin/DashboardAdmin";
import Faq from "./components/FAQ/Faq";
import { AuthProvider } from "./components/Auth/authContext";
import CheckOut from "./components/CheckOut/CheckOut";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { EditProduct } from "./components/Admin/EditProduct/EditProduct";
import { EditProductForm } from "./components/Admin/EditProduct/EditProductForm";
import Cart from "./components/Cart/Cart";
import MercadoPagoSuccess from "./components/MercadoPago/MercadoPagoSuccess/MercadoPagoSuccess";
import MercadoPagoFailure from "./components/MercadoPago/MercadoPagoFailure/MercadoPagoFailure";
import MercadoPagoPending from "./components/MercadoPago/MercadoPagoPending/MercadoPagoPending";
import PayPalPaymentButton from "./components/Paypal/Paypal";
import NotFound from "./components/NotFound/NotFound";
import { ProtectedRoutes } from "./components/Auth/ProtectedRoutes";
import Wrapper from "./components/Wrapper/Wrapper";
import { WrapperAdmin } from "./components/Admin/WrapperAdmin/WrapperAdmin";
import { Sales } from "./components/Admin/Sales/Sales";
import UsersAdmin from "./components/Admin/UsersAdmin/UsersAdmin";
import { UserAdminEdit } from "./components/Admin/UserAdminEdit/UserAdminEdit";
import { UserId } from "./components/Admin/UsersAdmin/UserId";
const PAYPAL_TOKEN = import.meta.env.VITE_PAYPAL_TOKEN;

function App() {
  return (
    <div>
      {/* <PayPalScriptProvider
        options={{
          "client-id": PAYPAL_TOKEN,
        }}
      > */}
        <ToastContainer />
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Wrapper />}>
              <Route index element={<Home />} />
              <Route path="games" element={<Games />} />
              <Route path="details/:id" element={<CardDetail />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="login" element={<LogIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="paypal" element={<PayPalPaymentButton />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="checkout" element={<CheckOut />} />
              </Route>
              <Route path="cart" element={<Cart />} />
              <Route path="questions" element={<Faq />} />
              <Route path="*" element={<NotFound />} />
              <Route exact path="success" element={<MercadoPagoSuccess />} />
              <Route exact path="failure" element={<MercadoPagoFailure />} />
              <Route exact path="pending" element={<MercadoPagoPending />} />
              <Route path="user" element={<User />} />
            </Route>
            <Route exact path="/admin" element={<WrapperAdmin />}>
              <Route index element={<DashboardAdmin />} />
              <Route path="createproduct" element={<CreateGame />} />
              <Route path="editproduct" element={<EditProduct />} />
              <Route path="editproductform/:id" element={<EditProductForm />} />
              <Route path="sales" element={<Sales />} />
              <Route path="usersadmin" element={<UsersAdmin />} />
              <Route path="edituser" element={<UserAdminEdit />} />
              <Route path="userid/:id" element={<UserId />} />
            </Route>
          </Routes>
        </AuthProvider>
      {/* </PayPalScriptProvider> */}
    </div>
  );
}

export default App;
