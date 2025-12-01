import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/shared/Button";
import InfoBlock from "../../../components/shared/InfoBlock";
import { DataTable } from "../../../components/shared/Table";
import { getHotelPartnersColumns } from "./HotelPartnersColumns";
import useAppSelector from "../../../hooks/useAppSelector";
import { useLazyDebounce } from "../../../hooks/useDebounse";
import { useSetNavigationAccessStepMutation } from "../../../services/auth";
import { useGetHotelPartnersQuery } from "../../../services/partners";
import RouteEnum from "../../../enums/route.enum";

const HotelPartnersContainer = () => {

  const { user } = useAppSelector(state => state.auth)
  const navigate = useNavigate();
  const debounse = useLazyDebounce();
  const { t } = useTranslation();
  const [setNavigationAccessStep] = useSetNavigationAccessStepMutation()

  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<string>("1");

  const { data: hotelPartners } = useGetHotelPartnersQuery({ hotelId: user?.hotelId, page, search }, { skip: !user?.hotelId });

  const onChangePage = (pageNumber: string) => {
    if (pageNumber !== page) {
      setPage(pageNumber);
    }
  };

  const handleChange = useCallback((e: string) => {
    debounse(() => {
      setSearch(e)
    }, 500)
  }, [setSearch, debounse])

  const handleSetNavigationAccessStep = () => {
    setNavigationAccessStep({ hotelId: user?.hotelId, stepNumber: 7 }).unwrap()
    navigate(RouteEnum.NOTIFICATIONS);
  }

  return (
    <div className="flex flex-col gap-3">
      <h2>{t("partners.partners")}</h2>
      <InfoBlock text="Գործընկերների ցանկում ներառեք բոլոր այն կազմակերպություններին, որոնց ցանկանում եք տեղեկացնել հյուրանոցի կողմից գնային քաղականության փոփոխությունների մասին։ Կարող եք յուրաքանաչյուր գործընկերի համար սահմանել առանձին միջնորդավճարներ։" />
      <Button variant="outline" onClick={() => { navigate(`${RouteEnum.HOTEL_PARTNERS}/create`) }}>{t("partners.add_partner")}</Button>
      <DataTable
        data={hotelPartners?.data || []}
        columns={getHotelPartnersColumns(t, navigate)}
        onChangePage={onChangePage}
        totalCount={hotelPartners?.meta?.totalPages || 0}
        onSearch={handleChange}
        search={search}
      />
      <div className="justify-end">
        <Button onClick={handleSetNavigationAccessStep}>
          {t("partners.notify_partners")}
        </Button>
      </div>

    </div>
  );
};

export default HotelPartnersContainer;