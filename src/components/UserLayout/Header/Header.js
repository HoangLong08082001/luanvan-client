import React, { useEffect, useState } from "react";
import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faLock,
  faTrashCan,
  faCartShopping,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../../Cart/Cart";
import axios from "../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function Header() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [id, setId] = useState(localStorage.getItem("email"));
  console.log(id);
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("tam_tinh");
    window.location.reload();
  };
  const fetchCategory = async () => {
    await axios.get("/loai-san/get-all").then((res) => {
      if (res) {
        setListCategory(res.data);
        console.log(res.data);
      }
    });
  };
  const handleClick = (id, name) => {
    try {
      axios.get(`/san/get-san/${id}`).then((res) => {
        if (res) {
          navigate(`/san/${name}/${id}`, { state: res.data });
        }
      });
    } catch (error) {
      if (error.response.status >= 500) {
        alert(error.response.data.message);
      } else {
        alert("loading....");
      }
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("list-menu")}>
        <ul>
          <li className={cx("logo")}>
            <p className={cx("logo-first")}>SPORT</p>
            <p className={cx("logo-second")}>RETAL</p>
          </li>
          <li className={cx("link")} onClick={() => navigate("/")}>
            Trang chủ{" "}
          </li>
          <li className={cx("link")} onClick={() => navigate("/chi-nhanh")}>
            Chi nhánh{" "}
          </li>
          <li className={cx("link")} onClick={() => setShow(!show)}>
            Loại sân{" "}
            <FontAwesomeIcon
              icon={show === false ? faChevronDown : faChevronUp}
            />
          </li>
          <div
            className={cx(
              show === false ? "list-yard-hidden" : "list-yard-show"
            )}
          >
            <ul>
              {listCategory.map((item, index) => {
                if (item.trang_thai === 1) {
                  return (
                    <li
                      className={cx("link")}
                      key={index}
                      onClick={() =>
                        handleClick(item.ma_loai_san, item.ten_loai_san)
                      }
                    >
                      {item.ten_loai_san}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          <li className={cx("link")} onClick={() => navigate("/do-an")}>
            Đồ ăn
          </li>
          <li className={cx("link")} onClick={() => navigate("/nuoc-uong")}>
            Nước uống
          </li>
          <li className={cx("link")} onClick={() => navigate("/dung-cu-y-te")}>
            Dụng cụ y tế
          </li>
          <li
            className={cx("link")}
            onClick={() => navigate("/dung-cu-the-thao")}
          >
            Dụng cụ thể thao
          </li>
          <li className={cx("li")}>
            {!id ? (
              <div className={cx("action-div")}>
                <button
                  className={cx("login")}
                  onClick={() => navigate("/dang-nhap")}
                >
                  Đăng nhập
                </button>
                <button
                  className={cx("register")}
                  onClick={() => navigate("/dang-ky")}
                >
                  Đăng ký
                </button>
              </div>
            ) : (
              <div className={cx("action-div")}>
                <button
                  className={cx("btn-info")}
                  onClick={() =>
                    navigate(
                      `/thong-tin/${localStorage.getItem(
                        "email"
                      )}/${localStorage.getItem("id")}`
                    )
                  }
                >
                  Thông tin
                </button>
                <button
                  className={cx("btn-pay")}
                  onClick={() => navigate("/thanh-toan")}
                >
                  Thanh toán
                </button>
                <button onClick={handleLogout} className={cx("btn-logout")}>
                  Đăng xuất
                </button>
              </div>
            )}
            {/* <button className={cx("cart")}>
              <FontAwesomeIcon icon={faCartShopping} />
            </button> */}
          </li>
        </ul>
      </div>
      {/* <Cart/> */}
    </div>
  );
}
