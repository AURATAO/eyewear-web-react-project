import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductsModal from "../../components/ProductsModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import { Modal } from "bootstrap";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  //決定modal展開的用途 -- 這邊是要做編輯品項用
  const [type, setType] = useState("create");
  const [tempProduct, setTemProduct] = useState({});

  const productModal = useRef(null);
  const deleteModal = useRef(null);
  useEffect(() => {
    productModal.current = new Modal("#productModal", {
      backdrop: "static",
    });
    //要加上一個id  - "#productModal";
    //後面backdrop的部分是指當點擊外部modal時，並不會把視窗關掉

    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });

    getProducts();
  }, []);

  const getProducts = async (page = 1) => {
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
    );
    console.log(productRes);
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
  };

  const openProductModal = (type, product) => {
    setType(type);
    setTemProduct(product);
    productModal.current.show();
  };
  const closeProductModal = () => {
    productModal.current.hide();
  };
  const openDeleteModal = (product) => {
    setTemProduct(product);
    deleteModal.current.show();
  };
  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
      );
      if (res.data.success) {
        getProducts();
        deleteModal.current.hide();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="p-3">
        <ProductsModal
          closeProductModal={closeProductModal}
          getProducts={getProducts}
          type={type} //這邊傳進來是指屆時當modal被斬開時可以被使用
          tempProduct={tempProduct} //這邊傳進來是指屆時當modal被斬開時可以被使用
        />
        <DeleteModal
          close={closeDeleteModal}
          text={tempProduct.title}
          handleDelete={deleteProduct}
          id={tempProduct.id}
        />
        <h3>產品列表</h3>
        <hr />
        <div className="text-end">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => openProductModal("create", {})}
          >
            建立新商品
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">分類</th>
              <th scope="col">名稱</th>
              <th scope="col">售價</th>
              <th scope="col">啟用狀態</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.category}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.is_enabled ? "啟用" : "未啟用"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => openProductModal("edit", product)}
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
          <Pagination pagination={pagination} changePage={getProducts} />
        </table>
      </div>
    </>
  );
}
