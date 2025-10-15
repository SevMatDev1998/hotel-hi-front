import { FC } from 'react';
import { Button } from '../../../../components/shared/Button';
import { useTranslation } from 'react-i18next';
import { BedType, HotelRoomPartBed, RoomBedSize, RoomBedType } from '../../../../types';
import { Select } from '../../../../components/shared/Select';

interface IRoomTypeInformationCardRowsProps {
  hotelRoomPartBeds: HotelRoomPartBed[];
  hendelAddHotelRoomPartBeds: (bed: HotelRoomPartBed) => void;
  roomBedTypes: RoomBedType[];
  roomBedSizes: RoomBedSize[];
}


const RoomTypeInformationCardRows: FC<IRoomTypeInformationCardRowsProps> = (

  { hotelRoomPartBeds, hendelAddHotelRoomPartBeds, roomBedTypes, roomBedSizes }) => {

  const { t } = useTranslation();


  const hendleAddBed = (type: string) => {
    const newBed: HotelRoomPartBed = {
      id: Date.now(),
      bedType: type as BedType,
      // quantity: 1,
    };

    hendelAddHotelRoomPartBeds(newBed);
  }
  console.log(333, hotelRoomPartBeds);

  return (
    <div >
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => hendleAddBed("Main")}>{t("room_bad.add_base_bed")}</Button>
        <Button variant="outline" onClick={() => hendleAddBed("Additional")}>{t("room_bad.add_additional_bed")}</Button>
      </div>

      <div className='flex flex-col gap-4 mt-4'>
        {
          hotelRoomPartBeds?.length > 0 && hotelRoomPartBeds.map((bed) => {
            return (
              <div key={bed.id} className="flex  items-center justify-between mobile:justify-start gap-4">
                <div className='flex gap-3'>
                  <p>{t(`room_bed_types.${bed.bedType}`)}</p>
                  <p>{bed.quantity}</p>
                </div>

                <Select
                  name={`bed-${bed.id}-size`}
                  options={roomBedTypes.map(type => ({ value: type.id, label: type.name }))}
                  tr_name="room_bed_types_names"
                />
                <Select
                  name={`bed-${bed.id}-size`}
                  options={roomBedSizes.map(size => ({ value: size.id, label: size.size }))}
                  tr_name=""
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