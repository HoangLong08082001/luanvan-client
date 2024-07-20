import React, { useEffect, useState } from "react";
import style from "./AddDoAn.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function AddDoAn({ setModalFalse, id = null }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");

  const getDoAnId = () => {
    axios.get(`/do-an/get-by-id/${id}`).then((res) => {
      if (res) {
        let doAn = res?.data[0];
        setName(doAn.ten_do_an);
        setPrice(doAn.gia_do_an);
        setImg(doAn.hinh_anh);
      }
    });
  };

  const handleSubmit = async () => {
    if (name === "" || price === "" || img === "") {
      alert("Không để trống");
    } else {
      try {
        if (id) {
          await axios
            .put("/do-an/update ", {
              id_do_an: id,
              ten_do_an: name,
              gia_do_an: price,
              hinh_anh: img,
            })
            .then((res) => {
              if (res) {
                alert("Create new successfully");
              }
            });
        }
        if (id == null) {
          await axios
            .post("/do-an/create", {
              tendoan: name,
              gia: price,
              hinhanh: img,
            })
            .then((res) => {
              if (res) {
                alert("Create new successfully");
              }
            });
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setPrice("");
    setImg("");
    setModalFalse();
  };

  useEffect(() => {
    if (id) {
      getDoAnId();
    }
  }, [id]);

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
            <label htmlFor="">Tên đò ăn</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên đồ ăn"
            />
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="">Giá đồ ăn</label>
            <input
              type="number"
              placeholder="Nhập giá đồ ăn"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className={cx("form-input")}>
            <label htmlFor="">Hình ảnh</label>
            <input
              type="text"
              placeholder="Dán đường link hình ảnh"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit} className={cx("add")}>
            {id ? "CHỈNH SỬA" : "THÊM MỚI"}
          </button>
        </div>
      </div>
    </div>
  );
}
