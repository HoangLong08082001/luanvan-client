import React, { useEffect, useState } from "react";
import style from "./ChiTietHoaDon.module.scss";
import classNames from "classnames/bind";
import axios from "../../../../setup-axios/axios";
import { useNavigate, useParams } from "react-router-dom";
const cx = classNames.bind(style);
export default function ChiTietHoaDon() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [load, setLoad] = useState(true);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("top")}>
        <div className={cx("left")}>
          <div className={cx("logo")}>
            <p className={cx("logo-first")}>SPORT</p>
            <p className={cx("logo-second")}>RETAL</p>
          </div>
          <p className={cx("name")}>DỊCH VỤ ĐẶT SÂN THỂ THAO-TPHCM</p>
        </div>
        <div className={cx("right")}>
          <p className={cx("title")}>HOÁ ĐƠN DỊCH VỤ</p>
          <p className={cx("date")}>Ngày 19 Tháng 07 Năm 2024</p>
        </div>
      </div>
      <div className={cx("info-customer")}>
        <div className={cx("form")}>
          <label htmlFor="">Tên khách hàng:</label>
          <p className={cx("item")}>Long</p>
        </div>
        <div className={cx("form")}>
          <label htmlFor="">Email khách hàng:</label>
          <p className={cx("item")}>Long</p>
        </div>
        <div className={cx("form")}>
          <label htmlFor="">Số điện thoại khách hàng:</label>
          <p className={cx("item")}>0909889900</p>
        </div>
      </div>
      <div className={cx("info-customer")}>
        <div className={cx("cap")}>THÔNG TIN SÂN ĐẶT</div>
        <div className={cx("list")}>
          <p className={cx("name-yard")}>Tên sân: San cau long</p>
          <p className={cx("date-yard")}>Thời gian đặt: 22/12/2024</p>
          <p className={cx("address-yard")}>Địa chỉ: 240, Luu Huu Phuoc</p>
          <p className={cx("price-yard")}>Giá: 120000</p>
        </div>
        
      </div>
      <div className={cx("info-customer")}>
        <div className={cx("cap")}>THÔNG TIN NƯỚC UỐNG</div>
        <div className={cx("list")}>
          <p className={cx("name-yard")}>Tên sản phẩm: San cau long</p>
          <p className={cx("address-yard")}>Loại: 240, Luu Huu Phuoc</p>
          <p className={cx("address-yard")}>Số lượng: 240, Luu Huu Phuoc</p>
          <p className={cx("price-yard")}>Giá: 120000</p>
        </div>
      </div>
      <div className={cx("info-customer")}>
        <div className={cx("cap")}>THÔNG TIN ĐỒ ĂN</div>
        <div className={cx("list")}>
          <p className={cx("name-yard")}>Tên sản phẩm: San cau long</p>
          <p className={cx("address-yard")}>Số lượng: 240, Luu Huu Phuoc</p>
          <p className={cx("price-yard")}>Giá: 120000</p>
        </div>
      </div>
      <div className={cx("info-customer")}>
        <div className={cx("cap")}>THÔNG TIN DỤNG CỤ THỂ THAO</div>
        <div className={cx("list")}>
          <p className={cx("name-yard")}>Tên sản phẩm: San cau long</p>
          <p className={cx("address-yard")}>Số lượng: 240, Luu Huu Phuoc</p>
          <p className={cx("price-yard")}>Giá: 120000</p>
        </div>
      </div>
      <div className={cx("info-customer")}>
        <div className={cx("cap")}>THÔNG TIN DỤNG CỤ Y TẾ</div>
        <div className={cx("list")}>
          <p className={cx("name-yard")}>Tên sản phẩm: San cau long</p>
          <p className={cx("address-yard")}>Số lượng: 240, Luu Huu Phuoc</p>
          <p className={cx("price-yard")}>Giá: 120000</p>
        </div>
      </div>
      <div className={cx("total")}>
        <p className={cx("total-price")}>Tổng hoá đơn: </p>
        <p className={cx("half-price")}>Đã thanh toán: </p>
        <button className={cx("cancel")} onClick={() => navigate(-1)}>
          Trở lại
        </button>
      </div>
    </div>
  );
}
