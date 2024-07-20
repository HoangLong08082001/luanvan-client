import React, { useEffect, useState } from "react";
import style from "./AddCategory.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function AddCategory({ setModalFalse, id = null }) {
  const [category, setCategory] = useState("");

  const getLoaiSanId = () => {
    axios.get(`/san/get-by-id/${id}`).then((res) => {
      if (res) {
        let loaiSan = res?.data;
        setCategory(loaiSan.name);
      }
    });
  };

  const handleSubmit = () => {
    if (category === "") {
      alert("Không để trống");
    } else {
      try {
        if (id) {
          axios
            .put("/loai-san/update", {
              id_loai_san: id,
              ten_loai_san: category,
            })
            .then((res) => {
              if (res) {
                alert("Add successfully");
              }
            });
        }
        if (id == null) {
          axios
            .post("/loai-san/create", {
              loai_san: category,
            })
            .then((res) => {
              if (res) {
                alert("Add successfully");
              }
            });
        }
      } catch (error) {
        if (error.response.status >= 500) {
          alert("Error System");
        } else {
          alert(error.response.data.message);
        }
      }
    }
    handleClose();
  };

  const handleClose = () => {
    setCategory("");
    setModalFalse();
  };

  useEffect(() => {
    if (id) {
      getLoaiSanId();
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
            <label htmlFor="">Loại sân</label>
            <input
              type="text"
              placeholder="Nhập loại sân"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button className={cx("add")} onClick={handleSubmit}>
            {id ? "CHỈNH SỬA" : "THÊM MỚI"}
          </button>
        </div>
      </div>
    </div>
  );
}
