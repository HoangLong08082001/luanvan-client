import React, { useState } from "react";
import style from "./ForgotPassword.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import axios from "../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const sendMail = () => {
    if (email !== "") {
      try {
        axios
          .post("/admin/send-mail", {
            email: email,
          })
          .then((res) => {
            if (res) {
              alert("Gửi mail thành công! Vui lòng kiểm tra mail");
            }
          });
      } catch (error) {}
    } else {
      alert("Không được để trống");
    }
  };
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>TRANG QUÊN MẬT KHẨU</p>
      <div className={cx("form")}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Nhập username đăng nhập"
          className={cx("form-input")}
        />
      </div>

      <button className={cx("login")} onClick={sendMail}>
        GỬI MAIL
      </button>
      <Link className={cx("forgot")} to="/admin">
        Quay lại trang đăng nhập
      </Link>
    </div>
  );
}
