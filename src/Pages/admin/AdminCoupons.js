import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CouponsModal from "../../components/CouponsModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import { Modal } from "bootstrap";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  //決定modal展開的用途 -- 這邊是要做編輯品項用
  const [type, setType] = useState("create");
  const [tempCoupon, setTempCoupon] = useState({});

  const couponModal = useRef(null);
  const deleteModal = useRef(null);
  useEffect(() => {
    couponModal.current = new Modal("#productModal", {
      backdrop: "static",
    });
    //要加上一個id  - "#productModal";
    //後面backdrop的部分是指當點擊外部modal時，並不會把視窗關掉

    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });

    getCoupons();
  }, []);

  const getCoupons = async (page = 1) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`
    );
    console.log(res);
    setCoupons(res.data.coupons);
    setPagination(res.data.pagination);
  };

  const openCouponModal = (type, item) => {
    setType(type);
    setTempCoupon(item);
    couponModal.current.show();
  };
  const closeModal = () => {
    couponModal.current.hide();
  };
  const openDeleteModal = (product) => {
    setTempCoupon(product);
    deleteModal.current.show();
  };
  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  const deleteCoupons = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`
      );
      if (res.data.success) {
        getCoupons();
        deleteModal.current.hide();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="p-3">
        <CouponsModal
          closeModal={closeModal}
          getCoupons={getCoupons}
          type={type} //這邊傳進來是指屆時當modal被斬開時可以被使用
          tempCoupon={tempCoupon} //這邊傳進來是指屆時當modal被斬開時可以被使用
        />
        <DeleteModal
          close={closeDeleteModal}
          text={tempCoupon.title}
          handleDelete={deleteCoupons}
          id={tempCoupon.id}
        />
        <h3>優惠券列表</h3>
        <hr />
        <div className="text-end">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => openCouponModal("create", {})}
          >
            建立新優惠券
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">標題</th>
              <th scope="col">折扣</th>
              <th scope="col">到期日</th>
              <th scope="col">優惠碼</th>
              <th scope="col">啟用狀態</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.percent}</td>
                  <td>{new Date(product.due_date).toDateString()}</td>
                  <td>{product.code}</td>
                  <td>{product.is_enabled ? "啟用" : "未啟用"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => openCouponModal("edit", product)}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => openDeleteModal(product)}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination pagination={pagination} changePage={getCoupons} />
      </div>
    </>
  );
}
