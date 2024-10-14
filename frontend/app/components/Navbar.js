"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FlagIcon } from "react-flag-kit";
import axios from "axios";

export default function Header() {
  const [menuItems, setMenuItems] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [language, setLanguage] = useState("es");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/menu-items?locale=${language}&populate=*`
        );
        setMenuItems(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching menu items from Strapi: ", error);
      }
    };

    fetchMenuItems();
  }, [language]);

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Grupo de Investigación</span>
            <img
              className="h-8 w-auto"
              src="/placeholder.svg?height=32&width=32"
              alt="Logo"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú principal</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {Array.isArray(menuItems) &&
            menuItems.length > 0 &&
            menuItems.map((item, index) => {
              if (!item) return null;

              if (index === 0) {
                // La opción de Inicio no debe tener submenú
                return (
                  <a
                    key={item.id}
                    href={item.href || "#"}
                    className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:bg-indigo-500 hover:text-white p-2 rounded-md transition"
                  >
                    {item.name || ""}
                  </a>
                );
              }

              return (
                <div key={item.id} className="relative">
                  {item.buttonStyle ? (
                    <a
                      href={item.href || "#"}
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center gap-2"
                    >
                      <FontAwesomeIcon
                        icon={faSignInAlt}
                        className="text-white"
                      />
                      {item.name || ""}
                    </a>
                  ) : (
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:bg-indigo-500 hover:text-white p-2 rounded-md transition"
                    >
                      {item.name || ""}
                      {item.sub_menu_items?.length > 0 && (
                        <ChevronDown
                          className={`ml-2 h-5 w-5 transition-transform ${
                            openSubmenu === index ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}
                  {item.sub_menu_items && openSubmenu === index && (
                    <div className="absolute left-0 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                      <div className="p-4">
                        {item.sub_menu_items.map((subItem) => {
                          if (!subItem) return null;

                          return (
                            <div
                              key={subItem.id}
                              className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                            >
                              <div className="flex-auto">
                                <a
                                  href={subItem.href || "#"}
                                  className="block font-semibold text-gray-900"
                                >
                                  {subItem.name || ""}
                                  <span className="absolute inset-0" />
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          <button
            onClick={toggleLanguage}
            className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:bg-indigo-500 hover:text-white p-2 rounded-md transition"
          >
            <FlagIcon code={language === "es" ? "ES" : "US"} size={24} />
            <span className="ml-2">
              {language === "es" ? "Español" : "English"}
            </span>
          </button>
        </div>
      </nav>
      <div
        className={`lg:hidden ${mobileMenuOpen ? "" : "hidden"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Grupo de Investigación</span>
              <img
                className="h-8 w-auto"
                src="/placeholder.svg?height=32&width=32"
                alt="Logo"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Cerrar menú</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {Array.isArray(menuItems) &&
                  menuItems.length > 0 &&
                  menuItems.map((item, index) => {
                    if (!item) return null;

                    if (index === 0) {
                      // La opción de Inicio no debe tener submenú
                      return (
                        <a
                          key={item.id}
                          href={item.href || "#"}
                          className="block rounded-md text-base font-semibold leading-7 text-gray-900 hover:bg-indigo-500 hover:text-white p-2 transition"
                        >
                          {item.name || ""}
                        </a>
                      );
                    }

                    return (
                      <div key={item.id} className="-mx-3">
                        {item.buttonStyle ? (
                          <a
                            href={item.href || "#"}
                            className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center gap-2"
                          >
                            <FontAwesomeIcon
                              icon={faSignInAlt}
                              className="text-white"
                            />
                            {item.name || ""}
                          </a>
                        ) : (
                          <button
                            onClick={() => toggleSubmenu(index)}
                            className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-indigo-500 hover:text-white p-2 transition"
                          >
                            {item.name || ""}
                            {item.sub_menu_items?.length > 0 && (
                              <ChevronDown
                                className={`h-5 w-5 flex-none transition-transform ${
                                  openSubmenu === index ? "rotate-180" : ""
                                }`}
                                aria-hidden="true"
                              />
                            )}
                          </button>
                        )}
                        {item.sub_menu_items && openSubmenu === index && (
                          <div className="mt-2 space-y-2">
                            {item.sub_menu_items.map((subItem) => {
                              if (!subItem) return null;

                              return (
                                <a
                                  key={subItem.id}
                                  href={subItem.href || "#"}
                                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                  {subItem.name || ""}
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                <div className="-mx-3 mt-4">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center text-base font-semibold leading-7 text-gray-900 hover:bg-indigo-500 hover:text-white p-2 rounded-md transition w-full"
                  >
                    <FlagIcon
                      code={language === "es" ? "ES" : "US"}
                      size={24}
                    />
                    <span className="ml-2">
                      {language === "es" ? "Español" : "English"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
