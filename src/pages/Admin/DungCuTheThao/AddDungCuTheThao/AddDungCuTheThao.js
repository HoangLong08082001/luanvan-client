import React, { useEffect, useState } from "react";
import style from "./AddDungCuTheThao.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../../setup-axios/axios";
const cx = classNames.bind(style);

export default function AddDungCuTheThao({ setModalFalse, id = null }) {
  const [ten, setTen] = useState("");
  const [gia, setGia] = useState("");
  const [soluong, setSoLuong] = useState("");
  const [hinhanh, setHinhAnh] = useState("");

  const getDungCuTheThaoId = () => {
    axios.get(`/dung-cu-the-thao/get-by-id/${id}`).then((res) => {
      if (res) {
        let theThao = res?.data[0];
        setTen(theThao.ten_dung_cu_the_thao);
        setGia(theThao.gia_dung_cu);
        setSoLuong(theThao.so_luong);
        setHinhAnh(theThao.hinh_anh);
      }
    });
  };

  const handleSubmit = () => {
    if (ten === "" || gia === "" || soluong === "" || hinhanh === "") {
      alert("Không để trống");
    } else {
      try {
        if (id) {
          axios
            .put("/dung-cu-the-thao/update", {
              id_dung_cu: id,
              hinh_anh: hinhanh,
              so_luong: soluong,
              ten_dung_cu: ten,
              gia: gia,
            })
            .then((res) => {
              if (res) {
                alert("Create new successfully");
              }
            });
        }
        if (id == null) {
          axios
            .post("/dung-cu-the-thao/create", {
              hinhanh: hinhanh,
              soluong: soluong,
              tendungcuthethao: ten,
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
    setSoLuong("");
    setHinhAnh("");
    setModalFalse();
  };

  useEffect(() => {
    if (id) {
      getDungCuTheThaoId();
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
              placeholder="Nhập tên"
              value={ten}
              onChange={(e) => setTen(e.target.value)}
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
              onChange={(e) => setSoLuong(e.target.value)}
            />
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="">Hình ảnh</label>
            <input
              type="text"
              placeholder="Dán đường link hình ảnh"
              value={hinhanh}
              onChange={(e) => setHinhAnh(e.target.value)}
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
