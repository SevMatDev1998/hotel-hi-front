export enum RouteEnum {
    // Public
    LOGIN = "/login",
    RESET_PASSWORD = "/reset-password",
    NEW_PASSWORD = "/new-password/:token",
    CHECK_EMAIL_VERIFICATION = "/check-email-verification/:token",


    // Private
    HOME="/",
    USERS="/users",
    COURSES = "/courses", 
    LESSONS = "/lessons",
    FAQS="/faqs",
    USERGROUPS="/userGroups",
    COMMENTS="/comments",
    MEETS="/meets",
    NOTES="/notes",
    SUBSCRIPTIONS="/subscriptions",
    NOTIFICATIONS="/notifications",
    MESSAGES="/messages",
    NEWS="/news",
    LESSON_OWNERS = "/lesson-owners",
    REVIEWS='/reviews',
    NOT_FOUND = "*",
  }

  export default RouteEnum