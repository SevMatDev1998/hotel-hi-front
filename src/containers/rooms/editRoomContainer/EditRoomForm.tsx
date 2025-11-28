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
import InputValidationLayout from "../../../layouts/inputValidationLayout/InputValidationLayout";

interface IEditRoomFormProps {
  room: Partial<HotelRoom>,
 roomClassesOptions: {
    value: number;
    label: string;
}[]
  roomViewsOptions: {
    value: number;
    label: string;
}[]
}

const EditRoomForm: FC<IEditRoomFormProps> = ({ room, roomClassesOptions, roomViewsOptions }) => {
  
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [editRoom, { isLoading }] = useEditRoomMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<EditHotelRoomFormData>({
    resolver: yupResolver(EditHotelRoomSchema),
    defaultValues: room 
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
            <InputValidationLayout errors={errors} name="roomClassId" >
              <RegisterSelect
                name="roomClassId"
                options={roomClassesOptions}
                register={register}
                tr_name="room_class_options"
              />
            </InputValidationLayout>
            <div >
              <span >{t("rooms.room_view")} *</span>
            </div>
            <InputValidationLayout errors={errors} name="roomViewId" >
              <RegisterSelect
                name="roomViewId"
                options={roomViewsOptions}
                register={register}
                tr_name="room_view_options"
              />
            </InputValidationLayout>
            <div >
              <span >{t("rooms.room_area_m2")} *</span>
            </div>
            <InputValidationLayout errors={errors} name="area" >
              <RegisterInput
                register={register}
                name="area"
                className='rounded-[5px]'
              />
            </InputValidationLayout>
            <div >
              <span >{t("rooms.room_numbers")} *</span>
            </div>
            <InputValidationLayout errors={errors} name="roomNumberQuantity" >
              <RegisterInput
                register={register}
                name="roomNumberQuantity"
                className='rounded-[5px]'
              />
            </InputValidationLayout>
          </div>
          <div className="flex justify-end">
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