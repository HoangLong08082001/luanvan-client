import React, { useEffect, useState } from "react";
import style from "./HomeAdmin.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CChart } from "@coreui/react-chartjs";
import {
  faDollar,
  faMoneyBill,
  faMoneyCheck,
  faMoneyCheckDollar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(style);
export default function HomeAdmin() {
  function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const times = [
    { id: 1, title: "Hôm nay" },
    { id: 2, title: "Tuần này" },
    { id: 3, title: "Tháng này" },
    { id: 4, title: "Năm nay" },
  ];
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/admin");
    }
  }, [navigate]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <p>Thống kê theo mốc thời gian</p>
        <select name="" id="" className={cx("select")}>
          {times.map((item, index) => {
            return <option value={item.id}>{item.title}</option>;
          })}
        </select>
      </div>
      <div className={cx("statis")}>
        <div className={cx("left")}>
          <div className={cx("item")} style={{ backgroundColor: "red" }}>
            <div className={cx("item-top")}>
              <p>
                <FontAwesomeIcon className={cx("icon")} icon={faDollar} />
                <p className={cx("total")}>TỔNG DOANH THU</p>
              </p>
            </div>
            <div className={cx("item-bottom")}>
              <p className={cx("total")}>{formatCurrency(13000000)}</p>
            </div>
          </div>
          <div className={cx("item")} style={{ backgroundColor: "green" }}>
            <div className={cx("item-top")}>
              <p>
                <FontAwesomeIcon className={cx("icon")} icon={faUser} />
                <p className={cx("total")}>TỔNG KHÁCH HÀNG</p>
              </p>
            </div>
            <div className={cx("item-bottom")}>
              <p className={cx("total")}>13000000</p>
            </div>
          </div>
          <div className={cx("item")} style={{ backgroundColor: "#F7B701" }}>
            <div className={cx("item-top")}>
              <p>
                <FontAwesomeIcon className={cx("icon")} icon={faMoneyCheck} />
                <p className={cx("total")}>TỔNG ĐƠN HÀNG THÀNH CÔNG</p>
              </p>
            </div>
            <div className={cx("item-bottom")}>
              <p className={cx("total")}>13000000</p>
            </div>
          </div>
        </div>
        <div className={cx("right")}>
          <div className={cx("top")}>
            <CChart
              className={cx("doughnut")}
              type="doughnut"
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                ],
                datasets: [
                  {
                    backgroundColor: [
                      "#41B883",
                      "#E46651",
                      "#00D8FF",
                      "#DD1B16",
                    ],
                    data: [40, 20, 80, 10],
                  },
                ],
              }}
            />
            <CChart
              className={cx("line")}
              type="bar"
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                ],
                datasets: [
                  {
                    label: "GitHub Commits",
                    backgroundColor: "#f87979",
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                  },
                ],
              }}
              labels="months"
              options={{
                plugins: {
                  legend: {
                    labels: {},
                  },
                },
                scales: {
                  x: {
                    grid: {},
                    ticks: {},
                  },
                  y: {
                    grid: {},
                    ticks: {},
                  },
                },
              }}
            />
          </div>
          <div className={cx("bottom")}>
            <table className={cx("table-statis")}>
              <tr>
                <th>Tên khách hàng</th>
                <th>Tiền hoá đơn</th>
                <th>Ngày thanh toán</th>
              </tr>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
