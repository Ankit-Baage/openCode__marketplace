import { RootLayout } from "../pages/RootLayout";
import { Authentication } from "../pages/authentication/Authentication";

import { OtpVerification } from "../pages/authentication/otpVerification/OtpVerification";
import { HomePage } from "../pages/home/homePage/HomePage";

import { Error } from "../components/error/Error";
import { ProtectedOtpRoute } from "../route-guard/auth/ProtectedOtpRoute";
import { UserProfile } from "../pages/profile/UserProfile";

import { VrpPage } from "../pages/vrp/VrpPage";
import { VrpDetailPage } from "../pages/vrp/VrpDetailPage";
import { LoginPage } from "../pages/authentication/login/LoginPage";
import { VrpListPage } from "../pages/vrpList/VrpListPage";
import { SparesPage } from "../pages/spares/SparesPage";
import { SpareListPage } from "../pages/spares/SpareListPage";
import { SpareDetailPage } from "../pages/spares/SpareDetailPage";
import { NewPhonePage } from "../pages/newPhones/NewPhonePage";
import { NewPhoneListPage } from "../pages/newPhones/NewPhoneListPage";
import { NewPhoneDetailPage } from "../pages/newPhones/newPhoneFilters/NewPhoneDetailPage";
import { OpenBoxPage } from "../pages/openBox/OpenBoxPage";
import { OpenBoxListPage } from "../pages/openBox/OpenBoxListPage";
import { OpenBoxDetailPage } from "../pages/openBox/openBoxFilters/OpenBoxDetailPage";
import { CartPage } from "../pages/cart/CartPage";
import { ProfileInfoPage } from "../pages/profileInfo/ProfileInfoPage";
import { ProfileNavigation } from "../components/profileNavigation/ProfileNavigation";
import { AddressPage, checkAuthLoader } from "../pages/address/AddressPage";
import { AddressOutlet } from "../pages/address/AddressOutlet";
import { AddressDetailPage } from "../pages/address/AddressDetailPage";
import { HelpPage } from "../pages/help/HelpPage";
import { LaterPage } from "../pages/later/LaterPage";
import { WishListPage } from "../pages/wishList/WishListPage";
import { CouponsPage } from "../pages/coupons/CouponsPage";
import { ReviewPage } from "../pages/review/ReviewPage";
import { OrdersPage } from "../pages/order/OrdersPage";

import { OrderSuccess } from "../components/orderSuccess/OrderSuccess";
import { Help } from "../components/help/Help";
import { ProfileStaticOutlet } from "../pages/profileStatic/ProfileStaticOutlet";
import { HelpCategory } from "../components/help/helpCategory/HelpCategory";
import { OtherDetails } from "../components/profileInfoStatic/OtherDetails";
import { CategoryPage } from "../pages/category/CategoryPage";
import { RazorpayPayment } from "../pages/payment/PaymentPage";
import { AboutUsPage } from "../pages/staticPages/aboutUsPage/AboutUsPage";
import { SupportPage } from "../pages/staticPages/supportPage/SupportPage";

import { PrivacyPoliciesPage } from "../pages/staticPages/privacyPoliciesPage/PrivacyPoliciesPage";
import { ReplacementPoliciesPage } from "../pages/staticPages/replacementPoliciesPage/ReplacementPoliciesPage";
import { TermsNConditionsPage } from "../pages/staticPages/tNcPage/TermsNConditionsPage";
import { WarrantyPage } from "../pages/staticPages/warrantyPage/WarrantyPage";
import { FaqPage } from "../pages/staticPages/faqPage/FaqPage";
import { GlobalSearchPage } from "../pages/globalSearch/GlobalSearchPage";
import { HotSellingListPage } from "../pages/hotSelling/HotSellingListPage";
import { CartOutlet } from "../pages/cart/CartOutlet";
import { DeleteAccount } from "../pages/staticPages/deleteAccount/DeleteAccount";
// import SitemapPage from "../pages/siteMap/SitemapPage";

export const mainRoutes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      { path: "search", element: <GlobalSearchPage /> },
      { path: "hotSelling", element: <HotSellingListPage /> },

      {
        path: "spares",
        element: <SparesPage />,
        children: [
          // 1️⃣ Default list page
          { index: true, element: <SpareListPage /> }, // /spares

          // 2️⃣ Detail page
          {
            path: ":brand/:model/:spareName/:id",
            element: <SpareDetailPage />,
          },

          // 3️⃣ Filtered list page (all optional)
          {
            path: ":brand?/:model?/:spare?/:price?",
            element: <SpareListPage />,
          },
        ],
      },

      {
        path: "profileInfo",
        element: <ProfileInfoPage />,
        children: [
          { index: true, element: <ProfileNavigation /> },
          {
            path: "profile",
            element: <UserProfile />,
            loader: checkAuthLoader,
          },
          { path: "later", element: <LaterPage />, loader: checkAuthLoader },
          {
            path: "wishList",
            element: <WishListPage />,
            loader: checkAuthLoader,
          },
          {
            path: "address",
            element: <AddressOutlet />,
            loader: checkAuthLoader,
            children: [
              { index: true, element: <AddressPage /> },
              { path: ":addressId", element: <AddressDetailPage /> },
              { path: "add", element: <AddressDetailPage /> },
            ],
          },
          { path: "orders", element: <OrdersPage />, loader: checkAuthLoader },
        ],
      },

      {
        path: "cart",
        element: <CartOutlet />,
        children: [
          { index: true, element: <CartPage /> },
          { path: "coupons", element: <CouponsPage /> },
        ],
      },
      // {
      //   path: "cart",
      //   element: <CartPage />,
      // },
      // { path: "coupons", element: <CouponsPage /> },

      {
        path: "address",
        element: <AddressOutlet />,
        loader: checkAuthLoader,
        children: [
          { index: true, element: <AddressPage /> },
          { path: ":addressId", element: <AddressDetailPage /> },
          { path: "add", element: <AddressDetailPage /> },
        ],
      },
      { path: "review", element: <ReviewPage /> },
      { path: "order-success", element: <OrderSuccess /> },
      {
        path: "category",
        element: <CategoryPage />,
      },

      {
        path: "help",
        element: <HelpPage />,
        children: [
          { index: true, element: <Help /> },
          { path: ":helpCategory", element: <HelpCategory /> },
        ],
      },

      {
        path: "policies",
        element: <ProfileStaticOutlet />,
        children: [
          // { path: ":detailCategory", element: <OtherDetails /> },
          { path: "aboutUs", element: <AboutUsPage /> },
          { path: "support", element: <SupportPage /> },
          { path: "privacy", element: <PrivacyPoliciesPage /> },
          {
            path: "refundAndReplacement",
            element: <ReplacementPoliciesPage />,
          },
          { path: "termsAndConditions", element: <TermsNConditionsPage /> },
          { path: "warranty", element: <WarrantyPage /> },
          { path: "faqs", element: <FaqPage /> },
          { path: "deleteAccount", element: <DeleteAccount /> },
        ],
      },
    ],
  },

  {
    path: "authentication",
    element: <Authentication />,

    children: [
      { index: true, element: <LoginPage /> },
      {
        path: "otpVerification",
        element: <ProtectedOtpRoute element={<OtpVerification />} />,
      },
    ],
  },
];
