import { Route, Routes } from "react-router-dom";
import { routes } from ".";
import GuestPage from "../pages/GuestPage/GuestPage";
import LoginPageCard from "../pages/LoginPage/LoginPageCard";
import RegisterPageCard from "../pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage.jsx/ForgotPasswordPage";
import FAQPage from "../pages/FAQPage/FAQPage";
import CollectionPage from "../pages/CollectionPage/CollectionPage";
import Blog from "../pages/BlogPage/Blog";
import SaleEventPage from "../pages/SaleEventPage/SaleEventPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AboutPage from "../pages/AboutPage/AboutPage";
import ChainSizePage from "../pages/ChainSizePage/ChainSizePage";
import SizePage from "../pages/SizePage/SizePage";
import DiamondKnowledgePage from "../pages/DiamondKnowledgePage/DiamondKnowledgePage";
import AccessoryInfor from "../pages/AccessoryInforPage/AccessoryInforPage";
import WarrantyPolicyPage from "../pages/WarrantyPolicyPage/WarrantyPolicyPage";
import AdminProduct from "../pages/AdminDashboard/AdminProduct/AdminProduct";
import AdminDiamond from "../pages/AdminDashboard/AdminDiamond/AdminPageDiamond";
import AdminCategory from "../pages/AdminDashboard/AdminCategory/AdminCategory";
import ProtectedRoute from "./protectedRoute";
import AdminDiamondShell from "../pages/AdminDashboard/AdminDiamond/AdminPageDiamondShell";
import CartPage from "../pages/CartPage/CartPage";
import CheckOut from "../pages/CheckOut/CheckOut";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DiamondPricePage from "../pages/DiamondPricePage/DiamondPricePage";
import ProductPage from "../pages/ProductPage/ProductDetailPage";
import SaleProductPage from "../pages/SaleProductPage/SaleProductPage";
import TrackingPage from "../pages/TrackingPage/TrackingPage";
import SaleStaffPage from "../pages/SaleStaffPage/SaleStaffPage";
import DeliveryStaffPage from "../pages/DeliveryStaffPage/DeliveryStaffPage";
import AdminCertificate from "../pages/AdminDashboard/AdminCertificate/AdminCertificate";
import AdminUser from "../pages/AdminDashboard/AdminUser/AdminUser";
import AdminOrder from "../pages/AdminDashboard/AdminManageOrder/AdmiManageOrder";
import ChangePasswordPage from "../pages/ChangePassword/ChangePassword";
import CollectionSet1 from "../pages/CollectionPage/CollectionSet1";
import CollectionSet2 from "../pages/CollectionPage/CollectionSet2";
import CollectionSet3 from "../pages/CollectionPage/CollectionSet3";

export default function AppRoute() {
  return (
    <Routes>
      <Route path={routes.home} element={<GuestPage />} />

      <Route path={routes.login} element={<LoginPageCard />} />
      <Route path={routes.register} element={<RegisterPageCard />} />
      <Route path={routes.forgot} element={<ForgotPasswordPage />} />
      <Route path={routes.changePassword} element={<ChangePasswordPage />} />

      <Route path={routes.faq} element={<FAQPage />} />
      <Route path={routes.size} element={<SizePage />} />
      <Route path={routes.bst} element={<CollectionPage />} />
      <Route path={routes.blog} element={<Blog />} />
      <Route path={routes.sale} element={<SaleEventPage />} />
      <Route path={routes.diamondprice} element={<DiamondPricePage />} />
      <Route path={routes.bstset1} element={<CollectionSet1 />} />
      <Route path={routes.bstset2} element={<CollectionSet2 />} />
      <Route path={routes.bstset3} element={<CollectionSet3 />} />
      <Route
        path={routes.profile}
        element={
          <ProtectedRoute role="CUSTOMER">
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path={routes.about} element={<AboutPage />} />
      <Route path={routes.chain} element={<ChainSizePage />} />
      <Route path={routes.kienthuc} element={<DiamondKnowledgePage />} />
      <Route path={routes.accessoryInfor} element={<AccessoryInfor />} />
      <Route path={routes.warrantyPolicy} element={<WarrantyPolicyPage />} />
      <Route
        path={routes.adminProduct}
        element={
          <ProtectedRoute role="ADMIN">
            <AdminProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.adminDiamond}
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDiamond />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.adminDiamondshell}
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDiamondShell />
          </ProtectedRoute>
        }
      />

      <Route
        path={routes.adminCategory}
        element={
          <ProtectedRoute role="ADMIN">
            <AdminCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.adminCertificate}
        element={
          <ProtectedRoute role="ADMIN">
            <AdminCertificate />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.adminUser}
        element={
          <ProtectedRoute role="ADMIN">
            <AdminUser />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.adminmanageorder}
        element={
          <ProtectedRoute role="ADMIN">
            <AdminOrder />
          </ProtectedRoute>
        }
      />
      <Route path={routes.notfound} element={<ErrorPage />} />
      <Route path={routes.cart} element={<CartPage />} />
      <Route path={routes.checkout} element={<CheckOut />} />
      <Route path={routes.productdetail} element={<ProductPage />} />
      <Route path={routes.saleEvent} element={<SaleEventPage />} />
      <Route path={routes.saleProduct} element={<SaleProductPage />} />
      <Route path={routes.productdetail} element={<ProductPage />} />
      <Route path={routes.tracking} element={<TrackingPage />} />
      <Route
        path={routes.saleStaff}
        element={
          <SaleStaffPage />
          // <ProtectedRoute role="SALES">
          //   <SaleStaffPage />
          // </ProtectedRoute>
        }
      />
      <Route
        path={routes.deliveryStaff}
        element={
          <ProtectedRoute role="DELIVERY">
            <DeliveryStaffPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
