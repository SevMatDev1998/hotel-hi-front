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

      <RoomPricesSection 
        roomPrices={availabilityDetail.hotelRoomPrices}
        currencySymbol={availabilityDetail.hotel.currency.symbol}
      />

      <FoodPricesSection 
        foodPrices={availabilityDetail.hotelFoodPrices}
      />

      <ServicePricesSection 
        servicePrices={availabilityDetail.hotelServicePrices}
        currencySymbol={availabilityDetail.hotel.currency.symbol}
        formatDate={formatDate}
      />

      {/* <AdditionalServicesSection 
        additionalServices={availabilityDetail.hotelAdditionalServices}
        currencySymbol={availabilityDetail.hotel.currency.symbol}
        formatTime={formatTime}
      /> */}
    </div>
  );
}

export default ShowHotelAvailabilityModal;