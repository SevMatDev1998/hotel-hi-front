import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "../pages/404/NotFound";
import RouteEnum from "../enums/route.enum";
import HotelPage from "../pages/hotel/HotelPage";
import { MainLayout } from "../layouts/mainLayout/MainLayout";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import RoomsPage from "../pages/rooms/RoomsPage";
import NewRoomPage from "../pages/rooms/NewRoomPage";
import RoomPage from "../pages/rooms/RoomPage";
import EditRoomPage from "../pages/rooms/EditRoomPage";
import FoodsPage from "../pages/foods/FoodsPage";
import HotelServicesPage from "../pages/hotelServices/HotelServicesPage";
import PricePolicyPage from "../pages/pricePolicy/PricePolicyPage";
import AddPricePolicyPage from "../pages/pricePolicy/AddPricePolicyPage";
import HotelPartnersPage from "../pages/hotelPartners/HotelPartnersPage";
import NewHotelPartnerPage from "../pages/hotelPartners/NewHotelPartnerPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import VerifyPage from "../pages/auth/VerifyPage";
import PricePolicyDatesPage from "../pages/pricePolicy/PricePolicyDatesPage";
import AcceptPartnerPage from "../pages/guest/AcceptPartnerPage";
import HotelPartnerPage from "../pages/hotelPartners/HotelPartnerPage";
import EditHotelPartnerPage from "../pages/hotelPartners/EditHotelPartnerPage";


const router = createBrowserRouter([
  {
    element: <MainLayout />,        // нет path — просто layout
    errorElement: <NotFound />,
    children: [

      { path: "/", element: <Navigate to={RouteEnum.HOTEL} replace /> },
      // { path: RouteEnum.HOME, element: <DashboardPage /> },
      { path: RouteEnum.HOTEL, element: <HotelPage /> },


      // rooms
      { path: RouteEnum.ROOMS, element: <RoomsPage /> },
      { path: `${RouteEnum.ROOMS_CREATE}`, element: <NewRoomPage /> },
      { path: `${RouteEnum.ROOMS}/:roomId/edit`, element: <EditRoomPage /> },
      { path: `${RouteEnum.ROOMS}/:roomId`, element: <RoomPage /> },

      { path: RouteEnum.FOODS, element: <FoodsPage /> },
      { path: RouteEnum.HOTEL_SERVICES, element: <HotelServicesPage /> },

      { path: RouteEnum.PRICE_POLICY, element: <PricePolicyPage /> },
      { path: RouteEnum.PRICE_POLICY_DATES, element: <PricePolicyDatesPage /> },

      { path: `${RouteEnum.PRICE_POLICY_CREATE}`, element: <AddPricePolicyPage /> },

      { path: RouteEnum.HOTEL_PARTNERS, element: <HotelPartnersPage /> },
      { path: `${RouteEnum.HOTEL_PARTNERS_CREATE}`, element: <NewHotelPartnerPage /> },
      { path: `${RouteEnum.HOTEL_PARTNER}`, element: <HotelPartnerPage /> },
      { path: `${RouteEnum.EDIT_HOTEL_PARTNER}`, element: <EditHotelPartnerPage /> },

      
      { path: `${RouteEnum.NOTIFICATIONS}`, element: <NotificationsPage /> },

      { path: RouteEnum.LOGIN, element: <LoginPage /> },
      { path: RouteEnum.SIGN_UP, element: <SignUpPage /> },
      { path: RouteEnum.VERIFY, element: <VerifyPage /> },

      { path: RouteEnum.GUEST_ACCEPT_PARTNER, element: <AcceptPartnerPage /> },


      { errorElement: <NotFound /> }
    ],
  },

  { path: RouteEnum.NOT_FOUND, element: <NotFound /> },
]);

export default router;