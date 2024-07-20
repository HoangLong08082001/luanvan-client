import React, { useEffect, useState } from "react";
import style from "./AddNuocUong.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function AddNuocUong({ handleClose }) {
  const [listLoai, setListLoai] = useState([]);
  const [ten, setTen] = useState("");
  const [soluong, setSoLuong] = useState("");
  const [maloai, setMaloai] = useState("");
  const [hinhanh, setHinhAnh] = useState("");
  const [gia, setGia] = useState("");
  const fetchLoai = () => {
    axios.get("/nuoc-uong/get-loai-nuoc").then((res) => {
      if (res) {
        setListLoai(res.data);
      }
    });
  };

  const handleSubmit = async () => {
    if (
      ten === "" ||
      soluong === "" ||
      maloai === "" ||
      hinhanh === "" ||
      gia === ""
    ) {
      alert("Không để trống");
    } else {
      await axios
        .post("/nuoc-uong/create", {
          ten: ten,
          soluong: soluong,
          maloai: maloai,
          hinhanh: hinhanh,
          gia: gia,
        })
        .then((res) => {
          if (res) {
            alert("Create new Successfully");
          }
        });
    }
  };
  useEffect(() => {
    fetchLoai();
  }, [listLoai]);
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
            <label htmlFor="">Tên nước uống</label>
            <input
              type="text"
              value={ten}
              onChange={(e) => setTen(e.target.value)}
              placeholder="Nhập tên"
            />
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="">Loại nước uống</label>
            <select
              name=""
              id=""
              value={maloai}
              onChange={(e) => setMaloai(e.target.value)}
            >
              <option value={""}>Vui long chon</option>
              {listLoai.map((item, index) => {
                return (
                  <option value={item.ma_loai_nuoc_uong}>
                    {item.ten_loai}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="">Giá nước uống</label>
            <input
              type="text"
              value={gia}
              onChange={(e) => setGia(e.target.value)}
              placeholder="Nhập giá"
            />
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="">Số lượng</label>
            <input
              type="text"
              value={soluong}
              onChange={(e) => setSoLuong(e.target.value)}
              placeholder="Nhập số lượng"
            />
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="">Hình ảnh</label>
            <input
              type="text"
              value={hinhanh}
              onChange={(e) => setHinhAnh(e.target.value)}
              placeholder="Dán đường link hình ảnh"
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
