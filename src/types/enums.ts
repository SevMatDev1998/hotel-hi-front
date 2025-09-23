export enum EmailSentStatus {
  Scheduled = 'Scheduled',
  Delivered = 'Delivered',
  NotDelivered = 'NotDelivered'
}

export enum FoodType {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Supper = 'Supper'
}

export enum LegalEntityType {
  LLC = 'LLC',
  PE = 'PE',
  CJSC = 'CJSC',
  OJSC = 'OJSC',
  NGO = 'NGO'
}

export enum OrderStatus {
  Reserved = 'Reserved',
  Pending = 'Pending',
  Approved = 'Approved',
  Arrived = 'Arrived',
  Completed = 'Completed',
  Canceled = 'Canceled'
}

export enum HotelRoomReservationStatus {
  Reserved = 'Reserved',
  Pending = 'Pending',
  Approved = 'Approved'
}

export enum OrderCheckinType {
  DefinitiveDates = 'DefinitiveDates',
  VariableDates = 'VariableDates'
}

export enum OrderSource {
  Web = 'Web',
  InternalTools = 'InternalTools'
}

export enum PartnerStatus {
  Draft = 'Draft',
  Pending = 'Pending',
  Waiting = 'Waiting',
  Approved = 'Approved'
}

export enum PhoneCodesEnum {
  AM = 'AM',
  USA = 'USA',
  RUS = 'RUS'
}

export enum PriceNotificationStatus {
  Scheduled = 'Scheduled',
  Sent = 'Sent',
  Failed = 'Failed',
  WaitingForPartnerConfirmation = 'WaitingForPartnerConfirmation'
}

export enum HotelRoomStatus {
  Active = 'Active',
  Incomplete = 'Incomplete',
  Inactive = 'Inactive',
  Deleted = 'Deleted'
}

export enum BedType {
  Main = 'Main',
  Cradle = 'Cradle',
  Additional = 'Additional'
}

export enum ServicePayMethod {
  Once = 'Once',
  Hour = 'Hour',
  Day = 'Day'
}

export enum ServiceTypeAvailabilityBy {
  Shared = 'Shared',
  Room = 'Room'
}

export enum CompletenessStatus {
  Draft = 'Draft',
  Completed = 'Completed'
}

export enum HotelServiceHourlyAvailabilityType {
  AllDay = 'AllDay',
  Hours = 'Hours'
}

export enum ServiceOffer {
  PetsAllowed = 'PetsAllowed',
  AccessGuestsNotStayingInRoom = 'AccessGuestsNotStayingInRoom',
  FoodFromOutside = 'FoodFromOutside'
}

export enum ServiceOfferStatus {
  Allowed = 'Allowed',
  Requested = 'Requested',
  NotAllowed = 'NotAllowed'
}

export enum MenuItem {
  Hotel = 'Hotel',
  Room = 'Room',
  Food = 'Food',
  Service = 'Service',
  Price = 'Price',
  Partners = 'Partners',
  Notification = 'Notification'
}
