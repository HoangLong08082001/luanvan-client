import React, { useEffect, useState } from "react";
import style from "./AddDungCuYTe.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function AddDungCuYTe({ setModalFalse, id = null }) {
  const [ten, setTen] = useState("");
  const [gia, setGia] = useState("");
  const [soluong, setSoluong] = useState("");
  const [hinhanh, setHinhanh] = useState("");

  const getDungCuYTeId = () => {
    axios.get(`/dung-cu-y-te/get-by-id/${id}`).then((res) => {
      if (res) {
        let yTe = res?.data[0];
        setTen(yTe.ten_dung_cu_y_te);
        setGia(yTe.gia_dung_cu);
        setSoluong(yTe.so_luong);
        setHinhanh(yTe.hinh_anh);
      }
    });
  };

  const handleSubmit = () => {
    if (ten === "" || gia === "" || soluong === "" || hinhanh) {
      alert("Không để trống");
    } else {
      try {
        if (id) {
          axios
            .put("/dung-cu-y-te/update", {
              id_dung_cu: id,
              hinh_anh: hinhanh,
              so_luong: soluong,
              ten_dung_cu: ten,
              gia_dung_cu: gia,
            })
            .then((res) => {
              if (res) {
                alert("Create new successfully");
              }
            });
        }
        if (id == null) {
          axios
            .post("/dung-cu-y-te/create", {
              hinhanh: hinhanh,
              soluong: soluong,
              tendungcuyte: ten,
              gia: gia,
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
    setTen("");
    setGia("");
    setSoluong("");
    setHinhanh("");
    setModalFalse();
  };

  useEffect(() => {
    if (id) {
      getDungCuYTeId();
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
            <label htmlFor="">Tên dụng cụ</label>
            <input
              type="text"
              value={ten}
              onChange={(e) => setTen(e.target.value)}
              placeholder="Nhập tên"
            />
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="">Giá dụng cụ</label>
            <input
              type="number"
              placeholder="Nhập giá"
              value={gia}
              onChange={(e) => setGia(e.target.value)}
            />
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="">Số lượng</label>
            <input
              type="number"
              placeholder="Nhập số lượng"
              value={soluong}
              onChange={(e) => setSoluong(e.target.value)}
            />
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="">Hình ảnh</label>
            <input
              value={hinhanh}
              onChange={(e) => setHinhanh(e.target.value)}
              type="text"
              placeholder="Dán đường link hình ảnh"
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
