import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header({ setSidebarOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between">

      {/* Mobile Toggle */}
      <button
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        onClick={() => setSidebarOpen(true)}
      >
        <Bars3Icon className="h-6 w-6 text-[#135E73]" />
      </button>

      <div className="flex items-center gap-6 ml-auto">

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-[#FAFAFA] transition">
          <BellIcon className="h-6 w-6 text-gray-500" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#FEC300] ring-2 ring-white" />
        </button>

        {/* Profile Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-3 p-2 rounded-2xl hover:bg-[#FAFAFA] transition">

            <div className="h-9 w-9 rounded-full bg-[#135E73]/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-[#135E73]">
                {user?.name?.charAt(0) || 'A'}
              </span>
            </div>

            <span className="hidden lg:block text-sm font-medium text-[#135E73]">
              {user?.name || 'Admin'}
            </span>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-2">

              <DropdownItem label="Your Profile" onClick={() => navigate('/profile')} />
              <DropdownItem label="Settings" onClick={() => navigate('/settings')} />
              <DropdownItem
                label="Sign out"
                onClick={() => logout(navigate)}
                danger
              />

            </Menu.Items>
          </Transition>
        </Menu>

      </div>
    </header>
  );
}

function DropdownItem({ label, onClick, danger }) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={`w-full text-left px-4 py-2 rounded-xl text-sm transition ${
            active ? 'bg-[#FAFAFA]' : ''
          } ${danger ? 'text-red-500' : 'text-gray-700'}`}
        >
          {label}
        </button>
      )}
    </Menu.Item>
  );
}
