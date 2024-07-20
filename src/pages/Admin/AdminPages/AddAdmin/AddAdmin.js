import React, { useState } from "react";
import style from "./AddAdmin.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function AddAdmin({ handleClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const validate = () => {
    if (username === "" || password === "") {
      alert("Không để trống");
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (validate() === true) {
      await axios
        .post("/admin/create", {
          username: username,
          password: password,
        })
        .then((res) => {
          if (res) {
            alert("Create new successfully");
          }
        });
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form")}>
        <FontAwesomeIcon
          onClick={handleClose}
          icon={faX}
          className={cx("icon")}
        />
        <div className={cx("form-add")}>
          <div className={cx("form-input")}>
            <label htmlFor="">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập username"
            />
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="">Mật khẩu</label>
            <input
              type="text"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={handleSubmit} className={cx("add")}>
            THÊM MỚI
          </button>
        </div>
      </div>
    </div>
  );
}
