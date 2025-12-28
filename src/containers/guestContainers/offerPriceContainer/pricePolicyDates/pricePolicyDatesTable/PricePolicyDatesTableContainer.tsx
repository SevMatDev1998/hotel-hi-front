import { FC } from "react";
import CommissionDateView from "../../../../../components/shared/CommissionDateView";
import BlockContainer from "../../../../public/BlockContainer";
import { useTranslation } from "../../../../../hooks/useTranslation";
import { HotelAvailabilityDateCommission } from "../../../../../types/hotelAvailabilityDateCommission";
import useModal from "../../../../../hooks/useModal";
import PDFPreviewModal from "../../../../../modals/PDFPreviewModal";

interface HotelAvailability {
  id: string;
  title: string;
  color: string;
  hotelAvailabilityDateCommissions: HotelAvailabilityDateCommission[];
}

interface IPricePolicyDatesTableContainerProps {
  hotelAvailabilityWithDates?: HotelAvailability[];
}

const PricePolicyDatesTableContainer: FC<IPricePolicyDatesTableContainerProps> = ({
  hotelAvailabilityWithDates = [],
}) => {
  const { t } = useTranslation();
  const open = useModal();

  const handleOpenPdfModal = (availabilityId: string, title: string) => {
    open(PDFPreviewModal, { 
      availabilityId, 
      title,
      className: "bg-white max-w-6xl"
    });
  };

  if (!hotelAvailabilityWithDates.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        Нет данных по доступности отеля
      </div>
    );
  }


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
      </div>
      <div className="divide-y divide-gray-100">
        {groupedAvailabilities.map(({ availability, dateCommissions }, index) => {
          return (
            <div
              key={`${availability.id}-${index}`}
              className="grid grid-cols-[1fr_2fr_3fr_50px] items-center px-4 py-3"
            >
              <CommissionDateView dateCommissions={dateCommissions} />
              <div 
                className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => handleOpenPdfModal(availability.id, availability.title)}
              >
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: availability.color }}
                ></span>
                {availability.title}
              </div>
            </div>
          );
        })}
      </div>
    </BlockContainer>
  );
};

export default PricePolicyDatesTableContainer;
