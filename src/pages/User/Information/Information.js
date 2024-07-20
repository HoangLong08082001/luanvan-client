import React, { useEffect, useState } from "react";
import style from "./Information.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "../../../setup-axios/axios";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);
export default function Information() {
  const navigate = useNavigate();
  const formatDateTimeVN = (dateStr) => {
    const date = new Date(dateStr);

    // Chuyển đổi sang múi giờ Việt Nam (UTC+7)
    const vietnamOffset = 7 * 60; // Phút
    const localOffset = date.getTimezoneOffset(); // Phút
    const vietnamTime = new Date(
      date.getTime() + (vietnamOffset + localOffset) * 60 * 1000
    );

    // Lấy các thành phần ngày, tháng, năm, giờ, phút, giây
    const day = String(vietnamTime.getDate()).padStart(2, "0");
    const month = String(vietnamTime.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = vietnamTime.getFullYear();
    const hours = String(vietnamTime.getHours()).padStart(2, "0");
    const minutes = String(vietnamTime.getMinutes()).padStart(2, "0");
    const seconds = String(vietnamTime.getSeconds()).padStart(2, "0");

    // Tạo chuỗi định dạng dd-mm-yyyy hh:mm:ss
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };
  function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const fetchHoaDon = async () => {
    try {
      await axios
        .get(
          `${
            axios.defaults.baseURL
          }/hoa-don/get-hoa-don-by-ma-khach-hang/${localStorage.getItem("id")}`
        )
        .then((res) => {
          if (res) {
            setList(res.data.don_gia);
          }
        });
    } catch (error) {}
  };
  const fetchInfor = async () => {
    try {
      await axios
        .get(`/khach-hang/get-all-by-id/${localStorage.getItem("id")}`)
        .then((res) => {
          setName(res.data[0].ten_khach_hang);
          setEmail(res.data[0].email);
          setNumber(res.data[0].so_dien_thoai);
        });
    } catch (error) {}
  };
  useEffect(() => {
    fetchInfor();
    fetchHoaDon();
  }, []);
  if (localStorage.getItem("id") && localStorage.getItem("email")) {
    return (
      <div className={cx("wrapper")}>
        <p className={cx("title")}>Thông tin khách hàng</p>
        <div className={cx("container")}>
          <div className={cx("left")}>
            <input
              disabled
              type="text"
              value={name}
              className={cx("form-input")}
            />
            <input
              disabled
              type="text"
              value={email}
              className={cx("form-input")}
            />
            <input
              disabled
              type="text"
              value={number}
              className={cx("form-input")}
            />
          </div>
          <div className={cx("right")}>
            <p className={cx("title")}>Hoá đơn đã thanh toán</p>
            <div className={cx("list")}>
              <table>
                <tr>
                  <th>Tổng tiền</th>
                  <th>Tiền đã thanh toán</th>
                  <th>Phương thức thanh toán</th>
                  <th>Trạng thái</th>
                  <th>Ngày thanh toán</th>
                  <th></th>
                </tr>
                {list.map((item, index) => {
                  return (
                    <tr>
                      <td>{formatCurrency(item.tong_tien)}</td>
                      <td>{formatCurrency(item.tien_da_thanh_toan)}</td>
                      <td>{item.phuong_thuc}</td>
                      <td>
                        {item.trang_thai_thanh_toan === 1
                          ? "Đã thanh toán"
                          : "Thanh toán 50%"}
                      </td>
                      <td>{formatDateTimeVN(item.ngay_tao)}</td>
                      <td>
                        <button className={cx("btn-detail")}>Chi tiết</button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    navigate("/trang-chu");
  }
}
