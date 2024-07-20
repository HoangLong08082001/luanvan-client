import React, { useEffect, useState } from "react";
import style from "./ReNewPass.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function ReNewPass() {
  let url = window.location.href;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [hide, setHide] = useState(false);
  const [hideConfirm, setHideConfirm] = useState(false);
  useEffect(() => {
    const lastSlashIndex = url.lastIndexOf("/");
    const lastPart = url.substring(lastSlashIndex + 1);
    setUsername(lastPart);
  }, []);
  const validate = () => {
    if (password === "" || passwordConfirm === "") {
      alert("Không được để trống");
      return false;
    }
    if (passwordConfirm !== password) {
      alert("Mật khẩu không trùng");
      return false;
    }
    return true;
  };
  const reNew = () => {
    if (validate() === true) {
      try {
        axios
          .put("/khach-hang/re-new", {
            email: username,
            password: password,
          })
          .then((res) => {
            if (res) {
              navigate("/success-new-password");
            }
          });
      } catch (error) {
        if (error.response.status >= 500) {
          alert("error system");
        }
      }
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form")}>
        <p className={cx("title-login")}>TRANG TẠO MẬT KHẨU MỚI</p>
        <div className={cx("form-login")}>
          <div className={cx("form-input")}>
            <input
              type="text"
              name=""
              disabled
              id=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập email"
            />
          </div>
          <div className={cx("form-input")}>
            <input
              type={hide === false ? "password" : "text"}
              name=""
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới"
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
          <button className={cx("btn-login")} onClick={reNew}>
            TẠO MỚI
          </button>
        </div>
      </div>
    </div>
  );
}
