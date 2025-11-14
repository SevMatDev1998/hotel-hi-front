import { useTranslation } from "../../hooks/useTranslation";

interface RoomPrice {
  hotelRoom: {
    name: string;
    roomClass: { name: string };
    roomView: { name: string } | null;
    mainGuestQuantity: number;
    additionalGuestQuantity: number;
    area: string;
  };
  price: number;
  dateFrom: string;
  dateTo: string;
}

interface RoomPricesSectionProps {
  roomPrices: RoomPrice[];
  currencySymbol: string;
}

const RoomPricesSection = ({ roomPrices, currencySymbol }: RoomPricesSectionProps) => {
  const { t } = useTranslation();

  if (!roomPrices || roomPrices.length === 0) return null;

  const calculateTotalGuests = (mainGuests: number, additionalGuests: number) => {
    return mainGuests + additionalGuests;
  };

  return (
    <div className=" p-4">
      <h3 className="font-semibold text-lg mb-3">{t("rooms.rooms")}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-center py-2 px-4">{t("rooms.room_class")}</th>
              <th className="text-center py-2 px-4">{t("rooms.total_guests")}</th>
              <th className="text-center py-2 px-4">{t("rooms.main_guests")}</th>
              <th className="text-center py-2 px-4">{t("rooms.additional_guests")}</th>
              <th className="text-right py-2 px-4">{t("rooms.price")}</th>
            </tr>
          </thead>
          <tbody>
            {roomPrices.map((roomPrice, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">

                <td className="py-3 px-4 text-center">
                  <div>{t(`room_class_options.${roomPrice.hotelRoom.roomClass.name}`)}</div>
                  {roomPrice.hotelRoom.roomView && (
                    <div className="text-sm text-gray-500">
                      {t(`room_view_options.${roomPrice.hotelRoom.roomView.name}`)}
                    </div>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  {calculateTotalGuests(
                    roomPrice.hotelRoom.mainGuestQuantity,
                    roomPrice.hotelRoom.additionalGuestQuantity
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  {roomPrice.hotelRoom.mainGuestQuantity}
                </td>
                <td className="py-3 px-4 text-center">
                  {roomPrice.hotelRoom.additionalGuestQuantity}
                </td>
                <td className="py-3 px-4 text-right">
                  <div >
                    {Number(roomPrice.price).toFixed(2)} {currencySymbol}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomPricesSection;
