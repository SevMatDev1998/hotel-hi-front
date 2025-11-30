import { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/shared/Button";
import InfoBlock from "../../../components/shared/InfoBlock";
import RegisterInput from "../../../components/shared/RegisterInput";
import { RegisterSelect } from "../../../components/shared/RegisterSelect";
import BlockContainer from "../../public/BlockContainer";
import InputValidationLayout from "../../../layouts/inputValidationLayout/InputValidationLayout";
import { useCreateRoomMutation, useGetRoomClassesQuery, useGetRoomViewsQuery } from "../../../services/rooms";
import { CreateHotelRoomFormData, CreateHotelRoomSchema } from "../../../yupValidation/RoomValidation";

interface RoomTypeDescriptionProps {
  hotelId?: string
}

const RoomTypeDescription: FC<RoomTypeDescriptionProps> = ({ hotelId }) => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<CreateHotelRoomFormData>({
    resolver: yupResolver(CreateHotelRoomSchema),
  });

  const [createRoom, { data, isLoading }] = useCreateRoomMutation()

  const onSubmit = async (data: CreateHotelRoomFormData) => {
    await createRoom({ hotelId: hotelId!, data }).unwrap();
  };


  useEffect(() => {
    if (data?.id) {
      navigate(`/rooms/${data.id}`);
    }
  }, [data, navigate]);


  const { data: roomClassesData } = useGetRoomClassesQuery();
  const { data: roomViewsData } = useGetRoomViewsQuery();


  const roomClassesOptions = roomClassesData?.map((roomClass) => ({
    value: roomClass.id,
    label: roomClass.name,
  })) || [];

  const roomViewsOptions = roomViewsData?.map((roomView) => ({
    value: roomView.id,
    label: roomView.name
  })) || [];

  return (
    <BlockContainer shadow={false}>
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
  )
}

export default RoomTypeDescription;