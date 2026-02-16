import { NavLink } from 'react-router-dom';
import kuroLogo from '../../assets/kuro.png';

import { motion } from 'framer-motion';
import {
  HomeIcon,
  Cog6ToothIcon,
  BriefcaseIcon,
  PhotoIcon,
  NewspaperIcon,
  UsersIcon,
  HeartIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  MegaphoneIcon,
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';


const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Services', href: '/services', icon: BriefcaseIcon },
  { name: 'Portfolio', href: '/portfolio', icon: PhotoIcon },
  { name: 'Blog', href: '/blog', icon: NewspaperIcon },
  { name: 'Team', href: '/team', icon: UsersIcon },
  { name: 'Initiatives', href: '/initiatives', icon: HeartIcon },
  { name: 'Contacts', href: '/contacts', icon: EnvelopeIcon },
  { name: 'Quotes', href: '/quotes', icon: CurrencyDollarIcon },
  { name: 'Newsletter', href: '/newsletter', icon: MegaphoneIcon },
  { name: 'Careers', href: '/careers', icon: UserGroupIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />

        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl"
        >
          <SidebarContent close={() => setSidebarOpen(false)} />
        </motion.div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72">
        <div className="flex flex-col flex-1 bg-white border-r border-gray-100 relative overflow-hidden">

          {/* Soft glow accent */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#2FA8C7]/10 rounded-full blur-[100px]" />

          <SidebarContent />
        </div>
      </div>
    </>
  );
}

function SidebarContent({ close }) {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100 relative z-10">
        <img 
          src={kuroLogo} 
          alt="Kuros Consult Logo" 
          className="h-10 w-auto object-contain"
        />

        {close && (
          <button
            onClick={close}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <XMarkIcon className="h-5 w-5 text-gray-600" />
          </button>
        )}
      </div>


      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto relative z-10">
        {navigation.map((item) => (
          <NavLink key={item.name} to={item.href}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#135E73] text-white shadow-lg shadow-[#135E73]/20'
                    : 'text-gray-600 hover:bg-[#FAFAFA] hover:text-[#135E73]'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-white' : 'text-gray-400'
                  }`}
                />
                {item.name}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Accent */}
      <div className="p-6 border-t border-gray-100 relative z-10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FEC300]" />
          <div className="w-3 h-3 rounded-full bg-[#2FA8C7]" />
          <div className="w-3 h-3 rounded-full bg-[#135E73]" />
        </div>
      </div>
    </>
  );
}
