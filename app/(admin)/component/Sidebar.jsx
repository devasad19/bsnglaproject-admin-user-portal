"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { relative_image_path } from "@/helper";
import Link from "next/link";
import Accordion from "@/app/_components/Accordion/Accordion";
import { usePathname } from "next/navigation";
import { NewAccordion } from "@/app/_components/NewAccordion/NewAccordion";
import { GrUserSettings } from "react-icons/gr";
import { FaUsersCog } from "react-icons/fa";
import { BsPcDisplayHorizontal } from "react-icons/bs";
import { VscFeedback } from "react-icons/vsc";
import { BsPcDisplay } from "react-icons/bs";
import { FaChalkboardUser } from "react-icons/fa6";
import { GrDocumentUser } from "react-icons/gr";
import { FaComputer } from "react-icons/fa6";


const Sidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const [isToggleOpen, setIsToggleOpen] = useState({
    setting: false,
    alc: false,
    accountsSettings: false,
  });

  const toggleAccordionSub = (valueName1) => {
    setIsToggleOpen((prevIsToggleOpen) => {
      if (valueName1 === "setting") {
        return {
          setting: !prevIsToggleOpen.setting,
          alc: false,
          accountsSettings: false,
          // Close the other accordion
        };
      }
      if (valueName1 === "alc") {
        return {
          setting: false, // Close the other accordion
          accountsSettings: false,
          alc: !prevIsToggleOpen.alc,
        };
      }
      if (valueName1 === "accounts-settings") {
        return {
          setting: false, // Close the other accordion
          alc: false, // Close the other accordion
          accountsSettings: !prevIsToggleOpen.accountsSettings,
        };
      }
      return prevIsToggleOpen; // Default case if neither match
    });
  };


  useEffect(() => {
    const userCookie = document.cookie.split(';').find(c => c.trim().startsWith('user='));
    if (userCookie != undefined) {
      setUser(JSON.parse(decodeURIComponent(userCookie.split('=')[1])));
    }
  }, []);


  const HandleLogout = () => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href=process.env.NEXT_PUBLIC_PORTAL_URL+'/signin';
  }

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">
        <div
          className={`p-4 bg-white transition-all duration-500  ${isOpen ? "w-60" : "w-12"
            }`}
        >
          <div className="flex flex-col items-center">
            <div
              className={`w-full flex items-center pb-5 ${isOpen ? "justify-between" : "justify-end"
                }`}
            >
              <Image
                className={`w-24 transition-all duration-500 ${isOpen ? "opacity-100 block" : "opacity-0 hidden"
                  }`}
                src={relative_image_path("logo.png")}
                width={1000}
                height={1000}
                alt="Bangla"
              />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-green-950"
              >
                {isOpen ? (
                  <svg
                    className="fill-current w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                  </svg>
                ) : (
                  <svg
                    className="fill-current w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                  </svg>
                )}
              </button>
            </div>
            <ul
              className={`[&>li]:text-slate-900  [&>li]:py-2 w-11/12 [&>li]:rounded-md [&>li]:transition-all [&>li]:duration-500 [&>li]:text-14 [&>li>a]:text-14 flex flex-col gap-2 ${isOpen ? "[&>li]:px-3" : ""
                }`}
            >
              <li
                className={`hover:bg-primary group ${pathname == "/admin" ? "bg-primary" : ""
                  }`}
              >
                <Link
                  href={{
                    pathname: "/admin",
                  }}
                  shallow
                  title="Dashboard"
                  className={`flex items-center gap-2 group-hover:text-white ${pathname == "/admin" ? "text-white" : "text-primary"
                    }`}
                >
                  <span>
                    <svg
                      className="w-5 h-5 fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21.3333 0H2.66667C1.18667 0 0 1.2 0 2.66667V21.3333C0 22.8 1.18667 24 2.66667 24H21.3333C22.8 24 24 22.8 24 21.3333V2.66667C24 1.2 22.8133 0 21.3333 0ZM21.3333 21.3333H2.66667V5.33333H21.3333V21.3333ZM18.6667 12H5.33333V9.33333H18.6667V12ZM13.3333 17.3333H5.33333V14.6667H13.3333V17.3333Z" />
                    </svg>
                  </span>
                  <span className={isOpen ? "block" : "hidden"}>Dashboard</span>
                </Link>
              </li>
              <li
                className={`hover:bg-primary group ${pathname === "/admin/services" ||
                    pathname === "/admin/services/create" ||
                    /^\/admin\/services\/\d+$/.test(pathname)
                    ? "bg-primary"
                    : ""
                  }`}
              >
                <Link
                  href={{
                    pathname: "/admin/services",
                  }}
                  shallow
                  title="Show All Services"
                  // className="flex items-center gap-2"
                  className={`flex items-center gap-2 group-hover:text-white ${pathname == "/admin/services" ||
                      pathname == "/admin/services/create" ||
                      /^\/admin\/services\/\d+$/.test(pathname)
                      ? "text-white"
                      : "text-primary"
                    }`}
                >
                  <span>
                    <svg
                      className="w-5 h-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z" />
                    </svg>
                  </span>
                  <span className={isOpen ? "block" : "hidden"}>
                    Manage Services
                  </span>
                </Link>
              </li>

              <li
                className={`hover:bg-primary group ${pathname == "/admin/user" ? "bg-primary" : ""
                  }`}
              >
                <Link
                  href={{
                    pathname: "/admin/user",
                  }}
                  shallow
                  title="User"
                  className={`flex items-center gap-2 group-hover:text-white ${pathname == "/admin/user" ? "text-white" : "text-primary"
                    }`}
                >
                  <GrUserSettings size={20} className="fill-current" />
                  <span className={isOpen ? "block" : "hidden"}>
                    Manage System Users
                  </span>
                </Link>
              </li>
              <li
                className={`hover:bg-primary group ${pathname == "/admin/manage-citizen" ? "bg-primary" : ""
                  }`}
              >
                <Link
                  href={{
                    pathname: "/admin/manage-citizen",
                  }}
                  shallow
                  title="Manage Citizen"
                  className={`flex items-center gap-2 group-hover:text-white ${pathname == "/admin/manage-citizen"
                      ? "text-white"
                      : "text-primary"
                    }`}
                >
                  <FaUsersCog size={20} className="fill-current" />
                  <span className={isOpen ? "block" : "hidden"}>
                    Manage Citizens
                  </span>
                </Link>
              </li>
              <li
                onClick={() => toggleAccordionSub("setting")}
                className={`hover:bg-primary  group flex items-center justify-between   ${pathname.includes("/admin/setting") && "bg-primary"
                  } cursor-pointer ${isToggleOpen.setting ? "border-b-2 border-primary" : ""
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="">
                    <svg
                      className={`w-5 h-5 fill-current text-primary group-hover:text-white transition-colors duration-300
                      ${pathname.includes("/admin/setting") && "text-white"}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                    </svg>
                  </span>

                  <span
                    className={`text-15 text-primary group-hover:text-white  ${isOpen ? "block" : "hidden"
                      } ${pathname.includes("/admin/setting") && "text-white"}`}
                  >
                    Portal Settings
                  </span>
                </div>

                <span
                  className={`transition-transform duration-300 ${isOpen ? "block" : "hidden"
                    } ${isToggleOpen.setting ? "rotate-180" : ""}`}
                >
                  <svg
                    className={`w-3 h-3 fill-current text-primary group-hover:text-white transition-colors duration-300 ${pathname.includes("/admin/setting") && "text-white"
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </span>
              </li>
              {isOpen && (
                <NewAccordion isOpen={isToggleOpen.setting}>
                  <div className="ms-3 flex flex-col gap-1">
                    <Link
                      href={{
                        pathname: "/admin/setting/frontend-setting",
                      }}
                      shallow
                      className={`text-14 hover:bg-green-500 px-2 py-1 rounded hover:text-white ${pathname.includes("/admin/setting/frontend-setting")
                          ? "bg-green-500 text-white font-semibold"
                          : "text-black"
                        }`}
                    >
                      General Portal Settings
                    </Link>
                    <Link
                      href={{
                        pathname: "/admin/setting/sidebar-links",
                      }}
                      shallow
                      className={`text-14 hover:bg-green-500 px-2 py-1 rounded hover:text-white ${pathname.includes("/admin/setting/sidebar-links")
                          ? "bg-green-500 text-white font-semibold"
                          : "text-black"
                        }`}
                    >
                      Hamburger Menu
                    </Link>
                    <Link
                      href={{
                        pathname: "/admin/setting/footer-content",
                      }}
                      shallow
                      className={`text-14 hover:bg-green-500 px-2 py-1 rounded hover:text-white ${pathname.includes("/admin/setting/footer-content")
                          ? "bg-green-500 text-white font-semibold"
                          : "text-black"
                        }`}
                    >
                      Manage Footer Content
                    </Link>
                    <Link
                      href={{
                        pathname: "/admin/setting/hero-section",
                      }}
                      shallow
                      className={`text-14 hover:bg-green-500 px-2 py-1 rounded hover:text-white ${pathname.includes("/admin/setting/hero-section")
                          ? "bg-green-500 text-white font-semibold"
                          : "text-black"
                        }`}
                    >
                      Banner Right Section
                    </Link>
                  </div>
                </NewAccordion>
              )}
              <li
                onClick={() => toggleAccordionSub("accounts-settings")}
                className={`hover:bg-primary  group flex items-center  justify-between ${pathname.includes("/admin/accounts-settings") && "bg-primary"
                  } cursor-pointer ${isToggleOpen.accountsSettings
                    ? "border-b-2 border-primary"
                    : ""
                  }`}
              >
                <div className="flex items-center gap-2">
                  <FaComputer size={20} className="fill-current" />

                  <span
                    className={`text-15 text-primary group-hover:text-white  ${isOpen ? "block" : "hidden"
                      } ${pathname.includes("/admin/accounts-settings") &&
                      "text-white"
                      }`}
                  >
                    Manage Sales
                  </span>
                </div>

                <span
                  className={`transition-transform duration-300 ${isOpen ? "block" : "hidden"
                    } ${isToggleOpen.accountsSettings ? "rotate-180" : ""}`}
                >
                  <svg
                    className={`w-3 h-3 fill-current text-primary group-hover:text-white transition-colors duration-300 ${pathname.includes("/admin/accounts-settings") &&
                      "text-white"
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </span>
              </li>
              {isOpen && (



                <NewAccordion isOpen={isToggleOpen.accountsSettings}>


                  <div className="ms-3 flex flex-col gap-2 p-1">

                    <Link
                      href={{
                        pathname: "/admin/accounts-settings/purchase-services",
                      }}
                      shallow
                      className={`text-14 hover:bg-green-500 px-2 py-1 rounded hover:text-white ${pathname.includes("/admin/accounts-settings/purchase-services")
                          ? "bg-green-500 text-white font-semibold"
                          : "text-black"
                        }`}
                    >
                      Sold Services
                    </Link>
                    <Link
                      href={{
                        pathname: "/admin/bill",
                      }}
                      shallow
                      className={`text-14 hover:bg-green-500 px-2 py-1 rounded hover:text-white ${pathname.includes("/admin/bill")
                          ? "bg-green-500 text-white font-semibold"
                          : "text-black"
                        }`}
                    >
                      Citizen Payments List
                    </Link>

                  </div>
                </NewAccordion>


              )}

              <li
                className={`hover:bg-primary group ${pathname == "/admin/user-feedbacks" ? "bg-primary" : ""
                  }`}
              >
                <Link
                  href={{
                    pathname: "/admin/user-feedbacks",
                  }}
                  shallow
                  title="User Feedbacks"
                  className={`flex items-center gap-2 group-hover:text-white ${pathname == "/admin/user-feedbacks"
                      ? "text-white"
                      : "text-primary"
                    }`}
                >
                  <VscFeedback size={20} className="fill-current" />
                  <span className={isOpen ? "block" : "hidden"}>
                    User Feedbacks
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-emerald-700 text-white p-4 flex items-center justify-between gap-4">
          {isOpen && (
            <div className="flex items-center gap-2">
              <Image
                className="w-10 h-10 rounded-md"
                src={relative_image_path("dummy_image1.jpg")}
                width={1000}
                height={1000}
                alt="Bangla"
              />
              <div>
                <h3>{user ? user?.name : ""}</h3>
                <p className="text-12">{user ? user?.type : ""}</p>
              </div>
            </div>
          )}
          <button onClick={HandleLogout} title="Logout">
            <svg
              className="w-5 h-5 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
