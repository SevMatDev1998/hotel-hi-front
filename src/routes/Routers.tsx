import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/404/NotFound";
import RouteEnum from "../enums/route.enum";
import HotelPage from "../pages/hotel/HotelPage";
import { MainLayout } from "../layouts/mainLayout/MainLayout";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import RoomsPage from "../pages/rooms/RoomsPage";
import NewRoomPage from "../pages/rooms/NewRoomPage";

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


      // //users
      // { path: RouteEnum.USERS, element: <UsersPage /> },
      // { path: `${RouteEnum.USERS}/create`, element: <NewUser /> },
      // { path: `${RouteEnum.USERS}/:userId`, element: <UserDetailsPage /> },
      // { path: `${RouteEnum.USERS}/:userId/edit`, element: <EditUserPage /> },

      // //courses
      // { path: RouteEnum.COURSES, element: <CoursesPage /> },
      // { path: `${RouteEnum.COURSES}/create`, element: <NewCourse /> },
      // { path: `${RouteEnum.COURSES}/:courseId`, element: <CourseDetailsPage /> },
      // { path: `${RouteEnum.COURSES}/:courseId/edit`, element: <EditCoursePage /> },

      // // lessons
      // { path: RouteEnum.LESSONS, element: <LessonsPage /> },
      // { path: `${RouteEnum.LESSONS}/create`, element: <NewLessonPage /> },
      // { path: `${RouteEnum.LESSONS}/:id`, element: <LessonDetailsPage /> },
      // { path: `${RouteEnum.LESSONS}/:lessonId/edit`, element: <EditLessonPage /> },

      // // faqs
      // { path: RouteEnum.FAQS, element: <FAQsPage /> },
      // { path: `${RouteEnum.FAQS}/create`, element: <NewFAQPage /> },
      // { path: `${RouteEnum.FAQS}/:faqId`, element: <FAQDetailsPage /> },
      // { path: `${RouteEnum.FAQS}/:faqId/edit`, element: <EditFAQPage /> },


      // // news
      // { path: RouteEnum.NEWS, element: <NewsPage /> },
      // { path: `${RouteEnum.NEWS}/create`, element: <NewNewsPage /> },
      // { path: `${RouteEnum.NEWS}/:newsId`, element: <NewsDetailsPage /> },
      // { path: `${RouteEnum.NEWS}/:newsId/edit`, element: <EditNewsPage /> },


      // // lesson owner
      // { path: RouteEnum.LESSON_OWNERS, element: <LessonOwnersPage /> },
      // { path: `${RouteEnum.LESSON_OWNERS}/create`, element: <NewLessonOwnerPage /> },
      // { path: `${RouteEnum.LESSON_OWNERS}/:ownerId`, element: <LessonOwnerDetailsPage /> },
      // { path: `${RouteEnum.LESSON_OWNERS}/:ownerId/edit`, element: <EditLessonOwnerPage /> },


      // // userGroup
      // { path: RouteEnum.USERGROUPS, element: <UserGroupsPage /> },
      // { path: `${RouteEnum.USERGROUPS}/create`, element: <NewUserGroup /> },
      // { path: `${RouteEnum.USERGROUPS}/:userGroupId`, element: <UserGroupDetailsPage /> },
      // { path: `${RouteEnum.USERGROUPS}/:userGroupId/edit`, element: <EditUserGroupPage /> },
      // { path: `${RouteEnum.USERGROUPS}/swapUsers`, element: <SwapUsersPage /> },


      // // SUBSCRIPTIONS
      // { path: RouteEnum.SUBSCRIPTIONS, element: <SubscriptionsPage /> },
      // { path: `${RouteEnum.SUBSCRIPTIONS}/:subscriptionId`, element: <SubscriptionsDetailsPage /> },


      // // notifications
      // { path: RouteEnum.NOTIFICATIONS, element: <NotificationsPage /> },
      // { path: `${RouteEnum.NOTIFICATIONS}/:id`, element: <NotificationDetailsPage /> },

      // // meets
      // { path: RouteEnum.MEETS, element: <MeetsPage /> },
      // { path: `${RouteEnum.MEETS}/:meetId`, element: <MeetDetailsPage /> },
      // { path: `${RouteEnum.MEETS}/create`, element: <NewMeetPage /> },


      // // { path: `${RouteEnum.NOTIFICATIONS}/:id`, element: <NotificationDetailsPage /> },

      // //reviews
      // { path: `${RouteEnum.REVIEWS}`, element: <ReviewsPage /> },
      // { path: `${RouteEnum.REVIEWS}/:reviewId`, element: <ReviewDetailsPage /> },


      // //comments
      // { path: `${RouteEnum.COMMENTS}/:commentId`, element: <CommentDetailsPage /> },

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