import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import InfoBlock from '../../../components/shared/InfoBlock';
import BlockContainer from '../../public/BlockContainer';
import RoomTypeInformation from '../newRoomContainer/RoomTypeInformation/RoomTypeInformation';
import { useGetHotelRoomByRoomIdQuery } from '../../../services/rooms';

const RoomContainer = () => {
  const { roomId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: room, isLoading, isError } = useGetHotelRoomByRoomIdQuery({ roomId: roomId! }, { refetchOnMountOrArgChange: !!roomId })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading room</div>

  return (
    <div className="flex flex-col gap-6">
      <h2>{t("rooms.rooms_types")}</h2>
      <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />

      <BlockContainer shadow={false}>
        <div className='flex flex-col gap-6'>

          <div className='flex justify-between'>
            <h3>{t("rooms.room_type_description")}</h3>
            <div onClick={() => navigate(`/rooms/${room?.id}/edit`)}>
              <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
            </div>
          </div>

          <div className='grid grid-cols-2 mobile:grid-cols-1 text-16 gap-4'>
            <p>{t(`room_class_options.${room?.roomClass.name}`)},{t(`room_view_options.${room?.roomView.name}`)}- {room?.area} {t("rooms.area_unit")}</p>
            <p className='text-end mobile:text-start'>{room?.roomNumberQuantity}&nbsp;{t("rooms.room")}</p>
          </div>
          <p className='text-11'>Համատեղում է հյուրանոցի հարմարավետությունը ճամբարային փորձի հետ: Շքեղ վրաններ՝ համապատասխան անկողնային պարագաներով և հարմարություններով։ Հաճախ տեղակայված է գեղատեսիլ բացօթյա պարամետրերում:</p>
        </div>
      </BlockContainer>
      <RoomTypeInformation roomId={roomId} />
    </div>
  );
};

export default RoomContainer;