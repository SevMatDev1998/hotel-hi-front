import { ArrowBigRight } from 'lucide-react';
import {  Partner, PartnerStatus, User } from '../../../types';
import { TFunction } from 'i18next';

export const getNotificationsColumns = (
  t: TFunction<"translation", undefined>,
  navigate?: (path: string) => void,
) => [
    {
      accessorKey: 'director',
      header: t("notifications.name"),
    },
    {
      accessorKey: 'ltd',
      header: t("notifications.legal_person_name"),
    },
    {
      accessorKey: 'tin',
      header: t("notifications.tax_id"),
    },
    {
      accessorKey: 'email',
      header: t("notifications.email"),
    },
    {
      id: 'actions',
      cell: ({ row }: { row: { original: User } }) => (
        <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div
            onClick={() => navigate && navigate(`/users/${row.original.id}`)}
            className='cursor-pointer'
          >
            <ArrowBigRight className="h-4 w-4" />
          </div>
        </div>
      ),
    }
  ];
