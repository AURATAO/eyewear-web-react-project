import axios from "axios";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function FrontLayout() {
  const [cartData, setCartData] = useState({});

  const getCart = async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      console.log("購物車資訊：", res);
      setCartData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Navbar cartData={cartData} />
      <Outlet context={{ getCart, cartData }} />
      {/*這邊的context={{getCart}} 是指 在其他產品按下加入購物車時，他會自動讓購物車增加一 這邊寫完再記得回productDetail 解構的形式傳回去 ＊記得這裡的{getCart}是一個物件形式 */}
      <div className="bg-dark py-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
            <a className="text-white h4" href="./index.html">
              BABY REINDEER
            </a>
            <ul className="d-flex list-unstyled mb-0 h4">
              <li>
                <a className="text-white mx-3">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a className="text-white mx-3">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a className="text-white ms-3">
                  <i className="fab fa-line"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
            <div className="mb-md-0 mb-1">
              <p className="mb-0">02-3456-7890</p>
              <p className="mb-0">service@mail.com</p>
            </div>
            <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}
