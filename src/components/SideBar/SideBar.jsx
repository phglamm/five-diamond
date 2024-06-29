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
            "https://drive.google.com/thumbnail?id=1TID9g_LphvHeN1htPBH_0zoxe0o1CqaE&sz=w1000"
          }
          alt=""
        />

        <span>Five Diamond</span>
      </div>
      <hr className="rounded" />
      <h1>
        {user.firstname} {user.lastname}
      </h1>
      <hr className="rounded" />

      <li>
        <StackedLineChartIcon
          color="info"
          fontSize="large"
        ></StackedLineChartIcon>
        <Link to={routes.adminstats}>Thống Kê</Link>
      </li>
      <li>
        <BarChartIcon color="info" fontSize="large"></BarChartIcon>
        <Link to="">Biểu Đồ</Link>
      </li>
      <li>
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
      </li>
      <li>
        <LogoutIcon color="info" fontSize="large"></LogoutIcon>
        <Link onClick={handleLogout} to={routes.login}>
          Đăng Xuất
        </Link>
      </li>
    </div>
  );
}
