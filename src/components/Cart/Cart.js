import React from "react";
import style from "./Cart.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faX } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(style);
export default function Cart() {
  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>PHIẾU TẠM TÍNH</p>

      <div className={cx("list-yard")}>
        <div className={cx("item")}>
          <div className={cx("up")}>
            <p className={cx("name")}></p>
            <FontAwesomeIcon icon={faX} />
          </div>
          <p className={cx("location")}>
            <FontAwesomeIcon icon={faLocationDot}/>
          </p>
          <p className={cx("phone")}>
            <FontAwesomeIcon icon={faPhone}/>
          </p>
          <p className={cx("price")}>
            700000
          </p>
        </div>
      </div>
      <div className={cx("list-other")}>
        <div className={cx("other")}>
          <p className={cx("name-other")}></p>
          <p className={cx("quality")}></p>
          <p className={cx("price-other")}></p>
        </div>
      </div>
      <button className={cx("payment")}>
        THANH TOÁN
      </button>
    </div>
  );
}
