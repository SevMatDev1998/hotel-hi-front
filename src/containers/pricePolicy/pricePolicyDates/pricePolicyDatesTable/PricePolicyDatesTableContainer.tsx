import { FC } from "react";
import { Trash2 } from "lucide-react";
import CommissionDateView from "../../../../components/shared/CommissionDateView";
import DeleteCommissionModal from "../../../../modals/DeleteCommisionModal";
import EditCommissionModal from "../../../../modals/EditCommisionModal";
import BlockContainer from "../../../public/BlockContainer";
import useModal from "../../../../hooks/useModal";
import { useTranslation } from "../../../../hooks/useTranslation";
import { HotelAvailabilityDateCommission } from "../../../../types/hotelAvailabilityDateCommission";
import { useUpdateHotelAvailabilityDateCommissionsMutation } from "../../../../services/hotelAvailability/hotelAvailability.service";



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

    const [updateHotelAvailabilityDateCommissions] = useUpdateHotelAvailabilityDateCommissionsMutation();
  
  if (!hotelAvailabilityWithDates.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        Нет данных по доступности отеля
      </div>
    );
  }


  const handleEditSubmit = async (commission: any, availabilityId: string) => {
    open(EditCommissionModal, { commission, availabilityId,updateHotelAvailabilityDateCommissions });
  };


  const handleDeleteSubmit = async (availabilityId: string) => {
    open(DeleteCommissionModal, { availabilityId, className:"bg-white" });

  };


  // Группируем комиссии по одинаковым значениям fee
  const groupedAvailabilities = hotelAvailabilityWithDates.flatMap((availability) => {
    if (!availability.hotelAvailabilityDateCommissions.length) return [];

    // Группируем даты по одинаковым комиссиям
    const commissionGroups = new Map<string, HotelAvailabilityDateCommission[]>();

    availability.hotelAvailabilityDateCommissions.forEach((dateCommission) => {
      const key = `${dateCommission.roomFee}-${dateCommission.foodFee}-${dateCommission.additionalFee}-${dateCommission.serviceFee}`;
      
      if (!commissionGroups.has(key)) {
        commissionGroups.set(key, []);
      }
      commissionGroups.get(key)!.push(dateCommission);
    });

    // Создаем отдельную строку для каждой группы комиссий
    return Array.from(commissionGroups.values()).map((dateCommissions) => ({
      availability,
      dateCommissions,
      commission: {
        roomFee: dateCommissions[0].roomFee,
        foodFee: dateCommissions[0].foodFee,
        additionalFee: dateCommissions[0].additionalFee,
        serviceFee: dateCommissions[0].serviceFee,
      }
    }));
  });

  return (
    <BlockContainer shadow={false} >
      <div className="grid grid-cols-[1fr_2fr_3fr_50px] ">
        <h3>{t("price_policy_dates.price_offer")}</h3>
        <h3>{t("price_policy_dates.period")}</h3>
        <h3>{t("price_policy_dates.commission")}</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {groupedAvailabilities.map(({ availability, dateCommissions, commission }, index) => {
          return (
            <div
              key={`${availability.id}-${index}`}
              className="grid grid-cols-[1fr_2fr_3fr_50px] items-center px-4 py-3"
            >
              <CommissionDateView dateCommissions={dateCommissions} />
              <div className="flex items-center gap-2 ">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: availability.color }}
                ></span>
                {availability.title}
              </div>
              <div className="cursor-pointer"  onClick={() => { handleEditSubmit(commission, availability.id) }} >
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
