import React, { useEffect, useState } from "react";
import style from "./DungCuTheThao.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faLock,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../../setup-axios/axios";
import AddDungCuTheThao from "./AddDungCuTheThao/AddDungCuTheThao";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);
export default function DungCuTheThao() {
  function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  const [modal, setModal] = useState(false);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/admin");
    }
  }, [navigate]);
  const fetchDungCuYTe = async () => {
    await axios.get("/dung-cu-the-thao/get").then((res) => {
      if (res) {
        setList(res.data);
        setLoad(false);
      }
    });
  };
  const handleBlock = (item) => {
    axios
      .put("/dung-cu-the-thao/block", {
        id_dung_cu_the_thao: item,
      })
      .then((res) => {
        if (res) {
          fetchDungCuYTe();
        }
      });
    setLoad(false);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/dung-cu-the-thao/delete/${id}`).then((res) => {
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
    setLoad(false);
  };

  const closeModel = () => {
    setLoad(true);
    setModal(false);
    setId(null);
  };

  async function editModel(itemId) {
    await setModal(true);
    await setId(itemId);
  }

  useEffect(() => {
    fetchDungCuYTe();
  }, [load]);
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>DỤNG CỤ THỂ THAO </p>
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
            <th>Tên dụng cụ y tế</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Trạng thái</th>
            <th>Hình ảnh</th>
            <th>Xử lý</th>
          </tr>
          {list.map((item, index) => {
            return (
              <tr className={cx("tr-td")}>
                <td>{index + 1}</td>
                <td>{item.ten_dung_cu_the_thao}</td>
                <td>{formatCurrency(item.gia_dung_cu)}</td>
                <td>{item.so_luong}</td>
                <td>{item.trang_thai === 0 ? "Chưa hiển thị" : "Hiển thị"}</td>
                <td>
                  {" "}
                  <img className={cx("img")} src={item.hinh_anh} alt="" />
                </td>
                <td className={cx("action")}>
                  <FontAwesomeIcon
                    icon={faPen}
                    className={cx("edit")}
                    onClick={() => editModel(item.ma_dung_cu_the_thao)}
                  />
                  <FontAwesomeIcon
                    icon={faLock}
                    className={cx("lock")}
                    onClick={() => handleBlock(item.ma_dung_cu_the_thao)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={cx("delete")}
                    onClick={() => handleDelete(item.ma_dung_cu_the_thao)}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {modal === true ? (
        <AddDungCuTheThao setModalFalse={closeModel} id={id} />
      ) : (
        ""
      )}
    </div>
  );
}
