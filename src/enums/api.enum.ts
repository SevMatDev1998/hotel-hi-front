enum ApiEnum {
    AUTH_LOGIN = "auth/login",
    REGISTER = "auth/register",
    SEND_CONFIRAMTION_TO_EMAIL = "auth/send-confirmation-to-email",
    VERIFY_EMAIL = "auth/verify-email",
    SET_NEW_PASSWORD = "auth/set-new-password",
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
}

export default ApiEnum
