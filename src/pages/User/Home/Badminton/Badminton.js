import React, { useEffect, useState } from "react";
import style from "./Badminton.module.scss";
import classNames from "classnames/bind";
import Item from "../../../../components/Item/Item";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function Badminton() {
  const [listSan, setListSan] = useState([]);
  const fetchListSan = () => {
    axios.get("/san/get-all").then((res) => {
      if (res) {
        setListSan(res.data);
      }
    });
  };

  const navigate = useNavigate();
  useEffect(() => {
    fetchListSan();
  }, [listSan]);
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>SÂN CẦU LÔNG</p>
      <div className={cx("list-yard")}>
        {listSan.map((item, index) => {
          if (index >= 0 && index <= 5 && item.ten_loai_San === "Cầu lông") {
            return (
              <Item
                clickDetails={() =>
                  navigate(`/chi-tiet/${item.ten_san}/${item.ma_san}`, {
                    state: item,
                  })
                }
                name={item.ten_san}
                quan={item.ten_quan}
                phuong={item.ten_phuong}
                address={item.dia_chi}
                img={item.hinh_anh}
                phone={item.so_dien_thoai}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
