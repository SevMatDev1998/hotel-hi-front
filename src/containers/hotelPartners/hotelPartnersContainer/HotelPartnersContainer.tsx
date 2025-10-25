import { useNavigate } from "react-router-dom";
import { DataTable } from "../../../components/shared/Table";
import useAppSelector from "../../../hooks/useAppSelector";
import { useGetHotelPartnersQuery } from "../../../services/partners";
import { getHotelPartnersColumns } from "./HotelPartnersColumns";
import { useCallback, useState } from "react";
import { useLazyDebounce } from "../../../hooks/useDebounse";
import InfoBlock from "../../../components/shared/InfoBlock";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/shared/Button";
import ApiEnum from "../../../enums/api.enum";

const HotelPartnersContainer = () => {

  const { user } = useAppSelector(state => state.auth)
  const navigate = useNavigate();
  const debounse = useLazyDebounce();
  const { t } = useTranslation();

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


  return (
    <div>
      <h2>{t("partners.partners")}</h2>
      <InfoBlock text="Գործընկերների ցանկում ներառեք բոլոր այն կազմակերպություններին, որոնց ցանկանում եք տեղեկացնել հյուրանոցի կողմից գնային քաղականության փոփոխությունների մասին։ Կարող եք յուրաքանաչյուր գործընկերի համար սահմանել առանձին միջնորդավճարներ։" />
      <Button variant="outline" onClick={() => { navigate(`/${ApiEnum.HOTEL_PARTNERS}/create`) }}>{t("partners.add_partner")}</Button>
      <DataTable
        data={hotelPartners?.data || []}
        columns={getHotelPartnersColumns(t, navigate)}
        onChangePage={onChangePage}
        totalCount={hotelPartners?.meta?.totalPages || 0}
        onSearch={handleChange}
        search={search}
      />
    </div>
  );
};

export default HotelPartnersContainer;