import { TFunction } from 'i18next';
import { Partner } from '../../../types';
import { Switch } from '../../../components/shared/Switch';

export const getNotificationsColumns = (
  t: TFunction<"translation", undefined>,
  _navigate?: (path: string) => void,
  expandedRows?: Set<number>,
  onToggleRow?: (id: number) => void,
  onToggleNotification?: (partnerId: number, enabled: boolean) => void,
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleRow) {
                onToggleRow(row.original.id);
              }
            }}
            className="text-dusty-teal"
          >
            {t("notifications.edit")}
          </button>
        </div>
      ),
    },
    {
      id: 'notified',
      header: t("notifications.notified"),
      cell: ({ row }: { row: { original: Partner } }) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Implement notification logic
            console.log('Notify partner:', row.original.id);
          }}
          className="text-dusty-teal"
        >
          {t("notifications.notify")}
        </button>
      ),
    }
  ];
