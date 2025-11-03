import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLazyDebounce } from "../../../hooks/useDebounse";
import { useCallback, useState } from "react";
import { useGetAllNotificationsQuery } from "../../../services/notifications/notifications.service";
import { DataTable } from "../../../components/shared/Table";
import { getNotificationsColumns } from "./NotificationsColumns";

interface INotificationsTableProps {
  hotelId?: string;
}

const NotifiacationsTable = ({ hotelId }: INotificationsTableProps) => {

  const navigate = useNavigate();
  const debounse = useLazyDebounce();
  const { t } = useTranslation();

  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<string>("1");

  console.log("hotelId", hotelId);
  
  const { data: notifications } = useGetAllNotificationsQuery({ hotelId: hotelId! }, {
    skip: !hotelId,
    refetchOnMountOrArgChange: false,
  });


  console.log(333,notifications);
  

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
        <DataTable
          data={notifications || []}
          columns={getNotificationsColumns(t, navigate)}
          onChangePage={onChangePage}
          totalCount={notifications?.meta?.totalPages || 0}
          onSearch={handleChange}
          search={search}
        />

    </div>
  );
}
export default NotifiacationsTable;