import { useEffect, useState } from "react";
import PricePolicyDatesCalendar from "./PricePolicyDatesCalendar";
import { 
  useUpdateHotelAvailabilitesWithDatesMutation,
  useDeleteHotelAvailabilityDateMutation,
  useDeleteHotelAvailabilityDatesBatchMutation
} from "../../../../services/hotelAvailability/hotelAvailability.service";
import BlockContainer from "../../../public/BlockContainer";
import { Button } from "../../../../components/shared/Button";
import { useTranslation } from "../../../../hooks/useTranslation";
import { Select } from "../../../../components/shared/Select";
import AddCommissionModal from "../../../../modals/AddCommisionModal";
import useModal from "../../../../hooks/useModal";

interface IAvailabilityDate {
  id: string;
  date: string | Date;
  calendarId: string;
}

interface IAvailability {
  id: number;
  color: string;
  title?: string;
  checkInTime?: string | Date;
  checkoutTime?: string | Date;
  confirmed?: boolean;
  hotelAvailabilityDateCommissions: IAvailabilityDate[];
}

interface ISelectedAvailability {
  id: number;
  color: string;
}

interface IPricePolicyDatesCalendarContainerProps {
  hotelAvailabilityWithDates?: IAvailability[];
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

  const [availabilities, setAvailabilities] = useState<IAvailability[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<ISelectedAvailability | null>(null);
  const [modifiedAvailability, setModifiedAvailability] = useState<IAvailability | null>(null);
  const [updateHotelAvailabilitesWithDates] = useUpdateHotelAvailabilitesWithDatesMutation();
  const [deleteHotelAvailabilityDate] = useDeleteHotelAvailabilityDateMutation();
  const [deleteHotelAvailabilityDatesBatch] = useDeleteHotelAvailabilityDatesBatchMutation();


  const handleCalendarChange = (updatedData: IAvailability[]) => {
    setAvailabilities(updatedData);
    
    // Сохраняем измененный availability (тот который был активен)
    if (selectedAvailability?.id) {
      const modified = updatedData.find((a) => a.id === selectedAvailability.id);
      if (modified) {
        setModifiedAvailability(modified);
      }
    }
  };


  
const handleModalSubmit = async (commissionDate: any) => {
    // Проверяем что есть измененный availability
    if (!modifiedAvailability) {
      console.error('No modified availability to save');
      return;
    }

    const payload = {
      availability: modifiedAvailability,  // ТОЛЬКО измененный availability
      commissionDate,  // объект комиссий
    };

    // Отправляем запрос
    await updateHotelAvailabilitesWithDates({
      hotelId,
      body: payload,
    });
};


  const handleSubmit = async () => {
    open(AddCommissionModal, { title: "", onSubmit: (data) => handleModalSubmit(data) });
  };

  // 🗑️ Обработчики удаления
  const handleDeleteDate = async (calendarId: string) => {
    try {
      await deleteHotelAvailabilityDate({ calendarId }).unwrap();
      console.log(`Date ${calendarId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting date:', error);
    }
  };

  const handleDeleteMonth = async (monthIndex: number) => {
    // Собираем все calendarId для месяца
    const monthDates: string[] = [];
    availabilities.forEach(a => {
      a.hotelAvailabilityDateCommissions.forEach(d => {
        const match = d.calendarId.match(/^m(\d+)-d\d+$/);
        if (match && parseInt(match[1]) === monthIndex + 1) {
          monthDates.push(d.calendarId);
        }
      });
    });

    // Удаляем все даты ОДНИМ запросом
    if (monthDates.length > 0) {
      try {
        const result = await deleteHotelAvailabilityDatesBatch({ calendarIds: monthDates }).unwrap();
        console.log(`Month ${monthIndex + 1}: ${result.message}`);
      } catch (error) {
        console.error('Error deleting month dates:', error);
      }
    }
  };

  const handleDeleteWeekday = async (weekdayIndex: number) => {
    // Собираем все calendarId для дня недели
    const weekdayDates: string[] = [];
    availabilities.forEach(a => {
      a.hotelAvailabilityDateCommissions.forEach(d => {
        const date = new Date(d.date);
        if (date.getDay() === weekdayIndex) {
          weekdayDates.push(d.calendarId);
        }
      });
    });

    // Удаляем все даты ОДНИМ запросом
    if (weekdayDates.length > 0) {
      try {
        const result = await deleteHotelAvailabilityDatesBatch({ calendarIds: weekdayDates }).unwrap();
        console.log(`Weekday ${weekdayIndex}: ${result.message}`);
      } catch (error) {
        console.error('Error deleting weekday dates:', error);
      }
    }
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
            const found = hotelAvailabilityWithDates?.find((a) => a.id === id);
            if (found) {
              setSelectedAvailability({
                id: found.id,
                color: found.color,
              });
            }
          }}
          value={selectedAvailability?.id || ""}
        />
        <Button onClick={handleSubmit}>
          {t("buttons.save")}
        </Button>

      </div>


      <PricePolicyDatesCalendar
        year={2025}
        initialSelectedDays={availabilities}
        activeAvailability={selectedAvailability || undefined}
        onChange={handleCalendarChange}
        onDeleteDate={handleDeleteDate}
        onDeleteMonth={handleDeleteMonth}
        onDeleteWeekday={handleDeleteWeekday}
      />

    </BlockContainer>
  );
};

export default PricePolicyDatesCalendarContainer;
