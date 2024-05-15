import { useEffect, useRef, useState } from "react";
import axios from "axios";
import OrderModal from "../../components/OrderModal";
// import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import { Modal } from "bootstrap";

export default function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  //決定modal展開的用途 -- 這邊是要做編輯品項用
  // const [type, setType] = useState("create");
  const [tempOrder, setTempOrders] = useState({});

  const orderModal = useRef(null);
  // const deleteModal = useRef(null);
  useEffect(() => {
    orderModal.current = new Modal("#productModal", {
      backdrop: "static",
    });
    //要加上一個id  - "#productModal";
    //後面backdrop的部分是指當點擊外部modal時，並不會把視窗關掉

    //   deleteModal.current = new Modal("#deleteModal", {
    //     backdrop: "static",
    //   });

    //   getOrders();
  }, []);

  const getOrders = async (page = 1) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/orders?page=${page}`
    );
    console.log(res);
    setOrders(res.data.orders);
    setPagination(res.data.pagination);
  };

  const openOrderModal = (order) => {
    setTempOrders(order);
    orderModal.current.show();
  };
  const closeModal = () => {
    orderModal.current.hide();
  };
  // const openDeleteModal = (order) => {
  //   setTempOrders(order);
  //   deleteModal.current.show();
  // };
  // const closeDeleteModal = () => {
  //   deleteModal.current.hide();
  // };

  // const deleteOrder = async (id) => {
  //   try {
  //     const res = await axios.delete(
  //       `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`
  //     );
  //     if (res.data.success) {
  //       getOrders();
  //       deleteModal.current.hide();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <button type="button" onClick={() => openOrderModal()}>
        按我
      </button>
      <div className="p-3">
        <OrderModal
          closeModal={closeModal}
          getOrders={getOrders}
          // type={type} //這邊傳進來是指屆時當modal被斬開時可以被使用
          tempOrder={tempOrder} //這邊傳進來是指屆時當modal被斬開時可以被使用
        />
        {/* <DeleteModal
          close={closeDeleteModal}
          text={tempOrder.title}
          handleDelete={deleteOrder}
          id={tempOrder.id}
        /> */}
        <h3>訂單列表</h3>
        <hr />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">訂單 id</th>
              <th scope="col">購買用戶</th>
              <th scope="col">訂單金額</th>
              <th scope="col">付款狀態</th>
              <th scope="col">付款日期</th>
              <th scope="col">留言訊息</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    {order.user?.name}
                    {order.user?.email}
                  </td>
                  <td>${order.total}</td>
                  <td>
                    {order.is_paid ? (
                      <span className="text-success fw-bold">付款完成</span>
                    ) : (
                      "未付款"
                    )}
                  </td>
                  <td>
                    {order.paid_date
                      ? new Date(order.paid_date * 1000).toLocaleString()
                      : "未付款"}
                  </td>
                  <td>{order.message}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        openOrderModal(order);
                      }}
                    >
                      查看
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination pagination={pagination} changePage={getOrders} />
      </div>
    </>
  );
}
