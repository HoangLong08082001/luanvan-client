import React from "react";
import style from "./Contract.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
export default function Contract() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("left")}>
        <p className={cx("slogon")}>DỊCH VỤ ĐẶT SÂN THỂ THAO-TPHCM</p>
        <p className={cx("contract")}>
          Vui lòng nhập email nếu cần biết thêm thông tin về chúng tôi hoặc
          những thắc mắc cần giải đáp
        </p>
      </div>
      <div className={cx("right")}>
        <div className={cx("form")}>
          <input className={cx("form-input")} type="text" placeholder="Nhập email"/>
          <button className={cx("send")}>GỬI MAIL</button>
        </div>
      </div>
    </div>
  );
}
