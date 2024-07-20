import React, { useEffect, useState } from "react";
import style from "./ModalDonGia.module.scss";
import classNames from "classnames/bind";
import axios from "../../../../setup-axios/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(style);
export default function ModalDonGia({ setModalFalse, id = null }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("");
  const [phone, setPhone] = useState("");
  const [tendctt, setTendctt] = useState("");
  const [soluongdctt, setSoluongdctt] = useState("");
  const [tendcyte, setTendcyte] = useState("");
  const [soluongdcyte, setSoluongdcyte] = useState("");
  const [tennuoc, setTennuoc] = useState("");
  const [soluonnuoc, setSoluongnuoc] = useState("");
  const fetchDetailDonGia = () => {
    try {
      axios.get(`/hoa-don/get-hoa-don-by-ma-hoa-don/${id}`).then((res) => {
        if (res) {
          console.log(res.data);
        }
      });
    } catch (error) {}
  };
  const handleClose = () => {
    setModalFalse();
  };
  useEffect(() => {
    if (id) {
      fetchDetailDonGia();
    }
  }, [id]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form")}>
        <FontAwesomeIcon
          onClick={handleClose}
          icon={faX}
          className={cx("icon")}
        />
        
      </div>
    </div>
  );
}
