import React from 'react'
import style from './SuccessUpdate.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(style);
export default function SuccessUpdate() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("form-img")}>
          <img
            src="https://www.shareicon.net/data/512x512/2016/07/07/792201_success_512x512.png"
            className={cx("image")}
            alt=""
          />
        </div>
        <p className={cx("title")}>THÀNH CÔNG</p>
      </div>
    </div>
  );
}
