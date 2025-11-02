import React, { useEffect, useState } from "react";
import PricePolicyDatesCalendar from "./PricePolicyDatesCalendar";
import { useUpdateHotelAvailabilitesWithDatesMutation } from "../../../services/hotelAvailability/hotelAvailability.service";
import BlockContainer from "../../public/BlockContainer";
import { Button } from "../../../components/shared/Button";
import { useTranslation } from "../../../hooks/useTranslation";
import { Select } from "../../../components/shared/Select";
import AddCommissionModal from "../../../modals/AddCommisionModal";
import useModal from "../../../hooks/useModal";

interface IPricePolicyDatesCalendarContainerProps {
  hotelAvailabilityWithDates?: any;
  hotelId: string;
}


const PricePolicyDatesCalendarContainer = ({ hotelAvailabilityWithDates, hotelId }: IPricePolicyDatesCalendarContainerProps) => {

  const { t } = useTranslation();
  const open = useModal();

  useEffect(() => {
    if (hotelAvailabilityWithDates) {
      setAvailabilities(hotelAvailabilityWithDates);
    }
  }, [hotelAvailabilityWithDates]);

  const [availabilities, setAvailabilities] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState({});
  const [updateHotelAvailabilitesWithDates] = useUpdateHotelAvailabilitesWithDatesMutation();


  const handleCalendarChange = (updatedData: any[]) => {
    setAvailabilities(updatedData);
  };


  
const handleModalSubmit = async (commissionDate: any) => {
  console.log("Commission Data:", commissionDate);

    const payload = {
      availabilities,  // список всех availability
      commissionDate,  // объект комиссий
    };

    // 2️⃣ Отправляем запрос
    await updateHotelAvailabilitesWithDates({
      hotelId,
      body: payload,
    });
  // You can also refresh UI or close modal here
};


  const handleSubmit = async () => {
    open(AddCommissionModal, { title: "", onSubmit: (data) => handleModalSubmit(data) });
  };

  return (
    <BlockContainer  >
      <div className="flex justify-end gap-4 mb-4">
     
        <Select
          name="hotelAvailability"
          options={
            hotelAvailabilityWithDates?.map((a) => ({
              value: a.id,
              label: `ID ${a.id} (${a.color})`,
            })) || []
          }
          onSelect={(value) => {
            const id = Number(value);
            const found = hotelAvailabilityWithDates.find((a) => a.id === id);
            if (found) {
              setSelectedAvailability({
                id: found.id,
                color: found.color,
              });
            }
          }}
          value={selectedAvailability.id}
        />
        <Button onClick={handleSubmit}>
          {t("buttons.save")}
        </Button>

      </div>


      <PricePolicyDatesCalendar
        year={2025}
        initialSelectedDays={availabilities}
        activeAvailability={selectedAvailability}
        onChange={handleCalendarChange}
      />

    </BlockContainer>
  );
};

export default PricePolicyDatesCalendarContainer;
