import React, { useEffect, useState } from "react";
import style from "./Yard.module.scss";
import classNames from "classnames/bind";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Item from "../../../components/Item/Item";
import axios from "../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function Yard() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [listYard, setListYard] = useState([]);
  const fetchYard = () => {
    setName(location.state.name);
    setListYard(location.state.data);
    console.log(location.state);
  };
  const fetchCategory = async () => {
    await axios.get("/loai-san/get-all").then((res) => {
      if (res) {
        setListCategory(res.data);
      }
    });
  };
  useEffect(() => {
    fetchYard();
    fetchCategory();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>{name}</p>
      <div className={cx("list")}>
        <div className={cx("left")}>
          <div className={cx("category")}>
            {listCategory.map((item, index) => {
              return <p className={cx("link")}>{item.ten_loai_san}</p>;
            })}
          </div>
        </div>
        <div className={cx("right")}>
          {listYard.map((item, index) => {
            return (
              <Item
                name={item.ten_san}
                quan={item.ten_quan}
                phuong={item.ten_phuong}
                address={item.dia_chi}
                img={item.hinh_anh}
                phone={item.so_dien_thoai}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
