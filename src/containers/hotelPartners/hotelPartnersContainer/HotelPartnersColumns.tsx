import { ArrowBigRight } from 'lucide-react';
import {  Partner, PartnerStatus, User } from '../../../types';
import { TFunction } from 'i18next';

export const getHotelPartnersColumns = (
  t: TFunction<"translation", undefined>,
  navigate?: (path: string) => void,
) => [
    {
      accessorKey: 'ltd',
      header: t("partners.legal_person"),
      enableSorting: true,
      meta: { className: 'hidden mobile:table-cell' },
      cell: ({ row }: { row: { original: Partner } }) => (
        <div className="flex gap-2">
          <div
            className={`border rounded-[4px] px-2  text-12 ${row.original.status === PartnerStatus.Pending
                ? 'text-breaker-bay border-breaker-bay'
                : 'text-black border-black'
              }`}
          >
            {t(`partners_status.${row.original.status}`)}
          </div>
          <span>{row.original.ltd}</span>
        </div>
      ),
    },
    {
      accessorKey: 'name',
      header: t("partners.name"),
    },
    {
      accessorKey: 'email',
      header: t("partners.email"),
    },
    {
      accessorKey: 'phone',
      header: t("partners.phone_number"),
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
