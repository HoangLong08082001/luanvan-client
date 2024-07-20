import React, { useEffect, useState } from "react";
import style from "./ChiNhanh.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faLock,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../../setup-axios/axios";
import { useNavigate } from "react-router-dom";
import AddChiNhanh from "./AddChiNhanh/AddChiNhanh";
const cx = classNames.bind(style);
export default function ChiNhanh() {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [listChiNhanh, setListChiNhanh] = useState([]);
  const navigate = useNavigate();
  const [load,setLoad] = useState(true);

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/admin");
    }
  }, [navigate]);
  const fetchChiNhanh = async () => {
    await axios.get("/chi-nhanh/get-all").then((res) => {
      if (res) {
        setListChiNhanh(res.data);
        setLoad(false);
      }
    });
  };
  const handleLock = (item) => {
    axios
      .put("/chi-nhanh/block", {
        id_chi_nhanh: item,
      })
      .then((res) => {
        alert("Block successfully");
      });
      setLoad(true)
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/chi-nhanh/delete/${id}`).then((res) => {
        if (res) {
          alert("Delete successfully");
        }
      });
    } catch (error) {
      if (error.response.status >= 500) {
        alert("Error system");
      } else {
        alert(error.response.data.message);
      }
    }
    setLoad(true)

  };

  const closeModel = ()=>{
    setLoad(true);
    setModal(false);
    setId(null);
  }

   async function editModel(itemId){
    await setModal(true);
    await setId(itemId);
  }


  useEffect(() => {
    fetchChiNhanh();
  }, [load]);
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>CHI NHÁNH </p>
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
            <th>Tên chi nhánh</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Xử lý</th>
          </tr>
          {listChiNhanh.map((item, index) => {
            return (
              <tr className={cx("tr-td")}>
                <td>{index + 1}</td>
                <td>{item.ten_chi_nhanh}</td>
                <td>
                  {item.dia_chi}, {item.ten_phuong}, {item.ten_quan}
                </td>
                <td>{item.trang_thai === 0 ? "Chưa hiển thị" : "Hiển thị"}</td>
                <td className={cx("action")}>
                  <FontAwesomeIcon
                    icon={faPen}
                    className={cx("edit")}
                    onClick={() => editModel(item.ma_chi_nhanh)}
                  />
                  <FontAwesomeIcon
                    icon={faLock}
                    className={cx("lock")}
                    onClick={() => handleLock(item.ma_chi_nhanh)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDelete(item.ma_chi_nhanh)}
                    className={cx("delete")}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {modal === true ? (
        <AddChiNhanh setModalFalse={closeModel} id={id} />
      ) : (
        ""
      )}
    </div>
  );
}
