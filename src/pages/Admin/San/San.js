import React, { useEffect, useState } from "react";
import style from "./San.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faLock,
  faTrashCan,
  faUnlock,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../../setup-axios/axios";
import AddSan from "./AddSan/AddSan";
import { useNavigate } from "react-router-dom";
import AddSlot from "./AddSlot/AddSlot";
const cx = classNames.bind(style);

export default function San() {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [listSan, setListSan] = useState([]);
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/admin");
    }
  }, [navigate]);
  const fetchListSan = () => {
    axios.get("/san/get-all").then((res) => {
      if (res) {
        setListSan(res.data);
        setLoad(false);
      }
    });
  };
  const handleBlock = (item) => {
    axios
      .put("/san/block", {
        ma_san: item,
      })
      .then((res) => {
        if (res) {
          alert("Block successfully");
          fetchListSan();
        }
      });
    setLoad(false);
  };

  const closeModel = () => {
    setLoad(true);
    setModal(false);
    setId(null);
  };
  const closeModel1 = () => {
    setModal1(false);
  };

  async function editModel(itemId) {
    await setModal(true);
    await setId(itemId);
  }

  useEffect(() => {
    fetchListSan();
  }, [load]);

  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>SÂN</p>
      <div className={cx("list-btn")}>
        <button className={cx("add")} onClick={() => setModal(true)}>
          THÊM MỚI
        </button>
        <button className={cx("addSlot")} onClick={() => setModal1(true)}>
          KHUNG GIỜ
        </button>
        <button className={cx("excel")}>XUẤT EXCEL</button>
      </div>
      {/* loai_san description hinh_anh trang_thai ma_chi_nhanh */}
      <div className={cx("form-table")}>
        <table border={1} cellSpacing={0} className={cx("table")}>
          <tr className={cx("tr-th")}>
            <th>STT</th>
            <th>Tên sân</th>
            <th>trạng thái</th>
            <th>Chi nhánh</th>
            <th>Hình ảnh</th>
            <th>Xử lý</th>
          </tr>
          {listSan.map((item, index) => {
            return (
              <tr className={cx("tr-td")}>
                <td>{index + 1}</td>
                <td>{item.ten_san}</td>
                <td>{item.trang_thai === 1 ? "Hiển thị" : "Chưa hiển thị"}</td>
                <td>{item.ten_chi_nhanh}</td>
                <td>
                  <img className={cx("img")} src={item.hinh_anh} alt="" />
                </td>
                <td className={cx("action")}>
                  <FontAwesomeIcon
                    icon={faPen}
                    className={cx("edit")}
                    onClick={() => editModel(item.ma_san)}
                  />
                  <FontAwesomeIcon
                    icon={item.trang_thai === 1 ? faLock : faUnlock}
                    className={cx(
                      item.trang_thai === 1 ? "lock" : "lock-active"
                    )}
                    onClick={() => handleBlock(item.ma_san)}
                  />
                  <FontAwesomeIcon icon={faEye} className={cx("delete")} />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {modal === true ? <AddSan setModalFalse={closeModel} id={id} /> : ""}
      {modal1 === true ? <AddSlot setModalFalse1={closeModel1} /> : ""}
    </div>
  );
}
