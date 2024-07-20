import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import style from './UserLayout.module.scss'
import classNames from "classnames/bind";
const cx = classNames.bind(style);
export default function UserLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
