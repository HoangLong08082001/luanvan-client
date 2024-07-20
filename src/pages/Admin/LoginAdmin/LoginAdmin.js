import React, { useContext, useState } from "react";
import style from "./LoginAdmin.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../setup-axios/axios";
import { AuthContext } from "../../../context/UserContext";
const cx = classNames.bind(style);
export default function LoginAdmin() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [hideShow, setHideShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      let res = await axios.post("/admin/login", {
        username: username,
        password: password,
      });

      if (res.data.message === "success") {
        const context = {
          isLoading: true,
          isAuthenticated: false,
          token: res.data.access_token,
          account: {
            data: res.data.data,
          },
        };
        alert("Success to login");
        login(context);
        navigate("/admin-trang-chu");
      }
    } catch (error) {
      if (error.response.status >= 500) {
        alert("SYSTEM ERROR");
      } else {
        alert("Khong ton tai account");
      }
    }
  };
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>TRANG ĐĂNG NHẬP ADMIN</p>
      <div className={cx("form")}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nhập username đăng nhập"
          className={cx("form-input")}
        />
      </div>
      <div className={cx("form")}>
        <input
          type={hideShow === false ? "password" : "text"}
          placeholder="Nhập passowrd đăng nhập"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={cx("form-input")}
        />
      </div>
      <p className={cx("hide")} onClick={() => setHideShow(!hideShow)}>
        Hiện mật khẩu
      </p>
      <button onClick={handleLogin} className={cx("login")}>
        ĐĂNG NHẬP
      </button>
      <Link className={cx("forgot")} to="/admin-quen-mat-khau">
        Quên mật khẩu
      </Link>
    </div>
  );
}
