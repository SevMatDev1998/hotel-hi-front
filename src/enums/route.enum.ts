export enum RouteEnum {
    // Public
    LOGIN = "/login",
    RESET_PASSWORD = "/reset-password",
    NEW_PASSWORD = "/new-password/:token",
    CHECK_EMAIL_VERIFICATION = "/check-email-verification/:token",
    SIGN_UP = "/sign-up",

    // Private
    HOTEL = "/hotel",
    NOT_FOUND = "*",
    
  }

  export default RouteEnum