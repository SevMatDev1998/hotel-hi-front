import { TFunction } from 'i18next';
import { Button } from '../../../components/shared/Button';
import { Switch } from '../../../components/shared/Switch';
import { Partner } from '../../../types';

export const getNotificationsColumns = (
  t: TFunction<"translation", undefined>,
  onSendNotification: (partnerId: string) => void,
  onToggleRow: (id: number) => void,
  onToggleNotification: (partnerId: string, enabled: boolean) => void,
  isNotificationSendLoading: boolean,
  selectedPartners: Set<string>,
) => [
    {
      id: 'toggle',
      header: t("notifications.name"),
      cell: ({ row }: { row: { original: Partner } }) => (
        <div className="flex items-center gap-2">
          <Switch
            checked={selectedPartners.has(row.original.id)}
            onCheckedChange={(checked: boolean) =>
              onToggleNotification && onToggleNotification(row.original.id, checked)
            }
          />
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'ltd',
      header: t("notifications.legal_person_name"),
    },
    {
      accessorKey: 'email',
      header: t("notifications.email"),
    },
    {
      id: 'commission',
      header: t("notifications.commission"),
      cell: ({ row }: { row: { original: Partner } }) => (
        <div className="flex items-center gap-2">
          <span>{t("notifications.general")}</span>
          <Button
          variant='text'
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleRow) {
                onToggleRow(Number(row.original.id));
              }
            }}
            className={row.original.isPartnerCommissionAccept ? "text-black" : "text-dusty-teal"}
            // disabled={row.original.isPartnerCommissionAccept}
          >
            {t('notifications.edit')}
          </Button>
        </div>
      ),
    },
    {
      id: 'notified',
      header: t("notifications.notified"),
      cell: ({ row }: { row: { original: Partner } }) => {
        const hasSchedule = row.original.lastNotificationSentAt;
        const canNotify = row.original.isPartnerCommissionAccept;
        const isButtonActive = canNotify && !hasSchedule;
          
        return (
          <Button
            variant='text'
            onClick={(e) => {
              e.stopPropagation();
              onSendNotification(row.original.id);
            }}
            isLoading={isNotificationSendLoading}
            disabled={!isButtonActive || isNotificationSendLoading}
            className={isButtonActive ? "text-dusty-teal cursor-pointer" : "text-dusty-teal cursor-not-allowed"}
          >
            {hasSchedule 
              ? new Date(row.original.lastNotificationSentAt!).toLocaleDateString() 
              : t("notifications.notify")
            }
          </Button>
        );
      },
    }
  ];
