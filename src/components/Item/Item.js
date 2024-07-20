import React from "react";
import style from "./Item.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(style);
export default function Item({
  img,
  name,
  address,
  phone,
  clickDetails,
  phuong,
  quan,
}) {
  return (
    <div className={cx("wrapper")} onClick={clickDetails}>
      <div className={cx("form-image")}>
        <img src={img} alt="" />
      </div>
      <p className={cx("name")}>{name}</p>
      <p className={cx("address")}>
        <FontAwesomeIcon icon={faLocationDot} />: {address}, {phuong}, {quan}
      </p>
      <p className={cx("phone")}>
        <FontAwesomeIcon icon={faPhone} />: {phone}
      </p>
      <button onClick={clickDetails} className={cx("btn-details")}>
        CHI TIẾT
      </button>
    </div>
  );
}
