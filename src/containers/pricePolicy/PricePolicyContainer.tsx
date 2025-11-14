import { useTranslation } from '../../hooks/useTranslation';
import InfoBlock from '../../components/shared/InfoBlock';
import { Button } from '../../components/shared/Button';
import { useNavigate } from 'react-router-dom';
import RouteEnum from '../../enums/route.enum';
import { useGetHotelAvailabilityQuery } from '../../services/hotelAvailability/hotelAvailability.service';
import useAppSelector from '../../hooks/useAppSelector';
import BlockContainer from '../public/BlockContainer';
import ShowHotelAvailabilityModal from '../../modals/showHotelAvailabilityModal/ShowHotelAvailabilityModal';
import useModal from '../../hooks/useModal';

const PricePolicyContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  const open = useModal();

  const { data: hotelAvailabilites } = useGetHotelAvailabilityQuery({ hotelId: user?.hotelId }, { skip: !user?.hotelId })

  const handleOpenHotelAvailabilityModal = (availabilityId: string) => {
    open(ShowHotelAvailabilityModal, { title: "", availabilityId,onSubmit: () =>{} ,  });
  };



  return (
    <div>
      <div className="flex flex-col gap-6">
        <h2>{t("price_policy.hotel_pricing_policy")}</h2>
        <InfoBlock text='Հյուրանոցի հիմնական արժեքները սահմանվում են սենյակների և ծառայությունների համար որոշակի ժամկետով։ Դուք ունեք հնարավորություն կատարել առանձնահատուկ փոփոխություններ սենյակի կամ ծառայության հիմնական արժեքի մեջ գնային քաղաքականություն ավելացնելուց հետո գնային կարգավորման միջոցով։' />
      </div>
      <div>
        <Button variant='outline' onClick={() => { navigate(`${RouteEnum.PRICE_POLICY_CREATE}`) }}>{t("price_policy.add_pricing_policy")} </Button>
      </div>
      <div className='flex flex-col gap-3'>
        {!!hotelAvailabilites?.length && hotelAvailabilites?.map((item) => (
          <BlockContainer shadow={false}  >
            <div className='flex justify-between'>
              <div>
                {item.title}
              </div>
              <div onClick={()=>{handleOpenHotelAvailabilityModal(item.id)}}>
                {t("price_policy.price_list")}
              </div>
            </div>
            { }
          </BlockContainer>
        ))}
      </div>
      <div className='flex justify-end mt-4'>
        <Button onClick={() => { navigate(RouteEnum.PRICE_POLICY_DATES) }}>
          {t("price_policy.attach_date_to_price_offer")}
        </Button>
      </div>
    </div>
  );
};

export default PricePolicyContainer;