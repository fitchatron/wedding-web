"use client";
import { useState } from "react";
import { env } from "@/env";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import PrimaryDesktopLink from "@components/navigation/PrimaryDesktopLink";
import PrimaryMobileLink from "@components/navigation/PrimaryMobileLink";
import SecondaryLink from "@components/navigation/SecondaryLink";
import BaseInput from "../inputs/BaseInput";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  logoAsHomePage: boolean;
  logoSrc?: string;
};

export default function Navbar({ logoAsHomePage, logoSrc }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [secondaryMenuOpen, setSecondaryMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const SEARCH_TERM_PARAM_KEY = "search_text";
  const [searchText, setSearchText] = useState<string>(
    searchParams.get(SEARCH_TERM_PARAM_KEY)?.toString() ?? "",
  );
  const [isDark, setIsDark] = useState(false);

  const primaryLinks = [
    {
      name: "register-details",
      label: "Register Details",
      path: "/register-details",
      permission_id: undefined,
    },
    {
      name: "news",
      label: "News",
      path: "/news",
      permission_id: undefined,
    },
  ];

  const secondaryLinks = [
    {
      name: "profile",
      label: "Your Profile",
      path: "/profile",
      icon: MagnifyingGlassCircleIcon,
      permission_id: undefined,
    },
    {
      name: "settings",
      label: "Settings",
      path: "/settings",
      icon: undefined,
      permission_id: undefined,
    },
    {
      name: "admin",
      label: "Admin",
      path: "/admin",
      icon: undefined,
      permission_id: undefined,
    },
  ];

  const darkModeButtonText = isDark
    ? "Activate Light Mode"
    : "Activate Dark Mode";
  const photoUrl: string | undefined = undefined;

  function toggleMobileMenuOpen() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  function toggleSecondaryMenuOpen() {
    setSecondaryMenuOpen(!secondaryMenuOpen);
  }

  function toggleDarkMode() {
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
  }

  function handleSignOut() {
    console.log("sign out");
  }

  function handleSearchTextChange(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value && value.length > 0) {
      params.set(SEARCH_TERM_PARAM_KEY, value);
    } else {
      params.delete(SEARCH_TERM_PARAM_KEY);
    }
    router.replace(`${pathname}?${params.toString()}`);
    setSearchText(value);
  }

  return (
    <nav className="border-b border-gray-800 bg-white dark:border-slate-100 dark:bg-slate-900">
      <div className="mx-auto max-w-[1720px] px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={toggleMobileMenuOpen}
              className="relative inline-flex items-center justify-center rounded p-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-slate-100"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. Menu open: "hidden", Menu closed: "block" */}
              {mobileMenuOpen ? (
                // Icon when menu is open. Menu open: "block", Menu closed: "hidden"
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Icon when menu is closed
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex h-full flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" title="Home">
                <span className="sr-only">Navigate home</span>
                {logoAsHomePage && logoSrc ? (
                  <img
                    className="h-10 w-auto md:h-12"
                    src={logoSrc}
                    alt={env.NEXT_PUBLIC_PRODUCT_NAME}
                  />
                ) : (
                  <div className="h-full font-bold text-gray-800 dark:text-slate-100">
                    {env.NEXT_PUBLIC_PRODUCT_NAME}
                  </div>
                )}
              </Link>
            </div>
            <div
              className="hidden sm:ml-6 sm:block"
              v-if="userStore.isAuthenticated"
            >
              <div className="flex h-full items-center gap-4">
                {primaryLinks.map((link, index) => (
                  <PrimaryDesktopLink
                    key={index}
                    href={link.path}
                    label={link.label}
                    isActive={false}
                  />
                ))}

                <div className="relative hidden md:block">
                  <BaseInput
                    id="site_search"
                    defaultValue={searchText}
                    placeholder="Search the site"
                    onChange={handleSearchTextChange}
                    showLeadingIcon={true}
                    showClearButton={true}
                    type={"text"}
                    delay={700}
                  />
                </div>
              </div>
            </div>
          </div>

          {isAuthenticated && (
            <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 md:space-x-2">
              <button
                type="button"
                title="View notifications"
                className="relative rounded-full p-2 text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-0 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus:ring-indigo-500"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              <button
                type="button"
                title="darkmode"
                onClick={toggleDarkMode}
                className="relative rounded-full p-2 text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-0 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus:ring-indigo-500"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">{darkModeButtonText}</span>
                {isDark && (
                  <svg
                    className="h-5 w-5 md:h-6 md:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                )}

                {!isDark && (
                  <svg
                    className="h-5 w-5 md:h-6 md:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                )}
              </button>

              {/* Profile dropdown */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    onClick={toggleSecondaryMenuOpen}
                    disabled={!isAuthenticated}
                    className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-600"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    {photoUrl ? (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={photoUrl}
                        alt="Profile photo"
                      />
                    ) : (
                      <UserCircleIcon className="h-8 w-8 text-gray-800 dark:text-slate-100" />
                    )}
                  </button>
                </div>
                {secondaryMenuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded bg-white pt-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    {secondaryLinks.map((link, index) => (
                      <SecondaryLink
                        key={index}
                        href={link.path}
                        label={link.label}
                        index={index}
                        Icon={link.icon}
                      />
                    ))}
                    <button
                      id="user-menu-item-sign-out"
                      className="block w-full rounded-b-md bg-red-300 px-4 py-2 text-left text-sm text-red-900 hover:bg-red-500 hover:text-white"
                      type="button"
                      onClick={handleSignOut}
                      title="Sign out"
                      role="menuitem"
                      tabIndex={-1}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div>
              <UserCircleIcon
                title="Sign in to continue"
                className="h-10 w-10 text-gray-800 dark:text-slate-100"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <div className="py-2">
              {/* <base-input id="site_search_mobile" :model-value="searchText" placeholder="Search the site"
            @update:model-value="handleSearchTextChange" :debounce-in-ms="700" :show-leading-icon="true"
            :show-clear-button="true" /> */}
            </div>
            {primaryLinks.map((link, index) => (
              <PrimaryMobileLink
                key={index}
                href={link.path}
                label={link.label}
                isActive={false}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
