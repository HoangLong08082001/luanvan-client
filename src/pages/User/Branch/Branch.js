import React, { useEffect, useState } from "react";
import style from "./Branch.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function Branch() {
  const [listChiNhanh, setListChiNhanh] = useState([]);
  const fetchChiNhanh = async () => {
    try {
      await axios.get("/chi-nhanh/get-all").then((res) => {
        if (res) {
          setListChiNhanh(res.data);
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    fetchChiNhanh();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>CHI NHÁNH</p>
      <div className={cx("branch")}>
        <div className={cx("left")}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15679.817641153899!2d106.6778321!3d10.7379972!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f62a90e5dbd%3A0x674d5126513db295!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1717820687943!5m2!1svi!2s"
            className={cx("map")}
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className={cx("right")}>
          {listChiNhanh.map((item, index) => {
            return (
              <div className={cx("item")}>
                <p className={cx("name")}>{item.ten_chi_nhanh}</p>
                <p className={cx("address")}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={cx("icon")}
                  />{" "}
                  Địa chỉ: {item.dia_chi}, quận {item.ten_quan}, phường{" "}
                  {item.ten_phuong}, TP.HCM
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
