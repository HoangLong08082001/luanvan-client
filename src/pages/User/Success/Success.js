import React, { useEffect, useState } from "react";
import style from "./Success.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import axios from "../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function Success() {
  const navigate = useNavigate();
  function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  const [orderInfo, setOrderInfo] = useState("");
  const [amount, setAmount] = useState("");
  const [total_amount, setTotalAmount] = useState("");
  const [id_tam_tinh, setIdTamTinh] = useState("");
  const fetchData = () => {
    let url = window.location.href;
    const urlObj = new URL(url);

    // Sử dụng URLSearchParams để lấy các tham số từ query string
    const params = new URLSearchParams(urlObj.search);
    const id = url.split("/").pop().split("?")[0];
    console.log("ID:", id); // Output: ID: 2

    // Lấy tham số thứ nhất (1800000)
    const searchParams = new URLSearchParams(url.split("?")[1]);
    const param1 = searchParams.entries().next().value[0];
    console.log("Parameter 1:", param1); // Output: Parameter 1: 1800000

    // Lấy giá trị của tham số amount
    const amountParam = searchParams.get("amount");
    console.log("Amount:", amountParam);
    // Lấy giá trị của các tham số
    setOrderInfo(params.get("paymentOption"));
    setAmount(params.get("amount"));
    setTotalAmount(param1);
    setIdTamTinh(id);
  };
  const addBill = () => {
    try {
      axios
        .post("/hoa-don/create", {
          orderInfo: orderInfo,
          amount: amount,
          total_amount: total_amount,
          id_tam_tinh: id_tam_tinh,
        })
        .then((res) => {
          if (res) {
            navigate("/");
          }
        });
    } catch (error) {
      if (error.response.status >= 500) {
        alert("Error system");
      } else {
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("form-img")}>
          <img
            src="https://www.shareicon.net/data/512x512/2016/07/07/792201_success_512x512.png"
            className={cx("image")}
            alt=""
          />
        </div>
        <p className={cx("title")}>THANH TOÁN THÀNH CÔNG</p>
        <div className={cx("method")}>
          <p className={cx("title-method")}>Phương thức thanh toán</p>
          <p className={cx("content")}>Thanh toán qua {orderInfo}</p>
        </div>
        <div className={cx("method")}>
          <p className={cx("title-method")}>Số tiền đã thanh toán</p>
          <p className={cx("content")}>{formatCurrency(amount)}</p>
        </div>
        <button className={cx("btn-back")} onClick={addBill}>
          TRỞ LẠI TRANG CHỦ
        </button>
      </div>
    </div>
  );
}
