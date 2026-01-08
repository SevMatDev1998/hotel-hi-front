import { TFunction } from 'i18next';
import { Button } from '../../../components/shared/Button';
import { Switch } from '../../../components/shared/Switch';
import { Partner } from '../../../types';

export const getNotificationsColumns = (
  t: TFunction<"translation", undefined>,
  onSendNotification: (partnerId: string) => void,
  onToggleRow: (id: number) => void,
  onToggleNotification: (partnerId: number, enabled: boolean) => void,
  isNotificationSendLoading: boolean,
) => [
    // {
    //   id: 'expander',
    //   header: () => null,
    //   cell: ({ row }: { row: { original: Partner } }) => (
    //     <button
    //       onClick={() => onToggleRow && onToggleRow(row.original.id)}
    //       className="p-1"
    //     >
    //       {expandedRows?.has(row.original.id) ? (
    //         <ChevronDown className="h-4 w-4" />
    //       ) : (
    //         <ChevronRight className="h-4 w-4" />
    //       )}
    //     </button>
    //   ),
    // },
    {
      id: 'toggle',
      header: t("notifications.name"),
      cell: ({ row }: { row: { original: Partner } }) => (
        <div className="flex items-center gap-2">
          <Switch
            checked={true}
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
                onToggleRow(row.original.id);
              }
            }}
            className={row.original.isPartnerCommissionAccept ? "text-black" : "text-dusty-teal"}
            // disabled={row.original.isPartnerCommissionAccept}
          >
            {row.original.isPartnerCommissionAccept ? t("notifications.accepted") : t("notifications.edit")}
          </Button>
        </div>
      ),
    },
    {
      id: 'notified',
      header: t("notifications.notified"),
      cell: ({ row }: { row: { original: Partner } }) => (
        <Button
          variant='text'
          onClick={(e) => {
            e.stopPropagation();
            onSendNotification(row.original.id);
          }}
          isLoading ={isNotificationSendLoading}
            disabled={!row.original.isPartnerCommissionAccept ||isNotificationSendLoading}
          className={row.original.isPartnerCommissionAccept ? "text-dusty-teal" : "text-black"}
        >
          { t("notifications.notify")}
        </Button>
      ),
    }
  ];
