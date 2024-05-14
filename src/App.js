import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/admin/Dashboard";
import AdminProducts from "./Pages/admin/AdminProducts";
import AdminCoupons from "./Pages/admin/AdminCoupons";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<AdminProducts />}></Route>
          <Route path="coupons" element={<AdminCoupons />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
