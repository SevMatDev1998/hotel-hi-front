import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users,
  ChevronDown,
  ChevronUp,
  Hotel,
  FileText,
  Calendar,
  Bed,
  Coffee,
  CreditCard,
  BarChart3
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDisaptch';
import { toggleSidebar } from '../../store/slices/general.slice';

export const Sidebar = () => {
  const { t } = useTranslation();
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector(state => state.general)
  // Navigation structure with accordion support
  const navigation = [
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
      href: '/partners',
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

  const toggleExpand = (itemName: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const checkMobile = (isOpen: boolean) => {
    return dispatch(toggleSidebar(isOpen));
  }

  useEffect(() => {
    window.addEventListener('resize', () => checkMobile(window.innerWidth > 768));
    return () => window.removeEventListener('resize', () => checkMobile(window.innerWidth > 768));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`
              ${isSidebarOpen ? 'block' : 'hidden'}
              w-64
              h-full
              mobile:fixed mobile:left-0 mobile:top-0
            `}
    >
      <div className="flex h-full w-64 flex-col  py-7 px-8 z-[999999] relative  mobile:bg-white mobile:shadow-block-shadow">
        <div className="flex h-16 items-center cursor-pointer gap-4" >
          <img src="/images/icons/secundary-logo.svg" alt="Logo" className="h-8" />
          <h1 className="text-xl font-bold ">Hotel Hive</h1>
        </div>
        <p>name</p>
        <nav className="flex-1 space-y-1 ">
          {navigation.map((item) => {
            const Icon = item.icon;

            if (item.hasSubItems) {
              // Accordion item with sub-navigation
              return (
                <div key={item.name} className="space-y-1 cursor-pointer">
                  <div
                    onClick={() => toggleExpand(item.name)}
                    className="flex w-full items-center justify-between px-2 py-2 text-14 font-medium text-charcoal-gray hover:bg-cloud-gray  rounded-4md"
                  >
                    <div className="flex items-center">
                      <Icon className="mr-3 h-5 w-5" />
                      {t(item.name)}
                    </div>

                    {expandedItems[item.name] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </div>

                  {expandedItems[item.name] && (
                    <div className="pl-6 space-y-1">
                      {item.subItems?.map((subItem) => {
                        const SubIcon = subItem.icon;
                        return (
                          <NavLink
                            key={subItem.name}
                            to={subItem.href}
                            className={() =>
                              `flex items-center px-2 py-2 text-12  text-charcoal-gray hover:bg-ash-gray`
                            }
                            onClick={() => window.innerWidth < 768 && checkMobile(false)}
                          >
                            <SubIcon className="mr-3 h-4 w-4" />
                            {t(subItem.name)}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            } else {
              // Regular navigation item
              return (
                <NavLink
                  key={item.name}
                  to={item.href!}
                  className={() =>
                    `flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-ash-gray`
                  }
                  onClick={() => window.innerWidth < 768 && checkMobile(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {t(item.name)}
                </NavLink>
              );
            }
          })}
        </nav>
      </div>
    </div>

  );
};