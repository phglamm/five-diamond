import { Link } from "react-router-dom";
import "./SideBar.css";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import CategoryIcon from "@mui/icons-material/Category";
import DiamondIcon from "@mui/icons-material/Diamond";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import { routes } from "../../routes";
import { logout, selectUser } from "../../redux/features/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import InventoryIcon from "@mui/icons-material/Inventory";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function SideBar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="sidenav">
      <div className="sidenav-header">
        <img
          src={
            "https://drive.google.com/thumbnail?id=1g8TEiTOlnpFsJRxWMH7EF89QuVk9qk6n&sz=w1000"
          }
          alt="diamond-img"
        />
        <span>Five Diamond</span>
      </div>
      <hr className="rounded" />

      <div className="user-info">
        <div className="user-details">
          <h1>
            {user.firstname} {user.lastname}
          </h1>
          <Link onClick={handleLogout} to={routes.login}>
            <LogoutIcon color="info" fontSize="large"></LogoutIcon>
          </Link>
        </div>
      </div>

      <hr className="rounded" />

      {user.role === "ADMIN" ? (
        <>
          {" "}
          <li>
            <StackedLineChartIcon color="info" fontSize="large" />
            <Link to="">Thống Kê</Link>
          </li>
          <li>
            <BarChartIcon color="info" fontSize="large" />
            <Link to={routes.adminchart}>Biểu Đồ</Link>
          </li>
          <li>
            <PersonIcon color="info" fontSize="large" />
            <Link to={routes.adminUser}>Quản Lý Người Dùng</Link>
          </li>
          <li>
            <PersonIcon color="info" fontSize="large" />
            <Link to={routes.home}>Quay về trang chủ</Link>
          </li>
        </>
      ) : (
        <></>
      )}
      {user.role === "MANAGER" ? (
        <>
          <li>
            <StackedLineChartIcon color="info" fontSize="large" />
            <Link to="">Thống Kê</Link>
          </li>
          <li>
            <BarChartIcon color="info" fontSize="large" />
            <Link to={routes.adminchart}>Biểu Đồ</Link>
          </li>
          <li>
            <ShoppingCartIcon color="info" fontSize="large" />
            <Link to={routes.adminmanageorder}>Quản Lý Đơn Hàng</Link>
          </li>
          <li>
            <InventoryIcon color="info" fontSize="large" />
            <Link to={routes.adminCover}>Danh Mục Sản Phẩm</Link>
          </li>

          <li>
            <DiamondIcon color="info" fontSize="large" />
            <Link to={routes.adminDiamond}>Quản Lý Kim Cương</Link>
          </li>
          <li>
            <FindInPageIcon color="info" fontSize="large" />
            <Link to={routes.adminCertificate}>Quản Lý Chứng Chỉ</Link>
          </li>
          <li>
            <InventoryIcon color="info" fontSize="large" />
            <Link to={routes.adminbst}>Quản Lý Bộ Sưu Tập</Link>
          </li>
          <li>
            <CategoryIcon color="info" fontSize="large" />
            <Link to={routes.adminCategory}>Quản Lý Danh Mục</Link>
          </li>
          <li>
            <EventIcon color="info" fontSize="large" />
            <Link to={routes.adminsale}>Quản Lý Sự Kiện Sale</Link>
          </li>
          <li>
            <MonetizationOnIcon color="info" fontSize="large" />
            <Link to={routes.adminDiamondPrice}>Quản Lý Giá Kim Cương</Link>
          </li>
          <li>
            <PersonIcon color="info" fontSize="large" />
            <Link to={routes.home}>Quay về trang chủ</Link>
          </li>
        </>
      ) : (
        <></>
      )}
      {/* <li>
        <ShoppingCartIcon color="info" fontSize="large"></ShoppingCartIcon>
        <Link to={routes.adminmanageorder}>Quản Lý Đơn Hàng</Link>
      </li>
      <li>
        <InventoryIcon color="info" fontSize="large"></InventoryIcon>
        <Link to={routes.adminCover}>Danh Mục Sản Phẩm</Link>
      </li>
      <li>
        <InventoryIcon color="info" fontSize="large"></InventoryIcon>
        <Link to={routes.adminbst}>Quản Lý Bộ Sưu Tập</Link>
      </li>
      <li>
        <DiamondIcon color="info" fontSize="large"></DiamondIcon>
        <Link to={routes.adminDiamond}>Quản Lý Kim Cương</Link>
      </li>
      <li>
        <FindInPageIcon color="info" fontSize="large"></FindInPageIcon>
        <Link to={routes.adminCertificate}>Quản Lý Chứng Chỉ</Link>
      </li>
      <li>
        <CategoryIcon color="info" fontSize="large"></CategoryIcon>
        <Link to={routes.adminCategory}>Quản Lý Danh Mục</Link>
      </li>
      <li>
        <PersonIcon color="info" fontSize="large"></PersonIcon>
        <Link to={routes.adminUser}>Quản Lý Người Dùng</Link>
      </li>
      <li>
        <EventIcon color="info" fontSize="large"></EventIcon>
        <Link to="">Quản Lý Sự Kiện Sale</Link>
      </li> */}
    </div>
  );
}
