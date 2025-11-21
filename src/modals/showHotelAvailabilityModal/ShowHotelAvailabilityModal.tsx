import { useGetHotelAvailabilityDetailQuery } from "../../services/hotelAvailability/hotelAvailability.service";
import FoodPricesSection from "./FoodPricesSection";
import ServicePricesSection from "./ServicePricesSection";
import AdditionalServicesSection from "./AdditionalServicesSection";
import RoomInfoSection from "./RoomInfoSection";
import AgeAssignmentPricesSection from "./AgeAssignmentPricesSection";
import RoomFoodPricesSection from "./RoomFoodPricesSection";
import MainServicesSection from "./MainServicesSection";
import { useTranslation } from "../../hooks/useTranslation";

interface ISignOutModalProps {
  availabilityId: string;
  onSubmit: () => void
}

const ShowHotelAvailabilityModal: ModalFC<ISignOutModalProps> = ({availabilityId}) => {
  const { t } = useTranslation();
  const { data: availabilityDetail, isLoading } = useGetHotelAvailabilityDetailQuery(
    { availabilityId },
    { skip: !availabilityId }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">{t("common.loading")}</div>
      </div>
    );
  }

  if (!availabilityDetail) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">{t("common.no_data_found")}</div>
      </div>
    );
  }

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
  };
  

  return (
    <div className="flex flex-col p-6 space-y-6 max-h-[80vh] overflow-y-auto">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold mb-2">{availabilityDetail.title}</h2>
        <div className="flex gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">{t("common.created_at")}: </span>
            {formatDate(availabilityDetail.createdAt)}
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex justify-between gap-4">
          <p className=" mb-2">{t("hotel_availability.check_in_time")}</p>
          <div className="">{formatTime(availabilityDetail.checkInTime)}</div>
        </div>
        <div className="flex justify-between gap-4">
          <p className=" mb-2">{t("hotel_availability.check_out_time")}</p>
          <div className="">{formatTime(availabilityDetail.checkoutTime)}</div>
        </div>
      </div>

      {availabilityDetail.hotel?.hotelRooms && availabilityDetail.hotel.hotelRooms.length > 0 && (
        availabilityDetail.hotel.hotelRooms.map((room: any, roomIndex: number) => {
          const roomPriceData = availabilityDetail.hotelRoomPrices?.find(
            (rp: any) => rp.hotelRoomId === room.id
          );
          const roomFoodPrices = availabilityDetail.hotelFoodPrices?.filter(
            (fp: any) => fp.hotelRoomId === room.id
          );
          const roomAdditionalServices = availabilityDetail.hotelAdditionalServices?.filter(
            (as: any) => as.hotelRoomId === room.id
          );

          return (
            <div key={roomIndex} className="border-t-4 border-blue-300 pt-6 space-y-4">
              <h3 className="text-xl font-bold mb-4">{t("rooms.room")} #{roomIndex + 1}</h3>
              
              <RoomInfoSection room={room} />

              {roomPriceData && (
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-base mb-2">{t("price_policy.room_price")}</h4>
                  <div className="text-2xl font-bold text-blue-600">
                    {Number(roomPriceData.price).toFixed(2)}
                  </div>
                </div>
              )}

              {room.hotelAgeAssignmentPrice && room.hotelAgeAssignmentPrice.length > 0 && (
                <AgeAssignmentPricesSection ageAssignmentPrices={room.hotelAgeAssignmentPrice} />
              )}

              {roomFoodPrices && roomFoodPrices.length > 0 && (
                <RoomFoodPricesSection foodPrices={roomFoodPrices} />
              )}

              {roomAdditionalServices && roomAdditionalServices.length > 0 && (
                <AdditionalServicesSection 
                  additionalServices={roomAdditionalServices}
                  formatTime={formatTime}
                />
              )}
            </div>
          );
        })
      )}
      
      <div className="border-t-4 border-gray-300 pt-6 space-y-4">
        <h3 className="text-xl font-bold mb-4">{t("common.general_data")}</h3>

      <MainServicesSection 
        hotelId={availabilityDetail.hotelId}
        availabilityId={Number(availabilityId)}
      />

      <FoodPricesSection 
        foodPrices={availabilityDetail.hotelFoodPrices}
      />

      {availabilityDetail.hotelServicePrices && availabilityDetail.hotelServicePrices.length > 0 && (
        <ServicePricesSection 
          servicePrices={availabilityDetail.hotelServicePrices}
          formatDate={formatDate}
        />
      )}

        {availabilityDetail.hotelAdditionalServices?.some((s: any) => !s.hotelRoomId) && (
          <AdditionalServicesSection 
            additionalServices={availabilityDetail.hotelAdditionalServices.filter((s: any) => !s.hotelRoomId)}
            formatTime={formatTime}
          />
        )}
      </div>
      
    </div>
  );
}

export default ShowHotelAvailabilityModal;