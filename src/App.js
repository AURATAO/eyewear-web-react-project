import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/admin/Dashboard";
import AdminProducts from "./Pages/admin/AdminProducts";
import AdminCoupons from "./Pages/admin/AdminCoupons";
import AdminOrder from "./Pages/admin/AdminOrder";
import FrontLayout from "./Pages/front/FrontLayout";
import Home from "./Pages/front/Home";
import Products from "./Pages/front/Products";
import ProductDetail from "./Pages/front/ProductDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route path="" element={<Home />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="product/:id" element={<ProductDetail />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<AdminProducts />}></Route>
          <Route path="coupons" element={<AdminCoupons />}></Route>
          <Route path="orders" element={<AdminOrder />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
