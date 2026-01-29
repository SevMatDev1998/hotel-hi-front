import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/shared/Button";
import { DataTable } from "../../../components/shared/Table";
import { getNotificationsColumns } from "./NotificationsColumns";
import { useLazyDebounce } from "../../../hooks/useDebounse";
import {
  useGetAllNotificationsQuery,
  useLazyGetPartnerCommissionsQuery,
  useSavePartnerCommissionsMutation,
  useSendPartnerNotificationMutation,
  useUpdatePartnerCommissionMutation,
  useSendAllNotificationsMutation
} from "../../../services/notifications/notifications.service";
import CommissionDateView from "../../../components/shared/CommissionDateView";
import EditCommissionModal from "../../../modals/EditCommisionModal";
import useModal from "../../../hooks/useModal";

interface INotificationsTableProps {
  hotelId?: string;
}

const NotifiacationsTable = ({ hotelId }: INotificationsTableProps) => {

  const debounse = useLazyDebounce();
  const { t } = useTranslation();
  const open = useModal();

  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<string>("1");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [expandedPartnerId, setExpandedPartnerId] = useState<number | null>(null);
  const [selectedPartners, setSelectedPartners] = useState<Set<string>>(new Set());

  const { data: notifications } = useGetAllNotificationsQuery({ hotelId: hotelId! }, {
    skip: !hotelId,
    refetchOnMountOrArgChange: false,
  });

  const [getPartnerCommissions, { data: partnerCommissions, isLoading: commissionsLoading }] =
    useLazyGetPartnerCommissionsQuery();

  const [saveCommissions] = useSavePartnerCommissionsMutation();
  const [sendNotification, { isLoading: isNotificationSendLoading }] = useSendPartnerNotificationMutation();
  const [updatePartnerCommission] = useUpdatePartnerCommissionMutation();
  const [sendAllNotifications, { isLoading: isSendAllLoading }] = useSendAllNotificationsMutation();

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

  useEffect(() => {
    if (notifications) {
      const initialSelected = new Set<string>();
      notifications.forEach((partner: any) => {
        if (!partner.lastNotificationSentAt) {
          initialSelected.add(partner.id);
        }
      });
      setSelectedPartners(initialSelected);
    }
  }, [notifications]);

  const handleToggleRow = useCallback((partnerId: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(partnerId)) {
        newSet.delete(partnerId);
        setExpandedPartnerId(null);
      } else {
        newSet.clear();
        newSet.add(partnerId);
        setExpandedPartnerId(partnerId);
        if (hotelId) {
          getPartnerCommissions({ hotelId, partnerId: partnerId.toString() });
        }
      }
      return newSet;
    });
  }, [hotelId, getPartnerCommissions]);

  const handleToggleNotification = useCallback((partnerId: string, enabled: boolean) => {
    setSelectedPartners(prev => {
      const newSet = new Set(prev);
      if (enabled) {
        newSet.add(partnerId);
      } else {
        newSet.delete(partnerId);
      }
      return newSet;
    });
  }, []);

  const handleSendNotification = useCallback(async (partnerId: string) => {
    if (!hotelId) return;
    await sendNotification({
      hotelId: hotelId,
      partnerId
    }).unwrap();
  }, [hotelId, sendNotification]);

  const handleSendAll = useCallback(async () => {
    if (!hotelId || selectedPartners.size === 0) return;
    
    const partnerIds = Array.from(selectedPartners);
    await sendAllNotifications({
      hotelId: hotelId,
      partnerIds
    }).unwrap();
  }, [hotelId, selectedPartners, sendAllNotifications]);

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

  const handleEditSubmit = async (commission: any, availabilityId: string, partnerId: number) => {
    open(EditCommissionModal, { 
      commission, 
      availabilityId, 
      partnerId,
      updateHotelAvailabilityDateCommissions: updatePartnerCommission 
    });
  };


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
                        <CommissionDateView dateCommissions={commissions} />
                      </td>
                      <td className="py-3 px-4 align-top">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: availability.color }}
                          />
                          <span>{availability.title}</span>
                        </div>
                      </td>
                      <div className="cursor-pointer" onClick={() => { handleEditSubmit(firstCommission, availability.id, expandedPartnerId!) }} >
                        <td className="py-3 px-4 align-top">
                          {t("notifications.room")}: {firstCommission?.roomFee || 0}%,{' '}
                          {t("notifications.food")}: {firstCommission?.foodFee || 0}%,{' '}
                          {t("notifications.additional")}: {firstCommission?.additionalFee || 0}%,{' '}
                          {t("notifications.other")}: {firstCommission?.serviceFee || 0}%
                        </td>
                      </div>
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
      <div className="flex justify-end mb-4">
        <Button
          onClick={handleSendAll}
          disabled={selectedPartners.size === 0 || isSendAllLoading}
          isLoading={isSendAllLoading}
        >
          {t("notifications.send_all")} ({selectedPartners.size})
        </Button>
      </div>
      <DataTable
        data={tableData}
        columns={getNotificationsColumns(
          t,
          handleSendNotification,
          handleToggleRow,
          handleToggleNotification,
          isNotificationSendLoading,
          selectedPartners,
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
