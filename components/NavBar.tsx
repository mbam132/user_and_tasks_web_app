import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
// import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
// import { SlLocationPin } from 'react-icons/sl';
// import DownArrow from '../assets/icons/downArrow.png';
import useUser from '../hooks/useUser';
import useAuth from '../hooks/useAuth';
import { IUserScope } from '../utils/types';

function NavBar() {
  const currentPage = usePathname();

  const router = useRouter();
  const { loggedIn, user } = useUser();
  const { logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
    router.push('/login');
  };

  return (
    <nav className="w-screen bg-primary-100 fixed top-0 py-6	h-navbar flex flex-row border-y-2 border-secondary-100">
      <div className="flex items-center ml-4 gap-x-3">
        {user?.authScope === IUserScope.SUPERUSER &&
          currentPage !== '/experimenting' && (
            <Link className="text-sm text-secondary-600" href="/experimenting">
              Experiment
            </Link>
          )}

        <Link className="text-sm text-secondary-100" href="/">
          Home
        </Link>

        {loggedIn && currentPage !== '/tasks-menu' && (
          <Link className="text-sm text-secondary-600" href="/tasks-menu">
            Tasks menu
          </Link>
        )}

        {!loggedIn && currentPage !== '/login' && (
          <Link className="text-sm text-secondary-100" href="/login">
            Login
          </Link>
        )}

        {!loggedIn && currentPage !== '/sign-up' && (
          <Link className="text-sm text-secondary-100" href="/sign-up">
            Sign up
          </Link>
        )}
      </div>
      <div className="flex items-center ml-auto mr-4 gap-1">
        {loggedIn && (
          <button
            type="button"
            className="text-sm text-secondary-100"
            onClick={handleLogOut}
          >
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
