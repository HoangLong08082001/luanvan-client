import React, { useEffect, useState } from "react";
import style from "./ConfirmDonGia.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function ConfirmDonGia({ setModalFalse, id = null }) {
  const [total, setTotal] = useState("");
  const [half, setHalf] = useState("");
  const [price_return, setPriceReturn] = useState("");
  const [idDonGIa, setIdDonGia] = useState("");
  function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  const getDonGiaId = () => {
    try {
      axios.get(`/hoa-don/get-by-id/${id}`).then((res) => {
        if (res) {
          setHalf(res.data[0].tien_da_thanh_toan);
          setTotal(res.data[0].tong_tien);
          setPriceReturn(
            parseInt(res.data[0].tong_tien) -
              parseInt(res.data[0].tien_da_thanh_toan)
          );
          setIdDonGia(res.data[0].ma_don_gia);
        }
      });
    } catch (error) {
      if (error.response.status >= 500) {
        alert("Error System");
      }
    }
  };
  const handleClose = () => {
    setHalf("");
    setPriceReturn("");
    setPriceReturn("");
    setModalFalse();
  };
  useEffect(() => {
    if (id) {
      getDonGiaId();
    }
  }, [id]);
  const confirm = () => {
    try {
      axios
        .put("/hoa-don/confirm", {
          id: idDonGIa,
          half: half,
          price_return: price_return,
        })
        .then((res) => {
          if (res) {
            handleClose();
          }
        });
    } catch (error) {
      if (error.response.status >= 500) {
        alert("Error system");
      }
    }
  };
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
            <label htmlFor="">Tổng tiền</label>
            <input
              disabled
              type="text"
              value={formatCurrency(total)}
              placeholder="Nhập tên đồ ăn"
            />
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="">Đã thanh toán</label>
            <input
              disabled
              type="text"
              value={formatCurrency(half)}
              placeholder="Nhập giá đồ ăn"
            />
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="">Còn lại cần thanh toán</label>
            <input
              disabled
              type="text"
              value={formatCurrency(price_return)}
              placeholder="Dán đường link hình ảnh"
            />
          </div>

          <button className={cx("add")} onClick={confirm}>
            XÁC NHẬN THANH TOÁN
          </button>
        </div>
      </div>
    </div>
  );
}
