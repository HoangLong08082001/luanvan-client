import React, { useEffect, useState } from "react";
import style from "./Bill.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faLocationDot,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../setup-axios/axios";
const cx = classNames.bind(style);

export default function Bill() {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Thêm số 0 vào đầu nếu tháng < 10
    const day = String(today.getDate()).padStart(2, "0"); // Thêm số 0 vào đầu nếu ngày < 10

    return `${year}-${month}-${day}`;
  };
  function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [listSan, setListSan] = useState([]);
  const [listNuocUong, setListNuocUong] = useState([]);
  const [listDoAn, setListDoAn] = useState([]);
  const [listDungCuTheThao, setListDungCuTheThao] = useState([]);
  const [listDungCuYTe, setListDungCuYTe] = useState([]);
  const [totalSan, setTotalSan] = useState(0);
  const [totalNuoc, setTotalNuoc] = useState(0);
  const [totalDoAn, setTotalDoAn] = useState(0);
  const [totalTheThao, setTotalTheThao] = useState(0);
  const [totalYTe, setTotalYTe] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  const fetchSan = () => {
    axios
      .get(`/tam-tinh/get-tam-tinh-san/${localStorage.getItem("tam_tinh")}`)
      .then((res) => {
        if (res) {
          console.log(res.data);
          setListSan(res.data);
          const totalSum = res.data.reduce((sum, current) => {
            return sum + current.gia_san;
          }, 0);
          setTotalSan(totalSum);
        }
      });
  };
  const fetchDoAn = () => {
    axios
      .get(`/tam-tinh/get-tam-tinh-do-an/${localStorage.getItem("tam_tinh")}`)
      .then((res) => {
        if (res) {
          console.log(res.data);
          setListDoAn(res.data);
          const totalSum = res.data.reduce((sum, current) => {
            return sum + current.gia_do_an;
          }, 0);
          setTotalDoAn(totalSum);
        }
      });
  };
  const fetchNuoc = () => {
    axios
      .get(
        `/tam-tinh/get-tam-tinh-nuoc-uong/${localStorage.getItem("tam_tinh")}`
      )
      .then((res) => {
        if (res) {
          console.log(res.data);
          setListNuocUong(res.data);
          const totalSum = res.data.reduce((sum, current) => {
            return sum + current.gia_nuoc;
          }, 0);
          setTotalNuoc(totalSum);
        }
      });
  };
  const fetchTheThao = () => {
    axios
      .get(
        `/tam-tinh/get-tam-tinh-dung-cu-the-thao/${localStorage.getItem(
          "tam_tinh"
        )}`
      )
      .then((res) => {
        if (res) {
          console.log(res.data);
          setListDungCuTheThao(res.data);
          const totalSum = res.data.reduce((sum, current) => {
            return sum + current.gia_dung_cu;
          }, 0);
          setTotalTheThao(totalSum);
        }
      });
  };
  const fetchYTe = () => {
    axios
      .get(
        `/tam-tinh/get-tam-tinh-dung-cu-y-te/${localStorage.getItem(
          "tam_tinh"
        )}`
      )
      .then((res) => {
        if (res) {
          console.log(res.data);
          setListDungCuYTe(res.data);
          const totalSum = res.data.reduce((sum, current) => {
            return sum + current.gia_dung_cu;
          }, 0);
          setTotalYTe(totalSum);
        }
      });
  };
  const handlePayment = async () => {
    try {
      if (totalSan) {
        const response = await axios.post("/payment/momo", {
          partnerCode: "MOMOBKUN20180529",
          accessKey: "klm05TvNBzhg7h7j",
          secretKey: "at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa",
          orderId: Date.now().toString(),
          orderInfo: "Thanh toán qua MoMo",
          amount:
            (totalDoAn + totalNuoc + totalSan + totalTheThao + totalYTe) / 2,
          ipnUrl: `https://luanvan-server.vercel.app/payment/callback`,
          redirectUrl: `https://luanvan-client.vercel.app/success/${localStorage.getItem(
            "tam_tinh"
          )}?${totalDoAn + totalNuoc + totalSan + totalTheThao + totalYTe}`,
          extraData: "",
          tongtien: totalDoAn + totalNuoc + totalSan + totalTheThao + totalYTe,
          ngaytao: formatDate(new Date()),
        });

        if (response) {
          window.location.href = response.data.payUrl;
          console.log(response);
          if (response.data.code === "0") {
            navigate("/trang-chu");
          }
        } else {
          console.error("Payment URL not found in the response");
        }
      } else {
        alert("Vui lòng đặt sân trước khi thanh toán");
      }
    } catch (error) {
      console.error("Error during the payment process:", error);
    }
    // axios
    //   .post("/payment/momo", {
    //     total: (totalDoAn + totalNuoc + totalSan + totalTheThao + totalYTe) / 2,
    //   })
    //   .then((res) => {
    //     if (res) {
    //       window.location.href =
    //         "https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTcxODgxMDIyMzE3OA&s=3cd2880558df6c64fd8c655e7d7c9d6be39ac678ee2ca7f567d8811aa33bc489";
    //     }
    //   });
  };
  const deleteTamTinhSan = async (id) => {
    try {
      await axios.delete(`/tam-tinh/delete-tam-tinh-san/${id}`).then((res) => {
        if (res) {
          alert("Xoá thành công");
          fetchSan();
        }
      });
    } catch (error) {
      if (error.response.status >= 500) {
        alert("Error system");
      } else {
        alert(error.response.data.message);
      }
    }
  };
  const deleteTamTinhNuocUong = async (id) => {
    try {
      await axios
        .delete(`/tam-tinh/delete-tam-tinh-nuoc-uong/${id}`)
        .then((res) => {
          if (res) {
            alert("Xoá thành công");
            fetchNuoc();
          }
        });
    } catch (error) {
      if (error.response.status >= 500) {
        alert("Error system");
      } else {
        alert(error.response.data.message);
      }
    }
  };
  const deleteTamTinhDoAn = async (id) => {
    try {
      await axios
        .delete(`/tam-tinh/delete-tam-tinh-do-an/${id}`)
        .then((res) => {
          if (res) {
            alert("Xoá thành công");
            fetchDoAn();
          }
        });
    } catch (error) {
      if (error.response.status >= 500) {
        alert("Error system");
      } else {
        alert(error.response.data.message);
      }
    }
  };
  const deleteTamTinhDungCuYTe = async (id) => {
    try {
      await axios
        .delete(`/tam-tinh/delete-tam-tinh-dung-cu-y-te/${id}`)
        .then((res) => {
          if (res) {
            alert("Xoá thành công");
            fetchYTe();
          }
        });
    } catch (error) {
      if (error.response.status >= 500) {
        alert("Error system");
      } else {
        alert(error.response.data.message);
      }
    }
  };
  const deleteTamTinhDungCuTheThao = async (id) => {
    try {
      await axios
        .delete(`/tam-tinh/delete-tam-tinh-dung-cu-the-thao/${id}`)
        .then((res) => {
          if (res) {
            alert("Xoá thành công");
            fetchTheThao();
          }
        });
    } catch (error) {
      if (error.response.status >= 500) {
        alert("Error system");
      } else {
        alert(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    // setStart(location.state.start);
    // setEnd(location.state.end);
    fetchDoAn();
    fetchNuoc();
    fetchSan();
    fetchTheThao();
    fetchYTe();
  }, []);
  if (localStorage.getItem("id") && localStorage.getItem("email")) {
    return (
      <div className={cx("small-container", "cart-page")}>
        <div className={cx("flex-item")}>
          <p className={cx("title")}>Sân</p>
          <table>
            <thead>
              <tr>
                <th width={50}></th>
                <th width={200}></th>
                <th>Sản phẩm</th>
                <th>Thông tin đặt</th>
                <th className={cx("thRight")} width={200}>
                  Tạm tính
                </th>
                <th width={80}></th>
              </tr>
            </thead>
            <tbody className={cx("scrollable-tbody")}>
              {listSan.map((item, index) => {
                if (item.trang_thai_tam_tinh === 0) {
                  return (
                    <tr key={index}>
                      {/* <td width={50}>
                  <input type="checkbox" style={{ width: "20px" }} />
                </td> */}
                      <td width={200}>
                        <div className={cx("cart-info")}>
                          <img
                            className={cx("productImage")}
                            src={item.hinh_anh}
                            alt=""
                          />
                        </div>
                      </td>
                      <td>
                        <p className={cx("productName")}>{item.ten_san}</p>
                        <small className={cx("productPrice")}>
                          {formatCurrency(item.gia_san)}
                        </small>
                      </td>
                      <td>
                        <div className={cx("info")}>
                          <p className={cx("start")}>{item.gio_bat_dau}</p>
                          <p className={cx("end")}>{item.gio_ket_thuc}</p>
                          <p className={cx("branch")}>
                            {formatDate(item.thoi_gian)}
                          </p>
                          <p className={cx("branch")}>{item.ten_chi_nhanh}</p>
                          <p className={cx("address")}>
                            {item.dia_chi}, {item.ten_phuong}, {item.ten_quan}
                          </p>
                        </div>
                      </td>
                      <td className={cx("tdRight")} width={200}>
                        {formatCurrency(item.gia_san)}
                      </td>
                      <td width={80} className={cx("tdAction")}>
                        <button className={cx("btn", "btn-danger")}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() =>
                              deleteTamTinhSan(item.ma_tam_tinh_san)
                            }
                          />
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <div className={cx("flex-item")}>
          <p className={cx("title")}>Nước</p>
          <table>
            <thead>
              <tr>
                <th width={50}></th>
                <th width={200}></th>
                <th>Sản phẩm</th>
                <th width={200}>Số lượng</th>
                <th className={cx("thRight")} width={200}>
                  Tạm tính
                </th>
                <th width={80}></th>
              </tr>
            </thead>
            <tbody className={cx("scrollable-tbody")}>
              {listNuocUong.map((item, index) => {
                const totalPrice = listNuocUong.reduce(
                  (accumulator, currentValue) => {
                    return accumulator + currentValue.so_luong;
                  },
                  0
                );
                if (item.trang_thai_tam_tinh === 0) {
                  return (
                    <tr key={index}>
                      {/* <td width={50}>
                  <input type="checkbox" style={{ width: "20px" }} />
                </td> */}
                      <td width={200}>
                        <div className={cx("cart-info")}>
                          <img
                            className={cx("productImage")}
                            src={item.hinh_anh}
                            alt=""
                          />
                        </div>
                      </td>
                      <td>
                        <p className={cx("productName")}>
                          {item.ten_nuoc_uong}
                        </p>
                        <small className={cx("productPrice")}>
                          {formatCurrency(item.gia_nuoc)}
                        </small>
                      </td>
                      <td width={200}>
                        <input type="number" value={item.so_luong_tam_tinh} />
                      </td>
                      <td className={cx("tdRight")} width={200}>
                        {formatCurrency(item.gia_nuoc)}
                      </td>
                      <td width={80} className={cx("tdAction")}>
                        <button className={cx("btn", "btn-danger")}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() =>
                              deleteTamTinhNuocUong(item.ma_tam_tinh_nuoc_uong)
                            }
                          />
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <div className={cx("flex-item")}>
          <p className={cx("title")}>Đồ ăn</p>
          <table>
            <thead>
              <tr>
                <th width={50}></th>
                <th width={200}></th>
                <th>Sản phẩm</th>
                <th width={200}>Số lượng</th>
                <th className={cx("thRight")} width={200}>
                  Tạm tính
                </th>
                <th width={80}></th>
              </tr>
            </thead>
            <tbody className={cx("scrollable-tbody")}>
              {listDoAn.map((item, index) => {
                const totalPrice = listDoAn.reduce(
                  (accumulator, currentValue) => {
                    return accumulator + currentValue.so_luong;
                  },
                  0
                );
                if (item.trang_thai_tam_tinh === 0) {
                  return (
                    <tr key={index}>
                      {/* <td width={50}>
                  <input type="checkbox" style={{ width: "20px" }} />
                </td> */}
                      <td width={200}>
                        <div className={cx("cart-info")}>
                          <img
                            className={cx("productImage")}
                            src={item.hinh_anh}
                            alt=""
                          />
                        </div>
                      </td>
                      <td>
                        <p className={cx("productName")}>{item.ten_do_an}</p>
                        <small className={cx("productPrice")}>
                          {formatCurrency(item.gia_do_an)}
                        </small>
                      </td>
                      <td width={200}>
                        <input type="number" value={item.so_luong} />
                      </td>
                      <td className={cx("tdRight")} width={200}>
                        {formatCurrency(item.gia_do_an)}
                      </td>
                      <td width={80} className={cx("tdAction")}>
                        <button className={cx("btn", "btn-danger")}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() =>
                              deleteTamTinhDoAn(item.ma_tam_tinh_do_an)
                            }
                          />
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <div className={cx("flex-item")}>
          <p className={cx("title")}>Dụng cụ thể thao</p>
          <table>
            <thead>
              <tr>
                <th width={50}></th>
                <th width={200}></th>
                <th>Sản phẩm</th>
                <th width={200}>Số lượng</th>
                <th className={cx("thRight")} width={200}>
                  Tạm tính
                </th>
                <th width={80}></th>
              </tr>
            </thead>
            <tbody className={cx("scrollable-tbody")}>
              {listDungCuTheThao.map((item, index) => {
                const totalPrice = listDungCuTheThao.reduce(
                  (accumulator, currentValue) => {
                    return accumulator + currentValue.so_luong;
                  },
                  0
                );
                if (item.trang_thai_tam_tinh === 0) {
                  return (
                    <tr key={index}>
                      {/* <td width={50}>
                  <input type="checkbox" style={{ width: "20px" }} />
                </td> */}
                      <td width={200}>
                        <div className={cx("cart-info")}>
                          <img
                            className={cx("productImage")}
                            src={item.hinh_anh}
                            alt=""
                          />
                        </div>
                      </td>
                      <td>
                        <p className={cx("productName")}>
                          {item.ten_dung_cu_the_thao}
                        </p>
                        <small className={cx("productPrice")}>
                          {formatCurrency(item.gia_dung_cu)}
                        </small>
                      </td>
                      <td width={200}>
                        <input type="number" value={item.so_luong_tam_tinh} />
                      </td>
                      <td className={cx("tdRight")} width={200}>
                        {formatCurrency(item.gia_dung_cu)}
                      </td>
                      <td width={80} className={cx("tdAction")}>
                        <button className={cx("btn", "btn-danger")}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() =>
                              deleteTamTinhDungCuTheThao(
                                item.ma_tam_tinh_dung_cu_the_thao
                              )
                            }
                          />
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <div className={cx("flex-item")}>
          <p className={cx("title")}>Dụng cụ y tế</p>
          <table>
            <thead>
              <tr>
                <th width={50}></th>
                <th width={200}></th>
                <th>Sản phẩm</th>
                <th width={200}>Số lượng</th>
                <th className={cx("thRight")} width={200}>
                  Tạm tính
                </th>
                <th width={80}></th>
              </tr>
            </thead>
            <tbody className={cx("scrollable-tbody")}>
              {listDungCuYTe.map((item, index) => {
                const totalPrice = listDungCuYTe.reduce(
                  (accumulator, currentValue) => {
                    return accumulator + currentValue.so_luong_tam_tinh;
                  },
                  0
                );
                if (item.trang_thai_tam_tinh === 0) {
                  return (
                    <tr key={index}>
                      {/* <td width={50}>
                  <input type="checkbox" style={{ width: "20px" }} />
                </td> */}
                      <td width={200}>
                        <div className={cx("cart-info")}>
                          <img
                            className={cx("productImage")}
                            src={item.hinh_anh}
                            alt=""
                          />
                        </div>
                      </td>
                      <td>
                        <p className={cx("productName")}>
                          {item.ten_dung_cu_y_te}
                        </p>
                        <small className={cx("productPrice")}>
                          {formatCurrency(item.gia_dung_cu)}
                        </small>
                      </td>
                      <td width={200}>
                        <input type="number" value={item.so_luong_tam_tinh} />
                      </td>
                      <td className={cx("tdRight")} width={200}>
                        {formatCurrency(item.gia_dung_cu)}
                      </td>
                      <td width={80} className={cx("tdAction")}>
                        <button className={cx("btn", "btn-danger")}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() =>
                              deleteTamTinhDungCuYTe(
                                item.ma_tam_tinh_dung_cu_y_te
                              )
                            }
                          />
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>

        <div className={cx("total-price")}>
          <table>
            <tbody>
              <tr>
                <td>Tạm tính</td>
                <td>
                  {formatCurrency(
                    totalDoAn + totalNuoc + totalSan + totalTheThao + totalYTe
                  )}
                </td>
              </tr>

              <tr>
                <td>Tổng tiền</td>
                <td>
                  {formatCurrency(
                    totalDoAn + totalNuoc + totalSan + totalTheThao + totalYTe
                  )}
                </td>
              </tr>
              <tr>
                <td>Tiền cần thanh toán (50% tổng tiền)</td>
                <td>
                  {formatCurrency(
                    (totalDoAn +
                      totalNuoc +
                      totalSan +
                      totalTheThao +
                      totalYTe) /
                      2
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    className={cx("btn", "btn-intermediate")}
                    onClick={handlePayment}
                  >
                    Thanh toán Momo
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    alert("Vui lòng đăng nhập trước khi thanh toán");
    navigate("/dang-nhap");
  }
}
