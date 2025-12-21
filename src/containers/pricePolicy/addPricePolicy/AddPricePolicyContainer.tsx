import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAppSelector from '../../../hooks/useAppSelector';
import { useTranslation } from '../../../hooks/useTranslation';
import { useGetHotelAvailabilityQuery, useGetHotelAgeAssessmentByHotelAvailabilityIdQuery } from '../../../services/hotelAvailability/hotelAvailability.service';
import RouteEnum from '../../../enums/route.enum';
import { HotelAvailability } from '../../../types';
import BlockContainer from '../../public/BlockContainer';
import AddPricePolicy from './addPricePolicy/AddPricePolicy';
import EditPricePolicy from './editPricePolicy/EditPricePolicy';
import AddRoomPricePolicy from './addRoomPricePolicy/AddRoomPricePolicy';
import AddServicePricePolicy from './addServicePricePolicy/AddServicePricePolicy';

const AddPricePolicyContainer = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hotelAvailabilityId } = useParams<{ hotelAvailabilityId?: string }>();
  const [isEditingFirstBlock, setIsEditingFirstBlock] = useState(!hotelAvailabilityId);

  const { data: hotelAvailabilityList } = useGetHotelAvailabilityQuery(
    { hotelId: user?.hotelId || '' },
    { skip: !user?.hotelId || !hotelAvailabilityId }
  );

  const hotelAvailability = hotelAvailabilityList?.find(
    (item) => item.id.toString() === hotelAvailabilityId
  ); 

  const { data: hotelAgeAssignments } = useGetHotelAgeAssessmentByHotelAvailabilityIdQuery(
    { hotelAvailabilityId: hotelAvailabilityId || '' },
    { skip: !hotelAvailabilityId }
  );

  useEffect(() => {
    if (hotelAvailabilityId) {
      setIsEditingFirstBlock(false);
    }
  }, [hotelAvailabilityId]);

  const handleAvailabilityCreated = (data: HotelAvailability) => {
    navigate(`${RouteEnum.PRICE_POLICY_CREATE}/${data.id}`);
  };

  const handleAvailabilityUpdated = () => {
    setIsEditingFirstBlock(false);
  };

  const handleEdit = () => {
    setIsEditingFirstBlock(true);
  };

  return (
    <div className='flex flex-col gap-6'>
      {isEditingFirstBlock ? (
        hotelAvailabilityId && hotelAvailability ? (
          <EditPricePolicy
            availabilityData={{
              id: hotelAvailability.id,
              title: hotelAvailability.title,
              checkInTime: hotelAvailability.checkInTime?.toString() || '',
              checkoutTime: hotelAvailability.checkoutTime?.toString() || '',
              hotelAgeAssignments: hotelAgeAssignments || []
            }}
            onSuccess={handleAvailabilityUpdated}
            onCancel={() => setIsEditingFirstBlock(false)}
          />
        ) : (
          <AddPricePolicy
            hotelId={user?.hotelId}
            onSuccess={handleAvailabilityCreated}
          />
        )
      ) : (
        <BlockContainer shadow={false}>
          <div className='flex justify-between items-center'>
            <div>
              <h3>{t("price_policy.price_offer_settings")}</h3>
              <p className='text-gray-500'>{hotelAvailability?.title}</p>
            </div>
            <img
              src="/images/icons/edit-icon.svg"
              alt="edit"
              className="cursor-pointer"
              onClick={handleEdit}
            />
          </div>
        </BlockContainer>
      )}

      {!isEditingFirstBlock && hotelAvailabilityId && (
        <AddRoomPricePolicy
          hotelId={user?.hotelId}
          hotelAvailabilityId={hotelAvailabilityId}
        />
      )}
      
      <AddServicePricePolicy
        hotelId={user?.hotelId}
        hotelAvailabilityId={hotelAvailabilityId ? parseInt(hotelAvailabilityId) : undefined}
      />
    </div>
  );
};

export default AddPricePolicyContainer;