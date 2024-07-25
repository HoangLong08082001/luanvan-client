import React, { useEffect, useState } from "react";
import style from "./DonGia.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faDownload,
  faEye,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../../setup-axios/axios";
import { useNavigate } from "react-router-dom";
import ConfirmDonGia from "./ConfirmDonGia/ConfirmDonGia";
import ModalDonGia from "./ModalDonGia/ModalDonGia";
const cx = classNames.bind(style);
export default function DonGia() {
  function formatVietnamDateToday(date) {
    date = new Date();
    const day = ("0" + date.getDate()).slice(-2); // Thêm số 0 vào phía trước nếu cần
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const [listHoaDon, setListHoaDon] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalCheck, setModalCheck] = useState(false);
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [id, setId] = useState(null);
  function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Thêm số 0 vào đầu nếu tháng < 10
    const day = String(today.getDate()).padStart(2, "0"); // Thêm số 0 vào đầu nếu ngày < 10

    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/admin");
    }
  }, [navigate]);
  const closeModel = () => {
    setLoad(true);
    setModal(false);
    setId(null);
  };

  async function editModel(itemId) {
    await setModal(true);
    await setId(itemId);
  }
  const fetchHoaDon = () => {
    try {
      axios.get("/hoa-don/get-all").then((res) => {
        if (res) {
          setListHoaDon(res.data);
        }
      });
    } catch (error) {
      if (error.response.status >= 500) {
        alert("Error system");
      }
    }
  };
  const showModal = async (itemId) => {
    await setModalCheck(true);
    await setId(itemId);
  };
  useEffect(() => {
    fetchHoaDon();
  }, [listHoaDon]);
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>ĐƠN GIÁ</p>
      {/* <div className={cx("list-btn")}>
        <button className={cx("add")}>
          THÊM MỚI
        </button>
        <button className={cx("excel")}>XUẤT EXCEL</button>
      </div> */}
      <div className={cx("form-table")}>
        <table border={1} cellSpacing={0} className={cx("table")}>
          <tr className={cx("tr-th")}>
            <th>STT</th>
            <th>Tên khách hàng</th>
            <th>Email</th>
            <th>Tên sân</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Tiền đã thanh toán(50%)</th>
            <th>Tiền còn lại cần thanh toán</th>
            <th>Tiền đã thanh toán</th>
            <th>Phương thức thanh toán</th>
            <th>Trạng thái thanh toán</th>
            <th>Ngày thanh toán</th>
            <th>Xử lý</th>
          </tr>
          {listHoaDon.map((item, index) => {
            return (
              <tr className={cx("tr-td")}>
                <td>{index + 1}</td>
                <td>{item.ten_khach_hang}</td>
                <td>{item.email}</td>
                <td>{item.ten_san}</td>
                <td>
                  {item.dia_chi},{item.ten_phuong},{item.ten_quan}
                </td>
                <td>{item.so_dien_thoai}</td>
                <td>
                  {formatCurrency(item.tien_da_thanh_toan) ===
                  formatCurrency(item.tong_tien)
                    ? formatCurrency(0)
                    : formatCurrency(item.tien_da_thanh_toan)}
                </td>
                <td>
                  {formatCurrency(
                    parseInt(item.tong_tien) - parseInt(item.tien_da_thanh_toan)
                  )}
                </td>
                <td>{formatCurrency(item.tong_tien)}</td>

                <td>{item.phuong_thuc}</td>
                <td>
                  {item.trang_thai_thanh_toan === 0
                    ? "Đã thanh toán 50%"
                    : "Đã thanh toán"}
                </td>
                <td>{formatVietnamDateToday(item.ngay_tao)}</td>
                <td className={cx("action")}>
                  {item.trang_thai_thanh_toan === 0 ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      onClick={() => editModel(item.ma_don_gia)}
                      className={cx("edit")}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={cx("edit-active")}
                    />
                  )}
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() =>
                      navigate(`/admin-chi-tiet-hoa-don/${item.ma_don_gia}`)
                    }
                    className={cx("edit")}
                  />
                  {item.trang_thai_thanh_toan === 1 && (
                    <FontAwesomeIcon
                      onClick={() =>
                        navigate(`/admin-in-hoa-don/${item.ma_don_gia}`)
                      }
                      icon={faFilePdf}
                      className={cx("edit")}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {modalCheck === true ? (
        <ModalDonGia setModalFalse={closeModel} id={id} />
      ) : (
        ""
      )}
      {modal === true ? (
        <ConfirmDonGia setModalFalse={closeModel} id={id} />
      ) : (
        ""
      )}
    </div>
  );
}
