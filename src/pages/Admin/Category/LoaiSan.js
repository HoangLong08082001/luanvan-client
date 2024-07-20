import React, { useEffect, useState } from "react";
import style from "./LoaiSan.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faLock,
  faTrashCan,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../../setup-axios/axios";
import { useNavigate } from "react-router-dom";
import AddCategory from "./AddCategory/AddCategory";

const cx = classNames.bind(style);
export default function LoaiSan() {
  const [modal, setModal] = useState(false);
  const [listLoai, setListLoai] = useState([]);
  const [load,setLoad] = useState(true);
  const [id, setId] = useState(null);

  const fetchLoaiSan = async () => {
    await axios.get("/loai-san/get-all").then((res) => {
      if (res) {
        setListLoai(res.data);
        setLoad(false)
      }
    });
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`/loai-san/delete/${id}`).then((res) => {
        if (res) {
          alert("Delete successfuly");
        }
      });
    } catch (error) {
      if (error.response.status >= 500) {
        alert("Error System");
      } else {
        alert(error.response.data.message);
      }
    }
    setLoad(false)

  };
  const handleBlock = async (item) => {
    try {
      await axios
        .put(`/loai-san/block`, {
          ma_loai_san: item,
        })
        .then((res) => {
          if (res) {
            alert("Block successfully");
            fetchLoaiSan();
          }
        });
    } catch (error) {}
    setLoad(false)
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
    fetchLoaiSan();
  },[load]);
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>LOẠI SÂN</p>
      <div className={cx("list-btn")}>
        <button className={cx("add")} onClick={() => setModal(true)}>
          THÊM MỚI
        </button>
        <button className={cx("excel")}>XUẤT EXCEL</button>
      </div>
      {/* loai_san description hinh_anh trang_thai ma_chi_nhanh */}
      <div className={cx("form-table")}>
        <table border={1} cellSpacing={0} className={cx("table")}>
          <tr className={cx("tr-th")}>
            <th>STT</th>
            <th>Tên loại sân</th>
            <th>trạng thái</th>
            <th>Xử lý</th>
          </tr>
          {listLoai.map((item, index) => {
            return (
              <tr className={cx("tr-td")}>
                <td>{index + 1}</td>
                <td>{item.ten_loai_san}</td>
                <td>{item.trang_thai === 1 ? "Hiển thị" : "Chưa hiển thị"}</td>

                <td className={cx("action")}>
                  <FontAwesomeIcon 
                    icon={faPen} 
                    className={cx("edit")}
                    onClick={() => editModel(item.ma_loai_san)}
                    />
                  <FontAwesomeIcon
                    icon={item.trang_thai === 1 ? faLock : faUnlock}
                    className={cx(
                      item.trang_thai === 1 ? "lock" : "lock-active"
                    )}
                    onClick={() => handleBlock(item.ma_loai_san)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={cx("delete")}
                    onClick={() => deleteCategory(item.ma_loai_san)}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {modal === true && <AddCategory setModalFalse={closeModel} id={id} />}
    </div>
  );
}
