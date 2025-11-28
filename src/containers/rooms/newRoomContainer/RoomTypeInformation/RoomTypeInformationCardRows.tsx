import { FC, useEffect } from 'react';
import { Button } from '../../../../components/shared/Button';
import { useTranslation } from 'react-i18next';
import { BedType, HotelRoomPartBed, RoomBedSize, RoomBedType } from '../../../../types';
import { Select } from '../../../../components/shared/Select';
import { useGetHotelRoomPartBedsByPartIdQuery, useGetRoomBedSizesQuery, useGetRoomBedTypesQuery } from '../../../../services/rooms';


interface IRoomTypeInformationCardRowsProps {

  roomPartBedsState: Partial<HotelRoomPartBed>[];
  setRoomPartBedsState: Partial<HotelRoomPartBed>[];
  roomPartId?: string;
  hendelAddHotelRoomPartBeds: (bed: Partial<HotelRoomPartBed>) => void;
  roomBedTypes?: RoomBedType[];
  roomBedSizes?: RoomBedSize[];
}

const RoomTypeInformationCardRows: FC<IRoomTypeInformationCardRowsProps> = (
  {
    roomPartBedsState,
    setRoomPartBedsState,
    roomPartId,
    hendelAddHotelRoomPartBeds,
  }
) => {

  const { t } = useTranslation();
  const { data: hotelRoomPartBeds } = useGetHotelRoomPartBedsByPartIdQuery({ roomPartId: roomPartId! }, { skip: !roomPartId });

      const { data: roomBedTypes } = useGetRoomBedTypesQuery();
  const { data: roomBedSizes } = useGetRoomBedSizesQuery();


useEffect(() => {
  if (hotelRoomPartBeds) {
    const bedsWithRowIndex = hotelRoomPartBeds.map(bed => ({
      ...bed,
      rowIndex: bed.rowIndex ?? bed.id ?? Date.now().toString() + Math.random()
    }));
    setRoomPartBedsState(bedsWithRowIndex);
  }
}, [hotelRoomPartBeds, setRoomPartBedsState]);

  const hendleAddBed = (type: string) => {
    const newBed: Partial<HotelRoomPartBed> = {
      rowIndex: Date.now().toString(),
      bedType: type as BedType,
    };

    hendelAddHotelRoomPartBeds(newBed);
  }

  const handleBedTypeChange = (bedId: string, newType: string) => {
    
    const updatedBeds = roomPartBedsState.map(bed => {
      if (bed.rowIndex === bedId) {
        return { ...bed, roomBedTypeId: newType };
      }
      return bed;
    });
    
    setRoomPartBedsState(updatedBeds);
  }

  const handleBedSizeChange = (bedId: string, newSize: string) => {
    const updatedBeds = roomPartBedsState.map(bed => {
      if (bed.rowIndex === bedId) {
        return { ...bed, roomBedSizeId: newSize };
      }
      return bed;
    });
    setRoomPartBedsState(updatedBeds);
  } 

  const hendleBedSizeRowDelete = (bedId: string) => {

    setRoomPartBedsState(prev => prev.filter(bed => bed.rowIndex !== bedId));
  }
  
  return (
    <div >
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => hendleAddBed("Main")}>{t("room_bad.add_base_bed")}</Button>
        <Button variant="outline" onClick={() => hendleAddBed("Additional")}>{t("room_bad.add_additional_bed")}</Button>
      </div>

      <div className='flex flex-col gap-4 mt-4'>
        {
          roomPartBedsState.map((bed) => {
            return (
              <div key={bed.rowIndex} className="grid grid-cols-4 mobile:justify-start gap-4">
                <div className='cursor-pointer' onClick={() => hendleBedSizeRowDelete(bed.rowIndex)}>
                <img src="/images/icons/remove-button-icon.svg" alt="delete icon" className="w-4 h-4" />

                </div>
                <div className='flex gap-3'>
                  <p>{t(`room_bed_types.${bed.bedType}`)}</p>
                </div>
                <Select
                  name={`bed-${bed.id}-type`}
                  options={roomBedTypes?.map(type => ({ value: type.id, label: type.name })) || []}
                  tr_name="room_bed_types_names_options"
                  onSelect={(e)=>{handleBedTypeChange(bed.rowIndex!, e)}}
                  value={bed.roomBedTypeId?.toString()}
                />
                <Select
                  name={`bed-${bed.id}-size`}
                  options={roomBedSizes?.map(size => ({ value: size.id, label: size.size })) || []}
                  tr_name=""
                  onSelect={(e)=>{handleBedSizeChange(bed.rowIndex!, e)}}
                  value={bed.roomBedSizeId?.toString()}
                />
              </div>
            )
          })
        }
      </div>

    </div>
  );
};

export default RoomTypeInformationCardRows;