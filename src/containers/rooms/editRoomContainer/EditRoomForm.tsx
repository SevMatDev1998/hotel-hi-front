import BlockContainer from '../../public/BlockContainer';
import InfoBlock from '../../../components/shared/InfoBlock';
import { RegisterSelect } from '../../../components/shared/RegisterSelect';
import RegisterInput from '../../../components/shared/RegisterInput';
import { Button } from '../../../components/shared/Button';
import { EditHotelRoomFormData, EditHotelRoomSchema } from '../../../yupValidation/RoomValidation';
import { useEditRoomMutation } from '../../../services/rooms';
import { useTranslation } from '../../../hooks/useTranslation';
import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { HotelRoom } from '../../../types';
import { useNavigate } from 'react-router-dom';
import RouteEnum from '../../../enums/route.enum';

interface IEditRoomFormProps {
  room: HotelRoom,
  roomClassesOptions:Record<string, any>[],
  roomViewsOptions:Record<string, any>[]
}

const EditRoomForm: FC<IEditRoomFormProps> = ({ room, roomClassesOptions, roomViewsOptions }) => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [editRoom, { isLoading }] = useEditRoomMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<EditHotelRoomFormData>({
    resolver: yupResolver(EditHotelRoomSchema),
    defaultValues: room ?? {}
  });


  const onSubmit = async (data: EditHotelRoomFormData) => {
    await editRoom({ roomId: room.id!, data }).unwrap();
    navigate(`${RouteEnum.ROOMS}/${room.id}`);
  };

  return (
    <BlockContainer>
      <div className="flex flex-col gap-6">
        <h2>{t("rooms.room_type_description")}</h2>
        <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("rooms.room_type")} *</span>
            </div>
            <div >
              <RegisterSelect
                name="roomClassId"
                options={roomClassesOptions}
                register={register}
                // error={errors.courseId}
                required
                tr_name="room_class_options"
              />
            </div>
            <div >
              <span >{t("rooms.room_view")} *</span>
            </div>
            <div >
              <RegisterSelect
                name="roomViewId"
                options={roomViewsOptions}
                register={register}
                // error={errors.courseId}
                required
                tr_name="room_view_options"
              />
            </div>
            <div >
              <span >{t("rooms.room_area_m2")} *</span>
            </div>
            <div >
              <RegisterInput
                register={register}
                errors={errors}
                name="area"
                className='rounded-[5px]'
              />
            </div>
            <div >
              <span >{t("rooms.room_numbers")} *</span>
            </div>
            <div >
              <RegisterInput
                register={register}
                errors={errors}
                name="roomNumberQuantity"
                className='rounded-[5px]'
              />
            </div>
          </div>
          <div>
            <Button type="submit" disabled={isLoading} className="mt-6">
              {t("buttons.save")}
            </Button>
          </div>
        </form>
      </div>
    </BlockContainer>
  );
};

export default EditRoomForm;