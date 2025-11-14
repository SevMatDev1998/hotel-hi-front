import { useGetHotelAvailabilityDetailQuery } from "../../services/hotelAvailability/hotelAvailability.service";
import RoomPricesSection from "./RoomPricesSection";
import FoodPricesSection from "./FoodPricesSection";
import ServicePricesSection from "./ServicePricesSection";
import AdditionalServicesSection from "./AdditionalServicesSection";

interface ISignOutModalProps {
  availabilityId: string;
  onSubmit: () => void
}

const ShowHotelAvailabilityModal: ModalFC<ISignOutModalProps> = ({availabilityId, onCancel }) => {
  const { data: availabilityDetail, isLoading } = useGetHotelAvailabilityDetailQuery(
    { availabilityId },
    { skip: !availabilityId }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  if (!availabilityDetail) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Данные не найдены</div>
      </div>
    );
  }

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  console.log(444,availabilityDetail);
  

  return (
    <div className="flex flex-col p-6 space-y-6 max-h-[80vh] overflow-y-auto">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold mb-2">{availabilityDetail.title}</h2>
        <div className="flex gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Дата создания: </span>
            {formatDate(availabilityDetail.createdAt)}
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex justify-between gap-4">
          <p className=" mb-2">Время заезда</p>
          <div className="">{formatTime(availabilityDetail.checkInTime)}</div>
        </div>
        <div className="flex justify-between gap-4">
          <p className=" mb-2">Время выезда</p>
          <div className="">{formatTime(availabilityDetail.checkoutTime)}</div>
        </div>
      </div>

      {/* Данные по каждой комнате */}
      {roomsData.map((roomData: any, index: number) => (
        <RoomDataSection 
          key={index}
          roomData={roomData}
          formatTime={formatTime}
      />
      ))}

      {/* Общие данные (не привязанные к комнатам) */}
      <div className="border-t-4 border-gray-300 pt-6 space-y-4">
        <h3 className="text-xl font-bold mb-4">Общие данные</h3>

      <FoodPricesSection 
        foodPrices={availabilityDetail.hotelFoodPrices}
      />

      <ServicePricesSection 
        servicePrices={availabilityDetail.hotelServicePrices}
        formatDate={formatDate}
      />

        {/* Общие дополнительные услуги (без привязки к комнате) */}
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