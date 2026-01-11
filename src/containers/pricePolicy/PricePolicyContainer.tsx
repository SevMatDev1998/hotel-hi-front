import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/shared/Button';
import InfoBlock from '../../components/shared/InfoBlock';
import ShowHotelAvailabilityModal from '../../modals/showHotelAvailabilityModal/ShowHotelAvailabilityModal';
import BlockContainer from '../public/BlockContainer';
import useAppSelector from '../../hooks/useAppSelector';
import useModal from '../../hooks/useModal';
import { useTranslation } from '../../hooks/useTranslation';
import { useGetHotelAvailabilityQuery, useCopyHotelAvailabilityMutation } from '../../services/hotelAvailability/hotelAvailability.service';
import RouteEnum from '../../enums/route.enum';

const PricePolicyContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const open = useModal();
 
  const { user } = useAppSelector((state) => state.auth)

  const { data: hotelAvailabilites } = useGetHotelAvailabilityQuery({ hotelId: user?.hotelId || '' }, { skip: !user?.hotelId, refetchOnMountOrArgChange: true });
  const [copyHotelAvailability, { isLoading: isCopying }] = useCopyHotelAvailabilityMutation();

  const handleOpenHotelAvailabilityModal = (availabilityId: string) => {
    open(ShowHotelAvailabilityModal, { title: "", availabilityId, onSubmit: () => { }, className: "bg-white" });
  };

  const handleCopyAvailability = async (availabilityId: number) => {
    try {
      await copyHotelAvailability({ availabilityId: availabilityId.toString() }).unwrap();
    } catch (error) {
      console.error('Failed to copy availability:', error);
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className="flex flex-col gap-6">
        <h2>{t("price_policy.hotel_pricing_policy")}</h2>
        <InfoBlock text='Հյուրանոցի հիմնական արժեքները սահմանվում են սենյակների և ծառայությունների համար որոշակի ժամկետով։ Դուք ունեք հնարավորություն կատարել առանձնահատուկ փոփոխություններ սենյակի կամ ծառայության հիմնական արժեքի մեջ գնային քաղաքականություն ավելացնելուց հետո գնային կարգավորման միջոցով։' />
      </div>
      <div>
        <Button variant='outline' onClick={() => { navigate(`${RouteEnum.PRICE_POLICY_CREATE}`) }}>{t("price_policy.add_pricing_policy")} </Button>
      </div>
      <div className='flex flex-col gap-3'>
        {!!hotelAvailabilites?.length && hotelAvailabilites?.map((item) => (
          <BlockContainer shadow={false} key={item.id}>
            <div className='flex justify-between'>
              <div>
                {item.title}
              </div>
              <div className='flex gap-4 items-center'>
                <div onClick={() => handleCopyAvailability(item.id)} className="cursor-pointer">
                  {isCopying ? t("Copying...") : t("Copy")}
                </div>
                <div onClick={() => { handleOpenHotelAvailabilityModal(item.id.toString()) }} className="cursor-pointer">
                  {t("price_policy.price_list")}
                </div>
                <span onClick={() => navigate(`${RouteEnum.PRICE_POLICY_CREATE}/${item.id}`)} className="cursor-pointer">
                  <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
                </span>
              </div>
            </div>

          </BlockContainer>
        ))}
      </div>
      <div className='flex justify-end mt-4'>
        <Button disabled={!hotelAvailabilites?.length} onClick={() => { navigate(RouteEnum.PRICE_POLICY_DATES) }}>
          {t("price_policy.attach_date_to_price_offer")}
        </Button>
      </div>
    </div>
  );
};

export default PricePolicyContainer;