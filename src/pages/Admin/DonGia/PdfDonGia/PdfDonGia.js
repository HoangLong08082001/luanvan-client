import React, { useEffect, useRef, useState } from "react";
import style from "./PdfDonGia.module.scss";
import classNames from "classnames/bind";
import axios from "../../../../setup-axios/axios";
import { useNavigate, useParams } from "react-router-dom";
import generatePDF from "react-to-pdf";
const cx = classNames.bind(style);
export default function PdfDonGia() {
  const targetRef = useRef();
  function formatVietnamDate(date) {
    date = new Date();
    const day = ("0" + (date.getDate() + 1)).slice(-2); // Thêm số 0 vào phía trước nếu cần
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  function formatVietnamDateToday(date) {
    date = new Date();
    const day = ("0" + date.getDate()).slice(-2); // Thêm số 0 vào phía trước nếu cần
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }const formartIncreaseDate = (ISOdate) => {
    const date = new Date(ISOdate);

    // Cộng thêm 1 ngày
    date.setDate(date.getDate());

    // Lấy từng phần của ngày tháng năm
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Định dạng theo dd/mm/yyyy
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const [load, setLoad] = useState(true);
  const [date, setDate] = useState("");
  const [tenKH, setTenKH] = useState("");
  const [emailKH, setEmailKH] = useState("");
  const [sdt, setSdt] = useState("");
  const [total, setTotal] = useState("");
  const [half, setHalf] = useState("");
  const [listSan, setListSan] = useState([]);
  const [listDoAn, setListDoAn] = useState([]);
  const [listNuoc, setListNuoc] = useState([]);
  const [listTheThao, setListTheThao] = useState([]);
  const [listYTe, setListYTe] = useState([]);
  function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  const fetchData = () => {
    try {
      axios.get(`/hoa-don/get-hoa-don-by-ma-hoa-don/${id}`).then((res) => {
        if (res) {
          console.log(res.data);
          setDate(res.data.don_gia[0].ngay_tao);
          setTenKH(res.data.don_gia[0].ten_khach_hang);
          setEmailKH(res.data.don_gia[0].email);
          setSdt(res.data.don_gia[0].so_dien_thoai);
          setTotal(res.data.don_gia[0].tong_tien);
          setHalf(res.data.don_gia[0].tien_da_thanh_toan);
          setListDoAn(res.data.do_an);
          setListNuoc(res.data.nuoc_uong);
          setListSan(res.data.san);
          setListTheThao(res.data.dung_cu_the_thao);
          setListYTe(res.data.dung_cu_y_te);
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/admin");
    }
  }, [navigate]);
  return (
    <div className={cx("wrapper")}>
      <div ref={targetRef}>
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
            {date && (
              <p className={cx("date")}>{formatVietnamDateToday(date)}</p>
            )}
          </div>
        </div>
        <div className={cx("info-customer")}>
          <div className={cx("form")}>
            <label htmlFor="">Tên khách hàng:</label>
            <p className={cx("item")}>{tenKH}</p>
          </div>
          <div className={cx("form")}>
            <label htmlFor="">Email khách hàng:</label>
            <p className={cx("item")}>{emailKH}</p>
          </div>
          <div className={cx("form")}>
            <label htmlFor="">Số điện thoại khách hàng:</label>
            <p className={cx("item")}>{sdt}</p>
          </div>
        </div>
        <div className={cx("info-customer")}>
          <div className={cx("cap")}>THÔNG TIN SÂN ĐẶT</div>
          {listSan &&
            listSan.map((item, index) => {
              return (
                <div className={cx("list")}>
                  <p className={cx("name-yard")}>Tên sân: {item.ten_san}</p>
                  <p className={cx("date-yard")}>
                    Thời gian đặt: {formartIncreaseDate(item.thoi_gian)},
                    {item.gio_bat_dau}-{item.gio_ket_thuc}
                  </p>
                  <p className={cx("address-yard")}>
                    Địa chỉ: {item.dia_chi},{item.ten_phuong},{item.ten_quan}
                    ,TP.HCM
                  </p>
                  <p className={cx("price-yard")}>
                    Giá: {formatCurrency(item.gia_san)}
                  </p>
                </div>
              );
            })}
        </div>
        <div className={cx("info-customer")}>
          {listNuoc.length !== 0 && (
            <div className={cx("cap")}>THÔNG TIN NƯỚC UỐNG</div>
          )}

          {listNuoc &&
            listNuoc.map((item, index) => {
              return (
                <div className={cx("list")}>
                  <p className={cx("name-yard")}>
                    Tên sản phẩm: {item.ten_nuoc_uong}
                  </p>
                  <p className={cx("address-yard")}>Loại: {item.ten_loai}</p>
                  <p className={cx("address-yard")}>
                    Số lượng: {item.so_luong_tam_tinh}
                  </p>
                  <p className={cx("price-yard")}>
                    Giá: {formatCurrency(item.gia_nuoc)}
                  </p>
                </div>
              );
            })}
        </div>
        <div className={cx("info-customer")}>
          {listDoAn.length !== 0 && (
            <div className={cx("cap")}>THÔNG TIN ĐỒ ĂN</div>
          )}
          {listDoAn &&
            listDoAn.map((item, index) => {
              return (
                <div className={cx("list")}>
                  <p className={cx("name-yard")}>
                    Tên sản phẩm: {item.ten_do_an}
                  </p>
                  <p className={cx("address-yard")}>
                    Số lượng: {item.so_luong_tam_tinh}
                  </p>
                  <p className={cx("price-yard")}>
                    Giá: {formatCurrency(item.gia_do_an)}
                  </p>
                </div>
              );
            })}
        </div>
        <div className={cx("info-customer")}>
          {listTheThao !== 0 && (
            <div className={cx("cap")}>THÔNG TIN DỤNG CỤ THỂ THAO</div>
          )}
          {listTheThao &&
            listTheThao.map((item, index) => {
              return (
                <div className={cx("list")}>
                  <p className={cx("name-yard")}>
                    Tên sản phẩm: {item.ten_dung_cu_the_thao}
                  </p>
                  <p className={cx("address-yard")}>
                    Số lượng: {item.so_luong_tam_tinh}
                  </p>
                  <p className={cx("price-yard")}>
                    Giá: {formatCurrency(item.gia_dung_cu)}
                  </p>
                </div>
              );
            })}
        </div>
        <div className={cx("info-customer")}>
          {listYTe.length !== 0 && (
            <div className={cx("cap")}>THÔNG TIN DỤNG CỤ Y TẾ</div>
          )}
          {listYTe &&
            listYTe.map((item, index) => {
              return (
                <div className={cx("list")}>
                  <p className={cx("name-yard")}>
                    Tên sản phẩm: {item.ten_dung_cu_y_te}
                  </p>
                  <p className={cx("address-yard")}>
                    Số lượng: {item.so_luong_tam_tinh}
                  </p>
                  <p className={cx("price-yard")}>
                    Giá: {formatCurrency(item.gia_dung_cu)}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
      <div className={cx("total")}>
        <p className={cx("total-price")}>
          Tổng hoá đơn: {formatCurrency(total)}
        </p>
        {half && (
          <p className={cx("half-price")}>
            Đã thanh toán: {formatCurrency(half)}
          </p>
        )}
      </div>
      <button className={cx("cancel")} onClick={() => navigate(-1)}>
        Trở lại
      </button>
      <button
        className={cx("pdf")}
        onClick={() =>
          generatePDF(targetRef, { filename: `hoa_don_KH${tenKH}.pdf` })
        }
      >
        IN PDF
      </button>
    </div>
  );
}
