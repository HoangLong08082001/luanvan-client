import React, { useState } from "react";
import style from "./Home.module.scss";
import classNames from "classnames/bind";
import Footbal from "./Football/Footbal";
import Badminton from "./Badminton/Badminton";
import Tennis from "./Tennis/Tennis";
import Basketball from "./Basketball/Basketball";
import Volleyball from "./Volleyball/Volleyball";
import Contract from "./Contract/Contract";
import { useNavigate } from "react-router-dom";
import axios from "../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState("");
  const [listResult, setListResult] = useState([]);

  const fetchSearchResult = async () => {
    try {
      await axios.get(`/san/search/${search}`).then((res) => {
        if (res) {
          navigate(`/tim-kiem/${search}`, {
            state: res.data,
          });
        }
      });
    } catch (error) {
      if (error.response.status >= 500) {
        alert("Error System");
      } else {
        navigate(`/tim-kiem/${search}`, {
          state: error.response.data.message,
        });
      }
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form-img")}>
        <img
          src={
            "https://qisc.com.vn/storage/2016/06/san-bong-da-mini-co-nhan-tao-doc-soi-6-1024x768.jpg"
          }
          alt=""
        />
      </div>
      <div className={cx("logo")}>
        <p className={cx("logo-first")}>SPORT</p>
        <p className={cx("logo-second")}>RETAL</p>
      </div>
      <p className={cx("name")}>DỊCH VỤ ĐẶT SÂN THỂ THAO-TPHCM</p>
      <div className={cx("search-form")}>
        <input
          className={cx("search-input")}
          placeholder="Nhập tên sân hoặc tên quận"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={cx("btn-search")} onClick={fetchSearchResult}>
          Tìm tên sân
        </button>
      </div>
      <Footbal />
      <div className={cx("mid-banner")}>
        <img
          src={"https://i.ytimg.com/vi/6CQqVEHYbVE/maxresdefault.jpg"}
          alt=""
        />
      </div>
      <Badminton />
      <Tennis />
      <div className={cx("mid-banner")}>
        <img
          src={
            "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/11/3/lich-thi-dau-vong-23-vleague-2022-1667464887256106247100.jpg"
          }
          alt=""
        />
      </div>
      <Basketball />
      <Contract />
      <Volleyball />
    </div>
  );
}
