import {
  Users,
  Hotel,
  FileText,
  Calendar,
  Bed,
  Coffee,
  CreditCard,
  BarChart3
} from 'lucide-react';

export const NAVIGATION = [
    {
      name: 'menu.hotel',
      icon: Hotel,
      hasSubItems: true,
      subItems: [
        {
          name: 'menu.basic',
          href: '/hotel',
          icon: Bed,
        },
        {
          name: 'menu.rooms',
          href: '/rooms',
          icon: Calendar,
        },
        {
          name: 'menu.food',
          href: '/foods',
          icon: Coffee,
        },
        {
          name: 'menu.services',
          href: '/hotel-services',
          icon: CreditCard,
        },

      ]
    },
    {
      name: 'menu.price settings',
      href: '/price-policy',
      icon: BarChart3,
      hasSubItems: false
    },
    {
      name: 'menu.partners',
      href: '/hotel-partners',
      icon: Users,
      hasSubItems: false
    },
    {
      name: 'menu.notifications',
      href: '/notifications',
      icon: FileText,
      hasSubItems: false
    }
  ];