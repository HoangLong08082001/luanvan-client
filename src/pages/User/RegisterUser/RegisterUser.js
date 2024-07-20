import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import style from "./RegisterUser.module.scss";
import classNames from "classnames/bind";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function RegisterUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [hide, setHide] = useState(false);
  const [hideConfirm, setHideConfirm] = useState(false);
  const validatePassword = () => {
    if (passwordConfirm !== password) {
      alert("Password not match");
      return false;
    }
    return true;
  };
  const handleSignUp = () => {
    let check = validatePassword();
    if (check === true) {
      axios
        .post("/khach-hang/register", {
          ten_nguoi_dung: name,
          email: email,
          password: password,
          sodienthoai: soDienThoai,
        })
        .then((res) => {
          if (res) {
            alert("Register successfully");
            navigate("/dang-nhap");
          }
        });
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form")}>
        <p className={cx("title-login")}>TRANG ĐĂNG KÝ</p>
        <div className={cx("form-login")}>
          <div className={cx("form-input")}>
            <input
              type="text"
              name=""
              id=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên khách hàng"
            />
          </div>
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
          <div className={cx("form-input")}>
            <input
              type="text"
              name=""
              id=""
              value={soDienThoai}
              onChange={(e) => setSoDienThoai(e.target.value)}
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div className={cx("form-input")}>
            <input
              type={hide === false ? "password" : "text"}
              name=""
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
            />
            <p className={cx("hide")} onClick={() => setHide(!hide)}>
              Hiện mật khẩu{" "}
              <FontAwesomeIcon icon={hide === false ? faLock : faUnlock} />
            </p>
          </div>
          <div className={cx("form-input")}>
            <input
              type={hideConfirm === false ? "password" : "text"}
              name=""
              id=""
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Nhập lại mật khẩu"
            />
            <p
              className={cx("hide")}
              onClick={() => setHideConfirm(!hideConfirm)}
            >
              Hiện mật khẩu{" "}
              <FontAwesomeIcon
                icon={hideConfirm === false ? faLock : faUnlock}
              />
            </p>
          </div>
          <button className={cx("btn-login")} onClick={handleSignUp}>
            ĐĂNG KÝ
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
