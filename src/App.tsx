import { Route, Routes } from "react-router-dom";

import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import Home from "./pages/Home/Home";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import SignIn from "./pages/SignIn/SignIn";
import Cart from "./pages/Cart/Cart";
import Category from "./pages/Admin/Category/Category";
import Product from "./pages/Admin/Product/Product";
import AddCategory from "./pages/Admin/Category/AddCategory";
import UpdateCategory from "./pages/Admin/Category/UpdateCategory";
import AddProduct from "./pages/Admin/Product/AddProduct";
import UpdateProduct from "./pages/Admin/Product/UpdateProduct";
import Page404 from "./pages/Page404";
import AdminCart from "./pages/Admin/AdminCart/AdminCart";
import AdminCartUpdate from "./pages/Admin/AdminCart/AdminCartUpdate";
import { useSelector } from "react-redux";
import Register from "./pages/Register/Register";
import CategoryProduct from "./pages/Category/Category";
import Sale from "./pages/Sale/Sale";
import Contact from "./pages/Contact/Contact";
import { UpdateUser, User } from "./pages/Admin/User";
import { ContactAdmin, DetailContact } from "./pages/Admin/Contact";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  const userAdmin =
    useSelector((state: any) => state.auth.login?.currentUser?.data?.admin) ||
    null;
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<DetailProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/category-product/:id" element={<CategoryProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        {userAdmin && (
          <Route path="admin">
            <Route path="category" element={<Category />} />
            <Route path="category/add" element={<AddCategory />} />
            <Route path="category/update/:id" element={<UpdateCategory />} />
            <Route path="product" element={<Product />} />
            <Route path="product/add" element={<AddProduct />} />
            <Route path="product/update/:id" element={<UpdateProduct />} />
            <Route path="cart" element={<AdminCart />} />
            <Route path="cart/update/:id" element={<AdminCartUpdate />} />
            <Route path="user/" element={<User />} />
            <Route path="user/update/:id" element={<UpdateUser />} />
            <Route path="contact/" element={<ContactAdmin />} />
            <Route path="contact/:id" element={<DetailContact />} />
          </Route>
        )}
        <Route path="*" element={<Page404 />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
