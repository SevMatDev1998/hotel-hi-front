import React, { FC } from "react";
import { Trash2 } from "lucide-react"; // или любой другой icon set, например heroicons
import EditCommissionModal from "../../../../modals/EditCommisionModal";
import useModal from "../../../../hooks/useModal";
import DeleteCommissionModal from "../../../../modals/DeleteCommisionModal";

interface HotelAvailabilityDateCommission {
  id: number;
  date: string;
  roomFee: string;
  foodFee: string;
  additionalFee: string;
  serviceFee: string;
}

interface HotelAvailability {
  id: number;
  title: string;
  color: string;
  hotelAvailabilityDateCommissions: HotelAvailabilityDateCommission[];
}

interface IPricePolicyDatesTableContainerProps {
  hotelAvailabilityWithDates?: HotelAvailability[];
  onDelete?: (id: number) => void;
}

const PricePolicyDatesTableContainer: FC<IPricePolicyDatesTableContainerProps> = ({
  hotelAvailabilityWithDates = [],
  onDelete,
}) => {
  const open = useModal();

  if (!hotelAvailabilityWithDates.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        Нет данных по доступности отеля
      </div>
    );
  }


  
  const handleModalSubmit = async (data: any) => {  
    console.log("Commission Data:", data);
  };

  const handleEditSubmit = async (commission: any, availabilityId: number) => {
    open(EditCommissionModal, { title: "", commission, availabilityId, onSubmit: (data) => handleModalSubmit(data) });
  };


  const handleDeleteSubmit = async (availabilityId: number) => {
    console.log("Delete Commission ID:", availabilityId);
    open(DeleteCommissionModal, { title: "", availabilityId});

  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Заголовки */}
      <div className="grid grid-cols-[1fr_2fr_3fr_50px] bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3">
        <div>📅 День</div>
        <div>🏨 Hotel Availability</div>
        <div>💰 Комиссии</div>
        <div className="text-center">🗑️</div>
      </div>

      {/* Строки */}
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
              className="grid grid-cols-[1fr_2fr_3fr_50px] items-center px-4 py-3 text-sm hover:bg-gray-50 transition"
            >
              {/* 1️⃣ Дата */}
              <div className="text-gray-500">—</div>

              {/* 2️⃣ Название и цвет */}
              <div className="flex items-center gap-2 text-gray-800">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: availability.color }}
                ></span>
                {availability.title}
              </div>

              {/* 3️⃣ Комиссии */}
              <div className="text-gray-700" onClick={()=>{handleEditSubmit(commission,availability.id)}} >
                Նомер: {commission.roomFee} ֏ | Եда: {commission.foodFee} ֏ | Լավել:{" "}
                {commission.additionalFee} ֏ | Սերվիս: {commission.serviceFee} ֏
              </div>

              {/* 4️⃣ Удаление */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleDeleteSubmit(availability.id)}
                  className="text-gray-400 hover:text-red-500 transition"
                  title="Удалить"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricePolicyDatesTableContainer;
