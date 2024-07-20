import React, { useState } from "react";
import style from "./Forgot.modules.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import axios from "../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function Forgot() {
  const [email, setEmail] = useState("");
  const send = async () => {
    try {
      await axios
        .post(`${axios.defaults.baseURL}/khach-hang/send-mail`, {
          email: email,
        })
        .then((res) => {
          if (res) {
            alert("Gửi mail thành công! vui lòng kiểm tra mail");
            setEmail("");
          }
        });
    } catch (error) {}
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form")}>
        <p className={cx("title-login")}>NHẬP USERNAME ĐĂNG NHẬP</p>
        <div className={cx("form-login")}>
          <div className={cx("form-input")}>
            <input
              type="text"
              name=""
              id=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
            />
          </div>

          <button className={cx("btn-login")} onClick={send}>
            XÁC NHẬN
          </button>
          <div className={cx("list-link")}>
            <Link className={cx("dont")} to="/dang-nhap">
              Quay lại trang đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
