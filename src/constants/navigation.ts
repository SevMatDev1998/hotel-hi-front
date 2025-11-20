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

interface NavigationSubItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  step?: number;
}

interface NavigationItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  hasSubItems: boolean;
  href?: string;
  subItems?: NavigationSubItem[];
  disabled?: boolean;
  step?: number;
}

export const NAVIGATION: NavigationItem[] = [
    {
      name: 'menu.hotel',
      icon: Hotel,
      hasSubItems: true,
      subItems: [
        {
          name: 'menu.basic',
          href: '/hotel',
          icon: Bed,
          step: 1
        },
        {
          name: 'menu.rooms',
          href: '/rooms',
          icon: Calendar,
          step: 2
        },
        {
          name: 'menu.food',
          href: '/foods',
          icon: Coffee,
          step: 3
        },
        {
          name: 'menu.services',
          href: '/hotel-services',
          icon: CreditCard,
          step: 4
        },

      ]
    },
    {
      name: 'menu.price settings',
      href: '/price-policy',
      icon: BarChart3,
      hasSubItems: false,
      step: 5
    },
    {
      name: 'menu.partners',
      href: '/hotel-partners',
      icon: Users,
      hasSubItems: false,
      step: 6
    },
    {
      name: 'menu.notifications',
      href: '/notifications',
      icon: FileText,
      hasSubItems: false,
      step: 7
    }
  ];