import { FC } from "react";
import { Trash2 } from "lucide-react";
import EditCommissionModal from "../../../../modals/EditCommisionModal";
import useModal from "../../../../hooks/useModal";
import DeleteCommissionModal from "../../../../modals/DeleteCommisionModal";
import BlockContainer from "../../../public/BlockContainer";
import { useTranslation } from "../../../../hooks/useTranslation";

interface HotelAvailabilityDateCommission {
  id: string;
  date: string;
  roomFee: string;
  foodFee: string;
  additionalFee: string;
  serviceFee: string;
}

interface HotelAvailability {
  id: string;
  title: string;
  color: string;
  hotelAvailabilityDateCommissions: HotelAvailabilityDateCommission[];
}

interface IPricePolicyDatesTableContainerProps {
  hotelAvailabilityWithDates?: HotelAvailability[];
  // onDelete?: (id: number) => void;
}

const PricePolicyDatesTableContainer: FC<IPricePolicyDatesTableContainerProps> = ({
  hotelAvailabilityWithDates = [],
  // onDelete,
}) => {
  const open = useModal();
  const { t } = useTranslation()

  if (!hotelAvailabilityWithDates.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        Нет данных по доступности отеля
      </div>
    );
  }


  const handleEditSubmit = async (commission: any, availabilityId: string) => {
    open(EditCommissionModal, { commission, availabilityId });
  };


  const handleDeleteSubmit = async (availabilityId: string) => {
    open(DeleteCommissionModal, { availabilityId });

  };

  console.log(hotelAvailabilityWithDates);

  return (
    <BlockContainer shadow={false} >
      <div className="grid grid-cols-[1fr_2fr_3fr_50px] ">
        <h3>{t("price_policy_dates.price_offer")}</h3>
        <h3>{t("price_policy_dates.period")}</h3>
        <h3>{t("price_policy_dates.commission")}</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {hotelAvailabilityWithDates.map((availability) => {
          const commission =
            availability.hotelAvailabilityDateCommissions[0] || {
              roomFee: 0,
              foodFee: 0,
              additionalFee: 0,
              serviceFee: 0,
            };

          if (!availability.hotelAvailabilityDateCommissions[0]) return

          return (
            <div
              key={availability.id}
              className="grid grid-cols-[1fr_2fr_3fr_50px] items-center px-4 py-3"
            >
              <div >

                {availability.hotelAvailabilityDateCommissions.map((dateCommission) => (
                  <div key={dateCommission.id}>{dateCommission.date}</div>
                ))}

              </div>

              <div className="flex items-center gap-2 ">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: availability.color }}
                ></span>
                {availability.title}
              </div>

              <div onClick={() => { handleEditSubmit(commission, availability.id) }} >
                <p className="text-12">
                  {t("price_policy_dates.room")} - {commission.roomFee}&nbsp;
                  {t("price_policy_dates.food")} - {commission.foodFee}&nbsp;
                  {t("price_policy_dates.additional")} - {commission.additionalFee}&nbsp;
                  {t("price_policy_dates.other")} - {commission.serviceFee}
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => handleDeleteSubmit(availability.id)}
                  className=" hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </BlockContainer>
  );
};

export default PricePolicyDatesTableContainer;
