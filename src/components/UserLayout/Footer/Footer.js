import React from "react";
import style from "./Footer.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPen,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(style);
export default function Footer() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("list-footer")}>
        <div className={cx("first")}>
          <div className={cx("logo")}>
            <p className={cx("logo-first")}>SPORT</p>
            <p className={cx("logo-second")}>RETAL</p>
          </div>
          <p className={cx("slogon")}>DỊCH VỤ ĐẶT SÂN THỂ THAO-TPHCM</p>
        </div>
        <div className={cx("second")}>
          <p className={cx("title-footer")}>Thông tin</p>
          <ul>
            <li>Videos</li>
            <li>Liên hệ</li>
            <li>Trung tâm bảo hành</li>
            <li>Tin tức</li>
          </ul>
        </div>
        <div className={cx("third")}>
          <p className={cx("title-footer")}>Hỗ trợ</p>
          <ul>
            <li>Liên hệ</li>
          </ul>
        </div>
        <div className={cx("four")}>
          <p className={cx("title-footer")}>Địa chỉ</p>
          <ul>
            <ul>
              <li>
                <FontAwesomeIcon icon={faLocationDot} /> : SAIGON TECHNOLOGY
                UNIVERSITY
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} />: 028 3850 5520
              </li>
            </ul>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15679.817641153899!2d106.6778321!3d10.7379972!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f62a90e5dbd%3A0x674d5126513db295!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1717820687943!5m2!1svi!2s"
              className={cx("map")}
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </ul>
        </div>
      </div>
      <div className={cx("footer")}>
        <p className={cx("text-footer")}>copyright-2024-stu</p>
      </div>
    </div>
  );
}
