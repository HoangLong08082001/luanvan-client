import AdminPages from "../pages/Admin/AdminPages/AdminPages";
import LoaiSan from "../pages/Admin/Category/LoaiSan";
import ChiNhanh from "../pages/Admin/ChiNhanh/ChiNhanh";
import DoAn from "../pages/Admin/DoAn/DoAn";
import ChiTietHoaDon from "../pages/Admin/DonGia/ChiTietHoaDon/ChiTietHoaDon";
import DonGia from "../pages/Admin/DonGia/DonGia";
import DungCuTheThao from "../pages/Admin/DungCuTheThao/DungCuTheThao";
import DungCuYTe from "../pages/Admin/DungCuYTe/DungCuYTe";
import ForgotPassword from "../pages/Admin/ForgotPassword/ForgotPassword";
import HomeAdmin from "../pages/Admin/HomeAdmin/HomeAdmin";
import LoginAdmin from "../pages/Admin/LoginAdmin/LoginAdmin";
import NuocUong from "../pages/Admin/NuocUong/NuocUong";
import ReNewPassAdmin from "../pages/Admin/ReNewPassAdmin/ReNewPass";
import San from "../pages/Admin/San/San";
import BadmintonPages from "../pages/User/BadmintonPages/BadmintonPages";
import BasketballPages from "../pages/User/BasketballPages/BasketballPages";
import Bill from "../pages/User/Bill/Bill";
import Branch from "../pages/User/Branch/Branch";
import Category from "../pages/User/Category/Category";
import Details from "../pages/User/Details/Details";
import Drinks from "../pages/User/Drinks/Drinks";
import Foods from "../pages/User/Foods/Foods";
import FootballPages from "../pages/User/FootballPages/FootballPages";
import Forgot from "../pages/User/Forgot/Forgot";
import Home from "../pages/User/Home/Home";
import Information from "../pages/User/Information/Information";
import LoginUser from "../pages/User/LoginUser/LoginUser";
import Medical from "../pages/User/Medical/Medical";
import ReNewPass from "../pages/User/ReNewPass/ReNewPass";
import RegisterUser from "../pages/User/RegisterUser/RegisterUser";
import Search from "../pages/User/Search/Search";
import Sport from "../pages/User/Sport/Sport";
import Success from "../pages/User/Success/Success";
import SuccessUpdate from "../pages/User/SuccessUpdate/SuccessUpdate";
import TennisPages from "../pages/User/TennisPages/TennisPages";
import Yard from "../pages/User/Yard/Yard";

const AdminRouter = [
  { path: "/admin", component: LoginAdmin },
  { path: "/admin-quen-mat-khau", component: ForgotPassword },
  { path: "/admin-cap-mat-khau/:id", component: ReNewPassAdmin },
  { path: "/admin-chi-tiet-hoa-don/:id", component: ChiTietHoaDon },
  { path: "/admin-trang-chu", component: HomeAdmin },
  { path: "/admin-chi-nhanh", component: ChiNhanh },
  { path: "/admin-do-an", component: DoAn },
  { path: "/admin-dung-cu-y-te", component: DungCuYTe },
  { path: "/admin-dung-cu-the-thao", component: DungCuTheThao },
  { path: "/admin-nuoc-uong", component: NuocUong },
  { path: "/admin-san", component: San },
  { path: "/admin-page", component: AdminPages },
  { path: "/admin-loai-san", component: LoaiSan },
  { path: "/admin-don-gia", component: DonGia },
];
const UserRouter = [
  { path: "/", component: Home },
  { path: "/trang-chu", component: Home },
  { path: "/dang-nhap", component: LoginUser },
  { path: "/dang-ky", component: RegisterUser },
  { path: "/quen-mat-khau", component: Forgot },
  { path: "/do-an", component: Foods },
  { path: "/nuoc-uong", component: Drinks },
  { path: "/loai-san", component: Category },
  { path: "/chi-tiet/:name/:id", component: Details },
  { path: "/san-bong-da", component: FootballPages },
  { path: "/san-bong-ro", component: BasketballPages },
  { path: "/san-cau-long", component: BadmintonPages },
  { path: "/san-tennis", component: TennisPages },
  { path: "/thanh-toan", component: Bill },
  { path: "/chi-nhanh", component: Branch },
  { path: "/dung-cu-y-te", component: Medical },
  { path: "/thong-tin/:name/:id", component: Information },
  { path: "/dung-cu-the-thao", component: Sport },
  { path: "/tim-kiem/:search", component: Search },
  { path: "/san/:name/:id", component: Yard },
  { path: "/chi-nhanh", component: Branch },
  { path: "/success/:id", component: Success },
  { path: "/new-password-page/:id", component: ReNewPass },
  { path: "/success-new-password", component: SuccessUpdate },
];
export { AdminRouter, UserRouter };
