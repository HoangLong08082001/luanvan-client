import React, { useContext, useState } from "react";
import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/UserContext";
const cx = classNames.bind(style);
export default function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [nameTemp, setNameTemp] = useState(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.clear("jwt");
    navigate("/admin");
  };
  return (
    <div className={cx("wrapper")}>
      <ul>
        <li>
          <Link className={cx("link")} to="/admin-trang-chu">
            Trang chủ
          </Link>
        </li>
        <li>
          <Link className={cx("link")} to="/admin-chi-nhanh">
            Chi nhánh
          </Link>
        </li>
        <li>
          <Link className={cx("link")} to="/admin-do-an">
            Đồ ăn
          </Link>
        </li>
        <li>
          <Link className={cx("link")} to="/admin-dung-cu-y-te">
            Dụng cụ y tế
          </Link>
        </li>
        <li>
          <Link className={cx("link")} to="/admin-dung-cu-the-thao">
            Dụng cụ thể thao
          </Link>
        </li>
        {/* <li>
          <Link className={cx("link")} to="">
            Khách hàng
          </Link>
        </li> */}
        <li>
          <Link className={cx("link")} to="/admin-page">
            Nhân viên
          </Link>
        </li>
        <li>
          <Link className={cx("link")} to="/admin-nuoc-uong">
            Nước uống
          </Link>
        </li>

        <li>
          <Link className={cx("link")} to="/admin-loai-san">
            Loại sân
          </Link>
        </li>
        <li>
          <Link className={cx("link")} to="/admin-san">
            Sân
          </Link>
        </li>
        <li>
          <Link className={cx("link")} to="/admin-don-gia">
            Hoá đơn
          </Link>
        </li>
        <li>
          <p className={cx("logout")} onClick={handleLogout}>
            Đăng xuất
          </p>
        </li>
      </ul>
    </div>
  );
}
