import React, { useEffect, useState } from "react";
import style from "./Search.module.scss";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import Item from "../../../components/Item/Item";
import axios from "../../../setup-axios/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(style);
export default function Search() {
  const location = useLocation();
  const [data, setData] = useState("");
  const [notFound, setNotFound] = useState("");
  const [listResult, setListResult] = useState([]);
  const getDataFromHome = () => {
    if (typeof location.state === "object") {
      setListResult(location.state);
    } else {
      setNotFound(location.state);
    }
  };

  useEffect(() => {
    getDataFromHome();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>KẾT QUẢ TÌM KIẾM</p>
      {notFound ? (
        <div>
          <p className={cx("not-found")}>
            {notFound} <FontAwesomeIcon icon={faX} />
          </p>
        </div>
      ) : (
        <div className={cx("list-foods")}>
          {listResult.map((item, index) => {
            return (
              <Item
                key={index}
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
      )}
    </div>
  );
}
