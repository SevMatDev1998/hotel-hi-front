import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLazyDebounce } from "../../../hooks/useDebounse";
import { useCallback, useState } from "react";
import {
  useGetAllNotificationsQuery,
  useLazyGetPartnerCommissionsQuery,
  useSavePartnerCommissionsMutation,
  useSendPartnerNotificationMutation
} from "../../../services/notifications/notifications.service";
import { DataTable } from "../../../components/shared/Table";
import { getNotificationsColumns } from "./NotificationsColumns";
import { Button } from "../../../components/shared/Button";

interface INotificationsTableProps {
  hotelId?: string;
}

const NotifiacationsTable = ({ hotelId }: INotificationsTableProps) => {

  const navigate = useNavigate();
  const debounse = useLazyDebounce();
  const { t } = useTranslation();

  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<string>("1");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [expandedPartnerId, setExpandedPartnerId] = useState<number | null>(null);

  const { data: notifications } = useGetAllNotificationsQuery({ hotelId: hotelId! }, {
    skip: !hotelId,
    refetchOnMountOrArgChange: false,
  });

  const [getPartnerCommissions, { data: partnerCommissions, isLoading: commissionsLoading }] =
    useLazyGetPartnerCommissionsQuery();

  const [saveCommissions] = useSavePartnerCommissionsMutation();
  const [sendNotification, {isLoading:isNotificationSendLoading}] = useSendPartnerNotificationMutation();

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

  const handleToggleRow = useCallback((partnerId: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(partnerId)) {
        newSet.delete(partnerId);
        setExpandedPartnerId(null);
      } else {
        newSet.clear(); // Only one row expanded at a time
        newSet.add(partnerId);
        setExpandedPartnerId(partnerId);
        // Fetch commissions for this partner
        if (hotelId) {
          getPartnerCommissions({ hotelId, partnerId: partnerId.toString() });
        }
      }
      return newSet;
    });
  }, [hotelId, getPartnerCommissions]);

  const handleToggleNotification = useCallback((partnerId: number, enabled: boolean) => {
    console.log('Toggle notification for partner:', partnerId, 'enabled:', enabled);
  }, []);

  const handleSendNotification = useCallback(async (partnerId: string) => {
    if (!hotelId) return;
    sendNotification({
      hotelId: hotelId,
      partnerId
    }).unwrap();

  }, [hotelId, sendNotification]);

  const handleSaveCommissions = useCallback(async () => {
    if (!expandedPartnerId || !partnerCommissions) return;

    const availabilityIds = partnerCommissions.map((av: any) => av.id);
    await saveCommissions({
      partnerId: expandedPartnerId,
      availabilityIds,
    });

    // Close the expanded row
    setExpandedRows(new Set());
    setExpandedPartnerId(null);
  }, [expandedPartnerId, partnerCommissions, saveCommissions]);
  console.log(partnerCommissions);

  // Prepare data with expandedContent
  const tableData = (notifications || []).map((partner: any) => ({
    ...partner,
    expandedContent: expandedRows.has(partner.id) ? (
      <div className="bg-gray-50 p-4">
        <h3 className="text-lg font-semibold mb-4">
          {t("notifications.availabilities")}
        </h3>

        {commissionsLoading ? (
          <div>{t("common.loading")}</div>
        ) : (
          <div className="space-y-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">{t("notifications.period")}</th>
                  <th className="text-left py-2 px-4">{t("notifications.price_offer")}</th>
                  <th className="text-left py-2 px-4">{t("notifications.commission")}</th>
                </tr>
              </thead>
              <tbody>
                {partnerCommissions?.map((availability: any) => {
                  const commissions = availability.hotelAvailabilityDateCommissions;
                  const firstCommission = commissions[0];

                  return (
                    <tr key={availability.id} className="border-b">
                      <td className="py-3 px-4 align-top">
                        {commissions.map((commission: any, index: number) => (
                          <div key={commission.id} className={index > 0 ? 'mt-1' : ''}>
                            {commission.date}
                          </div>
                        ))}
                      </td>

                      {/* Second column - availability name with color (once) */}
                      <td className="py-3 px-4 align-top">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: availability.color }}
                          />
                          <span>{availability.title}</span>
                        </div>
                      </td>

                      {/* Third column - commission (once) */}
                      <td className="py-3 px-4 align-top">
                        {t("notifications.room")}: {firstCommission?.roomFee || 0}%,{' '}
                        {t("notifications.food")}: {firstCommission?.foodFee || 0}%,{' '}
                        {t("notifications.additional")}: {firstCommission?.additionalFee || 0}%,{' '}
                        {t("notifications.other")}: {firstCommission?.serviceFee || 0}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="textUnderline"
            onClick={() => {
              setExpandedRows(new Set());
              setExpandedPartnerId(null);
            }}
          >
            {t("notifications.cancel")}
          </Button>
          <Button
            onClick={handleSaveCommissions}
          >
            {t("notifications.confirm")}
          </Button>
        </div>
      </div>
    ) : null,
  }));

  return (
    <div>
      <DataTable
        data={tableData}
        columns={getNotificationsColumns(
          t,
          handleSendNotification,
          handleToggleRow,
          handleToggleNotification,
          isNotificationSendLoading,
        )}
        onChangePage={onChangePage}
        totalCount={notifications?.meta?.totalPages || 0}
        onSearch={handleChange}
        search={search}
      />
    </div>
  );
}
export default NotifiacationsTable;
