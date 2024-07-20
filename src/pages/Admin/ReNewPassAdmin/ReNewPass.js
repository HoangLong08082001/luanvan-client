import React, { useEffect, useState } from "react";
import style from "./ReNewPass.module.scss";
import classNames from "classnames/bind";
import axios from "../../../setup-axios/axios";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);
export default function ReNewPassAdmin() {
  const navigate = useNavigate();
  let url = window.location.href;
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [hideShow, setHideShow] = useState(false);
  const [hideShow1, setHideShow1] = useState(false);
  useEffect(() => {
    const lastSlashIndex = url.lastIndexOf("/");
    const lastPart = url.substring(lastSlashIndex + 1);
    setUsername(lastPart);
  }, []);
  const confirm = () => {
    if (pass === "" || passConfirm === "") {
      alert("Không được để trống");
    }
    if (pass !== passConfirm) {
      alert("Mật khẩu không trùng khớp");
    } else {
      axios
        .put("/admin/re-new", {
          email: username,
          password: pass,
        })
        .then((res) => {
          if (res) {
            navigate("/success-new-password");
          }
        });
    }
  };
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>TRANG CẤP LẠI MẬT KHẨU</p>
      <div className={cx("form")}>
        <input
          type="text"
          value={username}
          placeholder="Nhập username đăng nhập"
          className={cx("form-input")}
        />
      </div>
      <div className={cx("form")}>
        <input
          type={hideShow === false ? "password" : "text"}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Nhập mật khẩu"
          className={cx("form-input")}
        />
        <p className={cx("hide")} onClick={() => setHideShow(!hideShow)}>
          Hiện mật khẩu
        </p>
      </div>
      <div className={cx("form")}>
        <input
          type={hideShow1 === false ? "password" : "text"}
          value={passConfirm}
          onChange={(e) => setPassConfirm(e.target.value)}
          placeholder="Nhập lại mật khẩu"
          className={cx("form-input")}
        />
      </div>
      <p className={cx("hide")} onClick={() => setHideShow1(!hideShow1)}>
        Hiện mật khẩu
      </p>
      <button className={cx("login")} onClick={confirm}>
        TẠO MỚI
      </button>
    </div>
  );
}
