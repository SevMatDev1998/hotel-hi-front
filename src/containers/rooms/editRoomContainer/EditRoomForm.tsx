import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/shared/Button';
import InfoBlock from '../../../components/shared/InfoBlock';
import RegisterInput from '../../../components/shared/RegisterInput';
import { RegisterSelect } from '../../../components/shared/RegisterSelect';
import BlockContainer from '../../public/BlockContainer';
import InputValidationLayout from "../../../layouts/inputValidationLayout/InputValidationLayout";
import { useTranslation } from '../../../hooks/useTranslation';
import { useEditRoomMutation } from '../../../services/rooms';
import { EditHotelRoomFormData, EditHotelRoomSchema } from '../../../yupValidation/RoomValidation';
import RouteEnum from '../../../enums/route.enum';
import { HotelRoom } from '../../../types';

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
  roomClassesData?: Array<{ id: number; name: string; }>
}

const EditRoomForm: FC<IEditRoomFormProps> = ({ room, roomClassesOptions, roomViewsOptions, roomClassesData }) => {
  
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [editRoom, { isLoading }] = useEditRoomMutation()

  const { register, handleSubmit, formState: { errors }, watch } = useForm<EditHotelRoomFormData>({
    resolver: yupResolver(EditHotelRoomSchema),
    defaultValues: room 
  });

  const selectedRoomClassId = watch("roomClassId"); 


  const onSubmit = async (data: EditHotelRoomFormData) => {
    await editRoom({ roomId: room.id!, data }).unwrap();
    navigate(`${RouteEnum.ROOMS}/${room.id}`);
  };

  const selectedRoomClass = roomClassesData?.find(rc => rc.id === Number(selectedRoomClassId));
  const selectedRoomClassDescription = selectedRoomClass ? t(`room_class_descriptions.${selectedRoomClass.name}`) : ''; 

  return (
    <BlockContainer>
      <div className="flex flex-col gap-6">
        <h2>{t("rooms.room_type_description")}</h2>
        <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-[2fr_1fr] mobile:grid-cols-1 gap-6">
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
              <span >{t("rooms.room_view")}</span>
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
            <div>
              {selectedRoomClassDescription}
            </div>
          </div>
          <div className="flex items-center gap-3 justify-end mt-4">
            <Button variant='text' onClick={() =>navigate(`${RouteEnum.ROOMS}/${room.id}`)}>
              {t("buttons.cancel")}
            </Button>
            <Button type="submit" disabled={isLoading} >
              {t("buttons.save")}
            </Button>
          </div>
        </form>
      </div>
    </BlockContainer>
  );
};

export default EditRoomForm;