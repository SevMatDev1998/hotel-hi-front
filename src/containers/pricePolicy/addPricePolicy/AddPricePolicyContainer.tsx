import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAppSelector from '../../../hooks/useAppSelector';
import AddPricePolicy from './AddPricePolicy';
import AddRoomPricePolicy from './addRoomPricePolicy/AddRoomPricePolicy';
import BlockContainer from '../../public/BlockContainer';
import { useTranslation } from '../../../hooks/useTranslation';
import { HotelAvailability } from '../../../types';
import RouteEnum from '../../../enums/route.enum';
import { useGetHotelAvailabilityQuery } from '../../../services/hotelAvailability/hotelAvailability.service';

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

  useEffect(() => {
    if (hotelAvailabilityId) {
      setIsEditingFirstBlock(false);
    }
  }, [hotelAvailabilityId]);

  const handleAvailabilityCreated = (data: HotelAvailability) => {
    navigate(`${RouteEnum.PRICE_POLICY_CREATE}/${data.id}`);
  };

  const handleEdit = () => {
    setIsEditingFirstBlock(true);
  };

  return (
    <div className='flex flex-col gap-6'>
      {isEditingFirstBlock ? (
        <AddPricePolicy 
          hotelId={user?.hotelId} 
          onSuccess={handleAvailabilityCreated}
        />
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
    </div>
  );
};

export default AddPricePolicyContainer;