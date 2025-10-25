import { createBrowserRouter } from "react-router-dom";
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

// import NewPasswordPage from "../pages/auth/NewPasswordPage";

// import LoginPage from "../pages/auth/LoginPage";
// import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
// import CheckEmailVerificationPage from "../pages/auth/CheckEmailVerificationPage";
// import { UsersPage } from "../pages/users/usersPage/UsersPage";
// import EditUserPage from "../pages/users/editUser/EditUserPage";
// import { UserDetailsPage } from "../pages/users/userPage/UserDetailsPage";
// import { NewUser } from "../pages/users/newUser/NewUser";
// import EditCoursePage from "../pages/courses/editCourse/EditCoursePage";
// import { CourseDetailsPage } from "../pages/courses/courseDetails/CourseDetailsPage";
// import NewCourse from "../pages/courses/newCourse/NewCourse";
// import { CoursesPage } from "../pages/courses/coursesPage/CoursesPage";
// import LessonsPage from "../pages/lessons/lessonsPage/LessonsPage";
// import NewLessonPage from "../pages/lessons/newLesson/NewLessonPage";
// import LessonDetailsPage from "../pages/lessons/lessonDetails/LessonDetailsPage";
// import EditLessonPage from "../pages/lessons/editLesson/EditLessonPage";
// import FAQsPage from "../pages/FAQ/FAQPage/FAQsPage";
// import NewFAQPage from "../pages/FAQ/newFAQ/NewFAQPage";
// import FAQDetailsPage from "../pages/FAQ/FAQDetails/FAQDetailsPage";
// import EditFAQPage from "../pages/FAQ/editFAQ/EditFAQPage";
// import SwapUsersPage from "../pages/userGroup/swapUsers/SwapUsersPage";
// import UserGroupsPage from "../pages/userGroup/userGroupsPage/UserGroupsPage";
// import NewUserGroup from "../pages/userGroup/newUserGroup/NewUserGroup";
// import UserGroupDetailsPage from "../pages/userGroup/userGroupDetails/UserGroupDetailsPage";
// import EditUserGroupPage from "../pages/userGroup/editUserGroup/EditUserGroupPage";
// import CommentDetailsPage from "../pages/comments/CommentDetails/CommentDetailsPage";
// import NewMeetPage from "../pages/meets/newMeet/NewMeetPage";
// import NewsPage from "../pages/news/NewsPage/NewsPage";
// import NewNewsPage from "../pages/news/newNews/NewNewsPage";
// import NewsDetailsPage from "../pages/news/NewsDetails/NewsDetailsPage";
// import EditNewsPage from "../pages/news/editNews/EditNewsPage";
// import LessonOwnersPage from "../pages/lessonOwner/LessonOwnersPage/LessonOwnersPage";
// import NewLessonOwnerPage from "../pages/lessonOwner/newLessonOwner/NewLessonOwnerPage";
// import LessonOwnerDetailsPage from "../pages/lessonOwner/LessonOwnerDetails/LessonOwnerDetailsPage";
// import EditLessonOwnerPage from "../pages/lessonOwner/editLessonOwner/EditLessonOwnerPage";
// import NotificationsPage from "../pages/notifications/NotificationsPage/NotificationsPage";
// import NotificationDetailsPage from "../pages/notifications/NotificationDetails/NotificationDetailsPage";
// import ReviewsPage from "../pages/reviews/reviewsPage/ReviewsPage";
// import MeetsPage from "../pages/meets/meetsPage/MeetsPage";
// import ReviewDetailsPage from "../pages/reviews/reviewDetails/ReviewDetailsPage";
// import DashboardPage from "../pages/dashboard/Dashboard";
// import MeetDetailsPage from "../pages/meets/meetDetails/MeetDetailsPage";
// import SubscriptionsPage from "../pages/subscriptions/subscriptionsPage/SubscriptionsPage";
// import SubscriptionsDetailsPage from "../pages/subscriptions/subscriptionsDetails/SubscriptionsDetailsPage";


const router = createBrowserRouter([
  {
    element: <MainLayout />,        // нет path — просто layout
    errorElement: <NotFound />,
    children: [
      // { path: RouteEnum.HOME, element: <DashboardPage /> },
      { path: RouteEnum.HOTEL, element: <HotelPage /> },


      // rooms
      { path: RouteEnum.ROOMS, element: <RoomsPage /> },
      { path: `${RouteEnum.ROOMS}/create`, element: <NewRoomPage /> },
      { path: `${RouteEnum.ROOMS}/:roomId/edit`, element: <EditRoomPage /> },
      { path: `${RouteEnum.ROOMS}/:roomId`, element: <RoomPage /> },


      { path: RouteEnum.FOODS, element: <FoodsPage /> },
      { path: RouteEnum.HOTEL_SERVICES, element: <HotelServicesPage /> },

      { path: RouteEnum.PRICE_POLICY, element: <PricePolicyPage /> },
      { path: `${RouteEnum.PRICE_POLICY}/create`, element: <AddPricePolicyPage /> },

      { path: RouteEnum.HOTEL_PARTNERS, element: <HotelPartnersPage /> },
      { path: `${RouteEnum.HOTEL_PARTNERS}/create`, element: <NewHotelPartnerPage /> },

      { errorElement: <NotFound /> }
    ],
  },
  {
    path: "/",
    children: [
      { path: RouteEnum.LOGIN, element: <LoginPage /> },
      { path: RouteEnum.SIGN_UP, element: <SignUpPage /> },

      // { path: RouteEnum.RESET_PASSWORD, element: <ResetPasswordPage /> },
      // { path: RouteEnum.NEW_PASSWORD, element: <NewPasswordPage /> },
      // { path: RouteEnum.CHECK_EMAIL_VERIFICATION, element: <CheckEmailVerificationPage /> },

    ]
  }
  ,
  { path: RouteEnum.NOT_FOUND, element: <NotFound /> },
]);

export default router;