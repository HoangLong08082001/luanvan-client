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
import axios from "../../../setup-axios/axios";
const cx = classNames.bind(style);
export default function HomeAdmin() {
  const [totalRevenue, setTotalRevenue] = useState("");
  const [totalCustomer, setTotalCustomer] = useState("");
  const [totalBill, setTotalBill] = useState("");
  const [listMonth, setListMonth] = useState([]);
  const [listData, setListData] = useState([]);
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
  const fetchTotal = () => {
    axios.get("/dashboard/get-total").then((res) => {
      if (res) {
        setTotalRevenue(res.data.tong_doanh_thu[0].tong_doanh_thu);
        setTotalCustomer(res.data.tong_khach_hang[0].tong_khach_hang);
        setTotalBill(res.data.tong_don_hang[0].tong_don_hang);
      }
    });
  };
  const fetchDoughnutChart = () => {
    axios.get("/dashboard/get-doughnut-chart").then((res) => {
      if (res) {
        let data = res.data;
        const map1 = data.map((item) => item.thang.toString());
        const map2 = data.map((item) => item.tong_don_gia);
        setListMonth(map1);
        setListData(map2);
      }
    });
  };

  useEffect(() => {
    fetchTotal();
    fetchDoughnutChart();
  }, []);
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/admin");
    }
  }, [navigate]);
  return (
    <div className={cx("wrapper")}>
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
              <p className={cx("total")}>{formatCurrency(totalRevenue)}</p>
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
              <p className={cx("total")}>{totalCustomer}</p>
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
              <p className={cx("total")}>{totalBill}</p>
            </div>
          </div>
        </div>
        <div className={cx("right")}>
          <div className={cx("top")}>
            <CChart
              className={cx("doughnut")}
              type="doughnut"
              data={{
                labels: listMonth,
                datasets: [
                  {
                    backgroundColor: [
                      "#41B883",
                      "#E46651",
                      "#00D8FF",
                      "#DD1B16",
                    ],
                    data: listData,
                  },
                ],
              }}
            />
            <CChart
              className={cx("line")}
              type="bar"
              data={{
                labels: listMonth,
                datasets: [
                  {
                    label: "Tổng số đơn hàng theo từng tháng",
                    backgroundColor: "#f87979",
                    data: listData,
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
          {/* <div className={cx("bottom")}>
            <table className={cx("table-statis")}>
              <tr>
                <th>Tên sân</th>
                <th>Địa chỉ</th>
                <th>Số lần đặt</th>
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
