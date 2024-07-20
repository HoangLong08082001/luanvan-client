import React from "react";
import style from "./Other.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(style);
export default function Other({ img, category, name, soluong, gia, handleClick }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form-img")}>
        <img src={img} alt="" />
      </div>
      <p className={cx("name")}>
        {name} / {category}
      </p>
      <p className={cx("price")}>Số lượng: {soluong}</p>
      <p className={cx("price")}>Giá: {gia}</p>
      <button className={cx("add")} onClick={handleClick}>
        THÊM VÀO TẠM TÍNH <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}
