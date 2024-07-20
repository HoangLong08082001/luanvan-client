import React, { useEffect, useState } from "react";
import style from "./Drinks.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Other from "../../../components/Other/Other";
import axios from "../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function Drinks() {
  function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  const [listDrink, setListDrink] = useState([]);
  const id_tam_tinh = localStorage.getItem("tam_tinh");
  const id_khach_hang = localStorage.getItem("id");
  const fetchListDrink = () => {
    axios.get("/nuoc-uong/get-all").then((res) => {
      if (res) {
        setListDrink(res.data);
      }
    });
  };
  const addTamTinh = (id_nuoc_uong) => {
    if (id_khach_hang) {
      axios
        .post("/tam-tinh/add-nuoc-uong", {
          id_nuoc_uong: id_nuoc_uong,
          id_tam_tinh: id_tam_tinh,
        })
        .then((res) => {
          if (res) {
            alert("Thêm thành công nước uống vào tạm tính");
          }
        });
    } else {
      alert("Vui lòng đăng nhập trước khi thêm sản phẩm");
    }
  };
  useEffect(() => {
    fetchListDrink();
  }, [listDrink]);
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>DANH SÁCH NƯỚC UỐNG</p>
      <div className={cx("list-foods")}>
        {listDrink.map((item, index) => {
          return (
            <Other
              category={item.ten_loai}
              name={item.ten_nuoc_uong}
              img={item.hinh_anh}
              soluong={item.so_luong_kho}
              gia={formatCurrency(item.gia_nuoc)}
              handleClick={() => addTamTinh(item.ma_nuoc_uong_loai)}
            />
          );
        })}
      </div>
    </div>
  );
}
