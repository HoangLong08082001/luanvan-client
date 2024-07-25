import React, { useEffect, useState } from "react";
import style from "./Details.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faEnvelope,
  faLocationDot,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function Details() {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Thêm số 0 vào đầu nếu tháng < 10
    const day = String(today.getDate()).padStart(2, "0"); // Thêm số 0 vào đầu nếu ngày < 10

    return `${year}-${month}-${day}`;
  };

  const Navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [click, setClick] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [idSan, setIdSan] = useState("");
  const location = useLocation();
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [des, setDes] = useState("");
  const [quan, setQuan] = useState("");
  const [phuong, setPhuong] = useState("");
  const [id, setId] = useState("");
  const [start, setStart] = useState("");
  const [gia, setGia] = useState("");
  const [end, setEnd] = useState("");
  const [object, setObject] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [matchedSlots, setMatchedSlots] = useState([]);
  const [today, setToday] = useState(getTodayDate());

  const getLocation = () => {
    setIdSan(location.state.ma_san);
    setName(location.state.ten_san);
    setImg(location.state.hinh_anh);
    setPhone(location.state.so_dien_thoai);
    setAddress(location.state.dia_chi);
    setDes(location.state.description);
    setQuan(location.state.ten_quan);
    setPhuong(location.state.ten_phuong);
    setPrice(location.state.gia_san);
  };
  const fetchKhungGio = async () => {
    const pathname = window.location.pathname;

    // Tách pathname thành các phần dựa trên dấu "/"
    const pathParts = pathname.split("/");

    // Giá trị của id sẽ nằm ở phần tử cuối cùng của mảng pathParts
    const id = pathParts[pathParts.length - 1];
    try {
      await axios.get(`/khung-gio/get-all/${id}`).then((res) => {
        if (res) {
          setSchedule(res.data);
          console.log(res.data);
        }
      });
    } catch (error) {}
  };
  const listSlot = [
    { id: 1, start: "8:00", end: "9:00" },
    { id: 2, start: "9:30", end: "10:30" },
    { id: 3, start: "11:00", end: "12:00" },
    { id: 4, start: "12:30", end: "13:30" },
    { id: 5, start: "14:00", end: "15:00" },
    { id: 6, start: "15:30", end: "16:30" },
    { id: 7, start: "17:00", end: "18:00" },
    { id: 8, start: "18:30", end: "19:30" },
  ];
  const array2 = [
    {
      id: 1,
      thoi_gian: "2024-06-24T17:00:00.000Z",
      gio_bat_dau: "8:00",
      gio_ket_thuc: "9:00",
    },
    {
      id: 2,
      thoi_gian: "2024-06-23T17:00:00.000Z",
      gio_bat_dau: "8:00",
      gio_ket_thuc: "9:00",
    },
    {
      id: 3,
      thoi_gian: "2024-06-30T17:00:00.000Z",
      gio_bat_dau: "9:30",
      gio_ket_thuc: "10:30",
    },
  ];
  useEffect(() => {
    getLocation();
    fetchKhungGio();
  }, []);
  const handleBook = () => {
    try {
      if (
        localStorage.getItem("tam_tinh") &&
        localStorage.getItem("id") &&
        localStorage.getItem("email")
      ) {
        if (click !== null) {
          axios
            .post("/tam-tinh/add-san", {
              id_san: idSan,
              id_tam_tinh: localStorage.getItem("tam_tinh"),
              start: start,
              end: end,
              date: currentDate,
            })
            .then((res) => {
              if (res) {
                alert("Thêm sân thành công vào tạm tính");
                Navigate("/thanh-toan");
              }
            });
        } else {
          alert("Vui lòng chọn khung giờ");
        }
      } else {
        alert("Vui lòng đăng nhập trước khi đặt sân");
        Navigate("/dang-nhap");
      }
    } catch (error) {
      if (error.response.status >= 500) {
        alert("Lỗi hệ thống");
      } else {
        alert(error.response.data.message);
      }
    }
  };
  const handleOnchange = (e) => {
    setCurrentDate(e.target.value);
    console.log(e.target.value);
  };
  useEffect(() => {
    if (currentDate) {
      const nextDate = (date) => {
        let start = new Date(date);
        let next = new Date(start);
        next.setDate(start.getDate() + 1);
        let nextDayFormatted = next.toISOString().split("T")[0];
        return nextDayFormatted;
      };

      const formattedSelectedDate = new Date(currentDate)
        .toISOString()
        .split("T")[0];
      const matched = schedule.filter(
        (item) => nextDate(item.thoi_gian) === formattedSelectedDate
      );
      setMatchedSlots(matched);
      console.log(matched);
    }
  }, [currentDate]);

  const checkMatch = (start, end) => {
    return matchedSlots.some(
      (item) => item.gio_bat_dau === start && item.gio_ket_thuc === end
    );
  };

  const handleSlotClick = (slot) => {
    if (currentDate !== "") {
      if (id === slot.id) {
        setId("");
        setStart("");
        setEnd("");
      } else {
        setId(slot.id);
        setClick(slot.id);
        console.log(slot.id);
        setStart(slot.start);
        console.log(slot.start);
        setEnd(slot.end);
        console.log(slot.end);
      }
    } else {
      alert("Vui lòng chọn ngày trước khi chọn khung giờ");
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("up")}>
        <div className={cx("img")}>
          <img src={img} alt="" />
        </div>
        <div className={cx("list-info")}>
          <div className={cx("description")}>
            <p className={cx("name-yard")}>{name}</p>
            <p className={cx("list-description")}>
              <p className={cx("title-des")}>Mô tả: </p>
              {des}
            </p>
          </div>
          <div className={cx("info-host")}>
            <p className={cx("title-host")}>Thông tin sân</p>
            <p className={cx("email")}>
              <FontAwesomeIcon icon={faPhone} fontSize={16} />: {phone}
            </p>
            <p className={cx("address")}>
              <FontAwesomeIcon icon={faLocationDot} fontSize={20} />: {address},
              phường {phuong}, quận {quan}
            </p>
          </div>
          <div className={cx("booking")}>
            <button className={cx("btn-booking")} onClick={() => handleBook()}>
              ĐẶT SÂN
            </button>
          </div>
        </div>
      </div>
      <div className={cx("calendar")}>
        <div className={cx("date-time")}>
          {/* <p>{formatDate(currentDate)}</p> */}
          <input
            type="date"
            value={ currentDate}
            onChange={(e) => handleOnchange(e)}
            min={getTodayDate(new Date())}
            className={cx("date")}
          />
        </div>
        <div className={cx("list-calendar")}>
          {listSlot.map((slot, index) => {
            return (
              <div
                key={slot.id}
                className={cx(
                  id === slot.id
                    ? "slot-active"
                    : checkMatch(slot.start, slot.end)
                    ? "slot-inactive"
                    : "slot"
                )}
                onClick={() => handleSlotClick(slot)}
              >
                <p className={cx("item")}>
                  {slot.start} - {slot.end}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
