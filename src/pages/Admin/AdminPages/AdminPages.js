import React, { useEffect, useState } from "react";
import style from "./AdminPages.module.scss";
import classNames from "classnames/bind";
import AddAdmin from "./AddAdmin/AddAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faLock,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function AdminPages() {
  const [listDoAn, setListDoAn] = useState([]);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const fetchtNhanVien = () => {
    axios.get("/admin/get").then((res) => {
      if (res) {
        setListDoAn(res.data);
      }
    });
  };
  const handleBlock = (item) => {};
  useEffect(() => {
    fetchtNhanVien();
  }, [listDoAn]);
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/admin");
    }
  }, [navigate]);
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>DANH SÁCH NHÂN VIÊN </p>
      <div className={cx("list-btn")}>
        <button className={cx("add")} onClick={() => setModal(true)}>
          THÊM MỚI
        </button>
        <button className={cx("excel")}>XUẤT EXCEL</button>
      </div>
      <div className={cx("form-table")}>
        <table border={1} cellSpacing={0} className={cx("table")}>
          <tr className={cx("tr-th")}>
            <th>STT</th>
            <th>username</th>
            <th>Trạng thái</th>
            <th>Xử lý</th>
          </tr>
          {listDoAn.map((item, index) => {
            return (
              <tr className={cx("tr-td")}>
                <td>{index + 1}</td>
                <td>{item.username_admin}</td>
                <td>{item.trang_thai === 0 ? "Chưa hiển thị" : "Hiển thị"}</td>
                <td className={cx("action")}>
                  <FontAwesomeIcon icon={faPen} className={cx("edit")} />
                  <FontAwesomeIcon
                    icon={faLock}
                    className={cx("lock")}
                    onClick={() => handleBlock(item.ma_do_an)}
                  />
                  <FontAwesomeIcon icon={faTrash} className={cx("delete")} />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {modal === true ? <AddAdmin handleClose={() => setModal(false)} /> : ""}
    </div>
  );
}
