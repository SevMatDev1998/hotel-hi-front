import { useEffect, useState } from "react";
import { Button } from "../../../../components/shared/Button";
import AddCommissionModal from "../../../../modals/AddCommisionModal";
import BlockContainer from "../../../public/BlockContainer";
import PricePolicyDatesCalendar from "./PricePolicyDatesCalendar";
import useModal from "../../../../hooks/useModal";
import { useTranslation } from "../../../../hooks/useTranslation";
import {
  useDeleteHotelAvailabilityDateMutation,
  useDeleteHotelAvailabilityDatesBatchMutation,
  useUpdateHotelAvailabilitesWithDatesMutation
} from "../../../../services/hotelAvailability/hotelAvailability.service";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [updateHotelAvailabilitesWithDates] = useUpdateHotelAvailabilitesWithDatesMutation();
  const [deleteHotelAvailabilityDate] = useDeleteHotelAvailabilityDateMutation();
  const [deleteHotelAvailabilityDatesBatch] = useDeleteHotelAvailabilityDatesBatchMutation();

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);


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
    if (!modifiedAvailability) {
      console.error('No modified availability to save');
      return;
    }

    const payload = {
      availability: modifiedAvailability,
      commissionDate,
    };

    await updateHotelAvailabilitesWithDates({
      hotelId,
      body: payload,
    }).unwrap();
    setSelectedAvailability(null);
  };


  const handleSubmit = async () => {
    open(AddCommissionModal, { title: "", onSubmit: (data) => handleModalSubmit(data), className: "max-w-[90%] w-full" });
  };

  const handleDeleteDate = async (calendarId: string) => {
    try {
      await deleteHotelAvailabilityDate({ calendarId }).unwrap();
      console.log(`Date ${calendarId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting date:', error);
    }
  };

  const handleDeleteMonth = async (monthIndex: number) => {
    const monthDates: string[] = [];
    availabilities.forEach(a => {
      a.hotelAvailabilityDateCommissions.forEach(d => {
        const match = d.calendarId.match(/^m(\d+)-d\d+$/);
        if (match && parseInt(match[1]) === monthIndex + 1) {
          monthDates.push(d.calendarId);
        }
      });
    });

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
    const weekdayDates: string[] = [];
    availabilities.forEach(a => {
      a.hotelAvailabilityDateCommissions.forEach(d => {
        const date = new Date(d.date);
        if (date.getDay() === weekdayIndex) {
          weekdayDates.push(d.calendarId);
        }
      });
    });

    if (weekdayDates.length > 0) {
      try {
        const result = await deleteHotelAvailabilityDatesBatch({ calendarIds: weekdayDates }).unwrap();
        console.log(`Weekday ${weekdayIndex}: ${result.message}`);
      } catch (error) {
        console.error('Error deleting weekday dates:', error);
      }
    }
  };

  const isSaveDisabled = () => {
    if (!selectedAvailability || !modifiedAvailability) {
      return true;
    }

    const originalAvailability = hotelAvailabilityWithDates?.find((a) => a.id === selectedAvailability.id);
    if (!originalAvailability) {
      return true;
    }

    const originalDateIds = new Set(
      originalAvailability.hotelAvailabilityDateCommissions.map((d) => d.calendarId)
    );
    const modifiedDateIds = new Set(
      modifiedAvailability.hotelAvailabilityDateCommissions.map((d) => d.calendarId)
    );

    if (originalDateIds.size !== modifiedDateIds.size) {
      return false;
    }

    for (const id of modifiedDateIds) {
      if (!originalDateIds.has(id)) {
        return false;
      }
    }

    return true;
  };

  return (
    <BlockContainer  >
      <div className="flex justify-end gap-4 mb-4">
        <div className="flex items-center gap-2 relative">
          <div
            className="appearance-none px-3 py-2 border border-charcoal-gray text-charcoal-gray focus:outline-none bg-white cursor-pointer min-w-[120px] flex items-center justify-center"
            onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
          >
            <span>{selectedYear}</span>
          </div>

          {isYearDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-charcoal-gray shadow-lg z-10 max-h-60 overflow-y-auto">
              {years.map((year) => (
                <div
                  key={year}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-center"
                  onClick={() => {
                    setSelectedYear(year);
                    setIsYearDropdownOpen(false);
                  }}
                >
                  <span>{year}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 relative">
          <div
            className="appearance-none px-3 py-2 border border-charcoal-gray text-charcoal-gray focus:outline-none bg-white cursor-pointer min-w-[200px] flex items-center gap-2"
            onClick={() => {
              if (isSaveDisabled()) {
                setIsDropdownOpen(!isDropdownOpen)
              }
            }
            }
          >
            {selectedAvailability ? (
              <>
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: hotelAvailabilityWithDates?.find((a) => a.id === selectedAvailability.id)?.color }}
                />
                <span>{hotelAvailabilityWithDates?.find((a) => a.id === selectedAvailability.id)?.title}</span>
              </>
            ) : (
              <span>Select availability</span>
            )}
          </div>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-charcoal-gray shadow-lg z-10 max-h-60 overflow-y-auto">
              {hotelAvailabilityWithDates?.map((a) => (
                <div
                  key={a.id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    setSelectedAvailability({
                      id: a.id,
                      color: a.color,
                    });
                    setIsDropdownOpen(false);
                  }}
                >
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: a.color }}
                  />
                  <span>{a.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <Button onClick={handleSubmit} disabled={isSaveDisabled()}>
          {t("buttons.save")}
        </Button>
      </div>
      <PricePolicyDatesCalendar
        year={selectedYear}
        initialSelectedDays={availabilities.map(a => ({
          ...a,
          hotelAvailabilityDateCommissions: a.hotelAvailabilityDateCommissions.filter(d => {
            const dateYear = new Date(d.date).getFullYear();
            return dateYear === selectedYear;
          })
        }))}
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
