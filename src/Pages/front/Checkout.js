import { get, useForm, useWatch } from "react-hook-form";
import { useOutletContext, Link } from "react-router-dom";
import { Input, Select, CheckboxRadio } from "../../components/FormElements";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { cartData } = useOutletContext();
  const [countries, setCountries] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const {
    control,
    watch,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );
      console.log(res.data);
      setCountries(res.data.data);
    })();
  }, []);

  const watchForm = useWatch({ control });

  // useEffect(() => {
  //   // getValues();
  // }, [watchForm]);

  const handleCheckList = (e) => {
    if (e.target.checked) {
      setCheckList(...checkList, e.target.value);
    } else {
      setCheckList(checkList.filter((item) => item !== e.target.value));
    }
  };

  const onSubmit = async (data) => {
    const { name, email, tel, address } = data;
    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address,
        },
      },
    };
    const res = await axios.post(
      `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
      form
    );
    console.log(res);
  };

  return (
    <div className="container">
      <div className="row justify-content-center flex-md-row flex-column-reverse">
        <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white p-4">
            <h4 className="fw-bold">1. Contact Form</h4>
            <p className="mt-2">Contact information</p>
            <div className="mb-2">
              <Input
                id="email"
                labelText="Email"
                type="email"
                errors={errors}
                register={register}
                rules={{
                  required: "Email 為必填",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email 格式不正確",
                  },
                }}
              ></Input>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input rounded-0"
                id="ContactLorem"
              />
              <label className="form-check-label" htmlFor="ContactLorem">
                Lorem ipsum dolor sit amet, consetetur
              </label>
            </div>
            <div className="mb-2">
              <Input
                id="username"
                type="text"
                errors={errors}
                labelText="使用者名稱"
                register={register}
                rules={{
                  required: "使用者名稱為必填",
                  maxLength: {
                    value: 10,
                    message: "使用者名稱長度不超過 10",
                  },
                }}
              ></Input>
            </div>
            <div className="mb-2">
              <Input
                id="tel"
                labelText="電話"
                type="tel"
                errors={errors}
                register={register}
                rules={{
                  required: "電話為必填",
                  minLength: {
                    value: 6,
                    message: "電話不少於 6 碼",
                  },
                  maxLength: {
                    value: 12,
                    message: "電話不超過 12 碼",
                  },
                }}
              ></Input>
            </div>
            <h4 className="fw-bold pt-3 pb-2">2. Shipping Form</h4>
            <p className="mt-2 mb-3">Shipping address</p>
            <div className="form-row">
              <div className="col mb-2">
                <Select
                  id="country"
                  labelText="COUNTRY"
                  errors={errors}
                  register={register}
                  rules={{
                    required: "Select your country",
                  }}
                >
                  <option value="">COUNTRY</option>
                  {countries.map((country) => {
                    return (
                      <option value={country.country} key={country.iso2}>
                        {country.country}
                      </option>
                    );
                  })}
                </Select>
              </div>
              <div className="col mb-2">
                <Select
                  id="city"
                  labelText="City"
                  errors={errors}
                  register={register}
                  // disabled={!getValues().country}
                  rules={{
                    required: "Select yout city",
                  }}
                >
                  <option value="">CITY</option>
                  {countries
                    .find((country) => country.country === getValues().country)
                    ?.cities?.map((city) => {
                      return (
                        <>
                          <option value={city} key={city}>
                            {city}
                          </option>
                        </>
                      );
                    })}
                </Select>
              </div>
              <Input
                id="address"
                labelText="地址"
                type="address"
                errors={errors}
                register={register}
                rules={{
                  required: "地址為必填",
                }}
              />
              <h4 className="mt-4 mb-2">Payment</h4>
              <div className="form-check mb-2">
                <div className="form-check ml-3">
                  <input
                    id="payment1"
                    type="checkbox"
                    name="Credit Card"
                    value="Credit Card"
                    onChange={handleCheckList}
                  />
                  <label htmlFor="checkList1">Credit Card</label>
                </div>
                <div className="form-check ml-3">
                  <input
                    id="payment2"
                    type="checkbox"
                    name="PayPal"
                    value="PayPal"
                    onChange={handleCheckList}
                  />
                  <label htmlFor="checkList1">PayPal</label>
                </div>
                <div className="form-check ml-3">
                  <input
                    id="payment3"
                    type="checkbox"
                    name="ApplePay"
                    value="ApplePay"
                    onChange={handleCheckList}
                  />
                  <label htmlFor="checkList1">ApplePay</label>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
              <Link to={"/cart"} className="text-dark mt-md-0 mt-3 btn">
                <i className="fas fa-chevron-left me-2"></i> RETURN TO CART
              </Link>
              <button
                type="submit"
                className="btn btn-dark py-3 px-7 rounded-0"
              >
                CONTINUE TO SHIPPING
              </button>
            </div>
          </div>
        </form>
        <div className="col-md-4">
          <div className="border p-4 mb-4">
            <h4 className="mb-4">Order Detail</h4>
            {cartData?.carts?.map((item) => {
              return (
                <>
                  <div className="d-flex mb-2" key={item.id}>
                    <img
                      src={item.product.imageUrl}
                      alt=""
                      className="me-2"
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="w-100">
                      <div className="d-flex justify-content-between fw-bold">
                        <p className="mb-0">{item.product.title}</p>
                        <p className="mb-0">{item.qty}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">
                          <small>NT${item.final_total}</small>
                        </p>
                        <p className="mb-0">NT{item.final_total}</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            <table className="table mt-4 border-top border-bottom text-muted">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="border-0 px-0 pt-4 font-weight-normal"
                  >
                    Subtotal
                  </th>
                  <td className="text-end border-0 px-0 pt-4">
                    NT${cartData.final_total}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                  >
                    Payment
                  </th>
                  <td className="text-end border-0 px-0 pt-0 pb-4">ApplePay</td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-between mt-4">
              <p className="mb-0 h4 fw-bold">Total</p>
              <p className="mb-0 h4 fw-bold">NT${cartData.final_total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
