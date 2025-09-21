import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Users,
  BookOpen,
  Video,
  StickyNote,
  CreditCard,
  Calendar,
  HelpCircle,
  LayoutDashboard,
  Newspaper,
  User,
  Bell,
  Star
  
} from 'lucide-react';
import { UserRole } from '../../types';
import RouteEnum from '../enums/route.enum';

const navigation: {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  roles: UserRole[];
}[] = 
[
  {
    name: 'Dashboard',
    href: RouteEnum.HOME,
    icon: LayoutDashboard,
    roles: ['SUPERADMIN', 'ADMIN']
  },
  {
    name: 'Users',
    href: RouteEnum.USERS,
    icon: Users,
    roles: ['SUPERADMIN']
  },
  {
    name: 'Courses',
    href: RouteEnum.COURSES,
    icon: BookOpen,
    roles: ['SUPERADMIN', 'ADMIN']
  },
  {
    name: 'Lessons',
    href: RouteEnum.LESSONS,
    icon: Video,
    roles: ['SUPERADMIN', 'ADMIN']
  },
  {
    name: 'User Groups',
    href: RouteEnum.USERGROUPS,
    icon: StickyNote,
    roles: ['SUPERADMIN', 'ADMIN']
  },
  {
    name: 'Subscriptions',
    href: RouteEnum.SUBSCRIPTIONS,
    icon: CreditCard,
    roles: ['SUPERADMIN', 'ADMIN']
  },
  {
    name: 'Meets',
    href: RouteEnum.MEETS,
    icon: Calendar,
    roles: ['SUPERADMIN', 'ADMIN']
  },
  {
    name: 'FAQs',
    href: RouteEnum.FAQS,
    icon: HelpCircle,
    roles: ['SUPERADMIN', 'ADMIN']
  },
  {
    name: 'News',
    href: RouteEnum.NEWS,
    icon: Newspaper,
    roles: ['SUPERADMIN', 'ADMIN']
  },
  {
    name: 'Lesson Owner',
    href: RouteEnum.LESSON_OWNERS,
    icon: User,
    roles: ['SUPERADMIN', 'ADMIN']
  },
  {
    name: 'Notification',
    href: RouteEnum.NOTIFICATIONS,
    icon: Bell,
    roles: ['SUPERADMIN', 'ADMIN']
  },
  {
    name: 'Reviews',
    href: RouteEnum.REVIEWS,
    icon: Star,
    roles: ['SUPERADMIN', 'ADMIN']
  },
];

interface ISideBar {
  setIsShowSideBar: React.Dispatch<React.SetStateAction<boolean>>
}
export const Sidebar: FC<ISideBar> = ({ setIsShowSideBar }) => {

  const navigate = useNavigate()

  return (
    <div className="flex h-full w-64 flex-col bg-dusty-teal">
      <div className="flex h-16 items-center justify-center border-b border-gray-800 cursor-pointer" onClick={()=>{navigate("/")}}>
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          // If user?.role is undefined OR user.role is not included in item.roles, skip

          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
              onClick={() => { setIsShowSideBar(false) }}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};