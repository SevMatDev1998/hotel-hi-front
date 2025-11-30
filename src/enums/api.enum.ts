enum ApiEnum {
    AUTH_LOGIN = "auth/login",
    REGISTER = "auth/register",
    VERIFY_REGISTRATION = "auth/verify-registration",
    RESET_PASSWORD = "auth/reset-password",
    SET_NEW_PASSWORD = "auth/set-new-password",
    NAVIGATION_ACCESS="auth/navigation-access-step",

    GET_ME = "auth/me",
    HOTEL = "hotels",
    COUNTRIES = "countries",
    CURRENCIES = "currencies",
    HOTEL_ROOMS = "hotel-rooms",
    ROOM_VIEWS = "room-views",
    ROOM_CLASSES = "room-classes",
    ROOM_PARTS = "room-parts",
    HOTEL_ROOM_PARTS = "hotel-room-parts",
    HOTEL_ROOM_PART_BEDS = "hotel-room-part-beds",
    ROOM_BED_TYPES = "room-bed-types",
    ROOM_BED_SIZES = "room-bed-sizes",

    HOTEL_FOODS = "hotel-foods",
    FOOD_OFFER_TYPES = "food-offer-types",
    CUISNESSE = "cuisines",

    HOTEL_SERVICES = "hotel-services",
    SYSTEM_SERVICE_GROUPS = "system-service-groups",
    SYSTEM_SERVICE_TYPES = "system-service-types",
    SYSTEM_SERVICES = "system-services",
    HOTEL_SERVICE_AVAILABILITY="hotel-service-availability",
    HOTEL_SERVICE_PRICES="hotel-service-prices",
    NOTIFICATIONS="notifications",
    HOTEL_AVAILABILITY="hotel-availability",
    HOTEL_AGE_ASSIGNMENTS="hotel-age-assignments",

    HOTEL_AVAILABILITY_DATE_COMMISSIONS="hotel-availability-date-commissions",
    
    HOTEL_PARTNERS="hotel-partners",
    
    PRICE_POLICY="price-policy",


    //guest
    GUESTS="guests"

}

export default ApiEnum
