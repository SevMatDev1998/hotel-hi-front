import { yupResolver } from "@hookform/resolvers/yup";
import InfoBlock from "../../../components/shared/InfoBlock";
import RegisterInput from "../../../components/shared/RegisterInput";
import BlockContainer from "../../public/BlockContainer";
import { useTranslation } from "react-i18next";
import { CreateHotelRoomFormData, CreateHotelRoomSchema } from "../../../yupValidation/RoomValidation";
import { useForm } from "react-hook-form";
import { useCreateRoomMutation, useGetRoomClassesQuery, useGetRoomViewsQuery } from "../../../services/rooms";
import { FC } from "react";
import { Button } from "../../../components/shared/Button";
import { RegisterSelect } from "../../../components/shared/RegisterSelect";

interface RoomTypeDescriptionProps {
  hotelId?: number
}

const RoomTypeDescription: FC<RoomTypeDescriptionProps> = ({ hotelId }) => {

  const { register, handleSubmit, formState: { errors } } = useForm<CreateHotelRoomFormData>({
    resolver: yupResolver(CreateHotelRoomSchema),
  });

  const [createRoom, { isLoading }] = useCreateRoomMutation()

  const onSubmit = async (data: CreateHotelRoomFormData) => {
    await createRoom({ id: hotelId!, data })
  };
  const { t } = useTranslation();


  const { data: roomClassesData } = useGetRoomClassesQuery();
  const { data: roomViewsData } = useGetRoomViewsQuery();


  const roomClassesOptions = roomClassesData?.map((roomClass) => ({
    value: roomClass.id,
    label: roomClass.name,
  })) || [];


  const roomViewsOptions = roomViewsData?.map((roomView) => ({
    value: roomView.id,
    label: roomView.name,
  })) || [];
  console.log(errors);

  return (
    <BlockContainer>
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
              tr_name="room_class"
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
              tr_name="room_view"
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
              name="numbers"
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
    </BlockContainer>
  )
}

export default RoomTypeDescription;