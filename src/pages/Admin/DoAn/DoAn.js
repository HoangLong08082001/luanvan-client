import React, { useEffect, useState } from "react";
import style from "./DoAn.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faLock,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../../setup-axios/axios";
import AddDoAn from "./AddDoAn/AddDoAn";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);
export default function DoAn() {
  function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  const [listDoAn, setListDoAn] = useState([]);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [load,setLoad] = useState(true);
  const [id, setId] = useState(null);



  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/admin");
    }
  }, [navigate]);
  const fetchDoAn = async () => {
    await axios.get("/do-an/get-all").then((res) => {
      if (res) {
        setListDoAn(res.data);
        setLoad(false);
      }
    });
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


  const handleBlock = (item) => {
    axios
      .put("/do-an/block", {
        id_do_an: item,
      })
      .then((res) => {
        if (res) {
          fetchDoAn();
        }
      });
      setLoad(true);
  };
  const deleteDoAn = async (item) => {
    try {
      await axios.delete(`/do-an/delete/${item}`).then((res) => {
        if (res) {
          alert("Xoá thành công");
        }
      });
    } catch (error) {
      if (error.response.status >= 500) {
        alert("Error system");
      } else {
        alert(error.response.data.message);
      }
    }
    setLoad(true);
  };
  useEffect(() => {
    fetchDoAn();
  }, [load]);
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>ĐỒ ĂN </p>
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
            <th>Tên đồ ăn</th>
            <th>Giá đồ ăn</th>
            <th>Trạng thái</th>
            <th>Hình ảnh</th>
            <th>Xử lý</th>
          </tr>
          {listDoAn.map((item, index) => {
            return (
              <tr className={cx("tr-td")}>
                <td>{index + 1}</td>
                <td>{item.ten_do_an}</td>
                <td>{formatCurrency(item.gia_do_an)}</td>
                <td>{item.trang_thai === 0 ? "Chưa hiển thị" : "Hiển thị"}</td>
                <td>
                  {" "}
                  <img className={cx("img")} src={item.hinh_anh} alt="" />
                </td>
                <td className={cx("action")}>
                  <FontAwesomeIcon 
                    icon={faPen} 
                    className={cx("edit")}
                    onClick={()=>editModel(item.ma_do_an)} />
                  <FontAwesomeIcon
                    icon={faLock}
                    className={cx("lock")}
                    onClick={() => handleBlock(item.ma_do_an)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={cx("delete")}
                    onClick={() => deleteDoAn(item.ma_do_an)}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {modal === true ? <AddDoAn setModalFalse={closeModel} id={id}/> : ""}
    </div>
  );
}
