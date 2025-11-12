export enum RouteEnum {
  // Public
  LOGIN = "/login",
  RESET_PASSWORD = "/reset-password",
  NEW_PASSWORD = "/new-password/:token",
  CHECK_EMAIL_VERIFICATION = "/check-email-verification/:token",
  SIGN_UP = "/sign-up",
  VERIFY = "/verify",

  // Private
  HOTEL = "/hotel",
  ROOMS = "/rooms",
  ROOMS_CREATE = "/rooms/create",
  FOODS = "/foods",
  HOTEL_SERVICES = "/hotel-services",
  PRICE_POLICY = "/price-policy",
  PRICE_POLICY_DATES = "/price-policy-dates",
  PRICE_POLICY_CREATE = "/price-policy/create",

  HOTEL_PARTNERS = "/hotel-partners",
  HOTEL_PARTNERS_CREATE = "/hotel-partners/create",
  HOTEL_PARTNER = "/hotel-partners/:partnerId",
  EDIT_HOTEL_PARTNER = "/hotel-partners/:partnerId/edit",

  
  NOTIFICATIONS = "/notifications",

  SYSTEM_SERVICE_GROUPS = "/system-service-groups",

  //
  GUEST_ACCEPT_PARTNER = "/guest/accept-partner/:partnerId",


  NOT_FOUND = "*",
}

export default RouteEnum