export enum RouteEnum {
    // Public
    LOGIN = "/login",
    RESET_PASSWORD = "/reset-password",
    NEW_PASSWORD = "/new-password/:token",
    CHECK_EMAIL_VERIFICATION = "/check-email-verification/:token",
    SIGN_UP = "/sign-up",

    // Private
    HOTEL = "/hotel",
    ROOMS = "/rooms",
    FOODS = "/foods",
    HOTEL_SERVICES = "/hotel-services",
    PRICE_POLICY="/price-policy",

    SYSTEM_SERVICE_GROUPS = "/system-service-groups",
    NOT_FOUND = "*",
    
  }

  export default RouteEnum