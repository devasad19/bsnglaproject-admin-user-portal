"use client";
import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { relative_image_path } from "@/helper";
import Link from "next/link";
import Accordion from "@/app/_components/Accordion/Accordion";
import { usePathname } from "next/navigation";
import { MyContext } from "@/ContextProvider/ContextProvider";
import { useHomeContext } from "@/ContextProvider/Home.Context";
const Sidebar = () => {
  const pathname = usePathname();
  // const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const {user}= useHomeContext();


  // useEffect(() => {
  //   const userCookie = document.cookie.split(';').find(c => c.trim().startsWith('user='));
  //   if (userCookie != undefined) {
  //     setUser(JSON.parse(decodeURIComponent(userCookie.split('=')[1])));
  //   }
  // }, []);


  const HandleLogout = () => {
    document.cookie = "token=; path=/; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "user=; path=/; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    // window.location.href='http://localhost:3000/signin';
    window.location.href='https://service.bangla.gov.bd/signin';
  }

  // console.log('user cookie: ',process.env.NEXT_PUBLIC_PORTAL_URL);
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
                loading="eager"
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
              className={`[&>li]:text-slate-900   [&>li]:rounded-md [&>li]:transition-all [&>li]:duration-500 [&>*]:text-12 flex flex-col gap-2 w-full ${isOpen ? "[&>li]:px-3 [&>li]:py-2" : "[&>li]:py-1"
                }`}
            >
              <li
                className={`hover:bg-primary group ${pathname == "/user" ? "bg-primary" : ""
                  }`}
              >
                <Link
                  href={{
                    pathname: "/user",
                  }}
                  shallow
                  title="Dashboard"
                  className={`flex items-center gap-2 group-hover:text-white ${pathname == "/user" ? "text-white" : "text-primary"
                    }`}
                >
                  <span>
                    <svg
                      className="w-5 h-5 fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21.3333 0H2.66667C1.18667 0 0 1.2 0 2.66667V21.3333C0 22.8 1.18667 24 2.66667 24H21.3333C22.8 24 24 22.8 24 21.3333V2.66667C24 1.2 22.8133 0 21.3333 0ZM21.3333 21.3333H2.66667V5.33333H21.3333V21.3333ZM18.6667 12H5.33333V9.33333H18.6667V12ZM13.3333 17.3333H5.33333V14.6667H13.3333V17.3333Z" />
                    </svg>
                  </span>
                  <span className={isOpen ? "block" : "hidden"}>Dashboard</span>
                </Link>
              </li>
              {/* <li
                className={`hover:bg-primary group ${
                  pathname.includes("usage") ? "bg-primary" : ""
                }`}
              >
                <Link
                  href={{
                    pathname: "/user/usage",
                  }}
                  title="Usage"
                  shallow
                  className={`flex items-center gap-2 group-hover:text-white ${
                    pathname.includes("usage") ? "text-white" : "text-primary"
                  }`}
                >
                  <span>
                    <svg
                      className="w-5 h-5 fill-current"
                      width="22"
                      height="24"
                      viewBox="0 0 22 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19.1909 0H2.74156C1.22685 0 0 1.074 0 2.4V21.6C0 22.926 1.22685 24 2.74156 24H19.1909C20.7056 24 21.9325 22.926 21.9325 21.6V2.4C21.9325 1.074 20.7056 0 19.1909 0ZM2.74156 2.4H9.59546V12L6.16851 10.2L2.74156 12V2.4Z" />
                    </svg>
                  </span>
                  <span className={isOpen ? "block" : "hidden"}>
                    Usage history
                  </span>
                </Link>
              </li> */}
              {/* <li
                className={`hover:bg-primary group ${
                  pathname.includes("/user/services") ? "bg-primary" : ""
                }`}
              >
                <Link
                  href={{
                    pathname: "/user/services",
                  }}
                  shallow
                  title="Services"
                  className={`flex items-center gap-2 group-hover:text-white ${
                    pathname.includes("/services")
                      ? "text-white"
                      : "text-primary"
                  }`}
                >
                  <span>
                    <svg
                      className="w-5 h-5 fill-current"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M25.6616 16.4683C25.027 16.093 24.2324 16.0324 23.5233 16.3468C23.5233 16.3468 23.5206 16.3497 23.5095 16.3524C23.5068 16.3551 23.5012 16.3551 23.4985 16.3579C23.5012 16.3579 23.4985 16.3579 23.4902 16.3607L23.4846 16.3634L23.4819 16.3661C23.4709 16.3689 23.4598 16.3744 23.4461 16.3799C23.1867 16.4958 22.1741 16.9455 18.7309 18.4685V18.463C17.9584 17.3677 16.5982 18.176 14.7552 18.336C11.8969 16.8711 9.19856 15.4364 6.23816 15.5274V21.3903H6.72927L12.8763 23.8182C13.8806 24.2155 15.0201 24.1135 15.9416 23.5479L25.6671 17.5471C26.0671 17.2987 26.0699 16.7083 25.6616 16.4683ZM5.11143 14.8054H4.61804V14.4363C4.61804 14.1479 4.38424 13.9141 4.09575 13.9141H0.555488C0.267 13.9141 0.0332031 14.1479 0.0332031 14.4363V22.8022C0.0332031 23.0906 0.267 23.3244 0.555488 23.3244H4.09575C4.38424 23.3244 4.61804 23.0906 4.61804 22.8022V22.4331H5.11143C5.42947 22.4331 5.68729 22.1752 5.68729 21.8572V15.3813C5.68734 15.0633 5.42947 14.8054 5.11143 14.8054ZM3.02036 22.5234C2.6654 22.5234 2.37463 22.2326 2.37463 21.8777C2.37463 21.5228 2.6654 21.232 3.02036 21.232C3.37527 21.232 3.66604 21.5228 3.66604 21.8777C3.66604 22.2326 3.37527 22.5234 3.02036 22.5234Z" />
                      <path d="M9.82582 9.92423L10.929 10.0511C11.0614 10.6248 11.2876 11.1764 11.602 11.6729L10.9069 12.5444C10.7249 12.7761 10.747 13.1016 10.9511 13.3057L11.7123 14.0669C11.9164 14.271 12.2418 14.293 12.4735 14.111L13.3451 13.416C13.8415 13.7304 14.3931 13.9566 14.9668 14.0889L15.0937 15.1922C15.1801 15.9558 16.1825 15.626 16.732 15.6996C17.0243 15.6996 17.267 15.4845 17.3002 15.1922L17.427 14.0889C18.0007 13.9566 18.5523 13.7303 19.0488 13.4159L19.9203 14.111C20.152 14.293 20.4774 14.271 20.6815 14.0669L21.4427 13.3057C21.6468 13.1016 21.6689 12.7761 21.4869 12.5444L20.7919 11.6728C21.1063 11.1764 21.3324 10.6248 21.4648 10.0511L22.5681 9.92423C22.8604 9.89117 23.0755 9.64849 23.0755 9.35604V8.28592C23.0755 7.99358 22.8604 7.75089 22.5681 7.71773L21.4648 7.59083C21.3324 7.01721 21.1063 6.46552 20.7919 5.96913L21.4869 5.09757C21.6689 4.86591 21.6469 4.54045 21.4427 4.33636L20.6815 3.57515C20.4774 3.37106 20.152 3.34897 19.9203 3.53102L19.0488 4.22602C18.5523 3.91158 18.0007 3.68545 17.427 3.55311L17.3002 2.44984C17.267 2.15744 17.0244 1.94238 16.732 1.94238H15.6619C15.3695 1.94238 15.1268 2.15754 15.0937 2.44984L14.9668 3.55311C14.3931 3.68545 13.8415 3.91158 13.3451 4.22602L12.4735 3.53102C12.2418 3.34902 11.9164 3.37111 11.7123 3.5752L10.9511 4.33641C10.747 4.5405 10.7249 4.86591 10.9069 5.09762L11.602 5.96913C11.2876 6.46562 11.0614 7.01721 10.929 7.59093L9.82582 7.71784C9.53347 7.75089 9.31836 7.99368 9.31836 8.28603V9.35614C9.31836 9.64849 9.53347 9.89117 9.82582 9.92423ZM14.4218 7.05148C15.402 6.07135 16.9873 6.07135 17.9674 7.05148C18.9409 8.02501 18.9409 9.6169 17.9674 10.5905C16.9873 11.5706 15.402 11.5706 14.4218 10.5905C13.4417 9.61695 13.4417 8.02501 14.4218 7.05148Z" />
                    </svg>
                  </span>
                  <span className={isOpen ? "block" : "hidden"}>Services</span>
                </Link>
              </li> */}
              <li
                className={`hover:bg-primary group ${pathname.includes("comment") ? "bg-primary" : ""
                  }`}
              >
                <Link
                  href={{
                    pathname: "/user/comment",
                  }}
                  shallow
                  title="Comment"
                  className={`flex items-center gap-2 group-hover:text-white ${pathname.includes("comment") ? "text-white" : "text-primary"
                    }`}
                >
                  <span>
                    <svg
                      className="w-5 h-5 fill-current"
                      width="24"
                      height="22"
                      viewBox="0 0 24 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 0.5C5.37188 0.5 0 4.86406 0 10.25C0 12.575 1.00313 14.7031 2.67188 16.3766C2.08594 18.7391 0.126563 20.8438 0.103125 20.8672C0 20.975 -0.028125 21.1344 0.0328125 21.275C0.09375 21.4156 0.225 21.5 0.375 21.5C3.48281 21.5 5.8125 20.0094 6.96563 19.0906C8.49844 19.6672 10.2 20 12 20C18.6281 20 24 15.6359 24 10.25C24 4.86406 18.6281 0.5 12 0.5ZM6 11.75C5.17031 11.75 4.5 11.0797 4.5 10.25C4.5 9.42031 5.17031 8.75 6 8.75C6.82969 8.75 7.5 9.42031 7.5 10.25C7.5 11.0797 6.82969 11.75 6 11.75ZM12 11.75C11.1703 11.75 10.5 11.0797 10.5 10.25C10.5 9.42031 11.1703 8.75 12 8.75C12.8297 8.75 13.5 9.42031 13.5 10.25C13.5 11.0797 12.8297 11.75 12 11.75ZM18 11.75C17.1703 11.75 16.5 11.0797 16.5 10.25C16.5 9.42031 17.1703 8.75 18 8.75C18.8297 8.75 19.5 9.42031 19.5 10.25C19.5 11.0797 18.8297 11.75 18 11.75Z" />
                    </svg>
                  </span>
                  <span className={isOpen ? "block" : "hidden"}>Service Feedback</span>
                </Link>
              </li>


              <li
                className={`group flex gap-2 ${pathname.includes("accounts-settings") ? "bg-primary" : ""
                  }`}
              >
                {isOpen && (
                  <Accordion
                    title="Accounts Settings"
                    active={pathname.includes("accounts-settings")}
                    icon={
                      <svg
                        className={`w-5 h-5 fill-current ${pathname.includes("accounts-settings")
                          ? "text-white"
                          : "text-primary"
                          }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                      </svg>
                    }
                  >
                    <div className="bg-[#E8F2EC] flex flex-col gap-2 p-1">
                      <Link
                        href={{
                          pathname: "/user/accounts-settings/purchase-services",
                        }}
                        shallow
                        className={`text-14 hover:bg-green-500 hover:text-white p-2 rounded ${pathname.includes("purchase-services")
                          ? "bg-green-500 text-white"
                          : ""}`}
                      >
                        Purchase Services
                      </Link>
                      <Link
                        href={{
                          pathname: "/user/accounts-settings/payment-history",
                        }}
                        shallow
                        className={`text-14 hover:bg-green-500 hover:text-white p-2 rounded ${pathname.includes("payment-history")
                          ? "bg-green-500 text-white"
                          : ""}`}
                      >
                        Payment History
                      </Link>
                    </div>
                  </Accordion>
                )}
              </li>

              <li
                className={`group flex gap-2 ${pathname.includes("profile-settings") ? "bg-primary" : ""
                  }`}
              >
                {isOpen && (
                  <Accordion
                    title="Profile Settings"
                    active={pathname.includes("profile-settings")}
                    icon={
                      <svg
                        className={`w-5 h-5 fill-current ${pathname.includes("profile-settings")
                          ? "text-white"
                          : "text-primary"
                          }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                      </svg>
                    }
                  >
                    <div className="bg-[#E8F2EC] flex flex-col gap-2 p-1">
                      <Link
                        href={{
                          pathname: "/user/profile-settings/manage-profile",
                        }}
                        shallow
                        className={`text-14 hover:bg-green-500 hover:text-white p-2 rounded ${pathname.includes("manage-profile")
                          ? "bg-green-500 text-white"
                          : ""}`}
                      >
                        Manage Profile
                      </Link>
                      <Link
                        href={{
                          pathname: "/user/profile-settings/change-password",
                        }}
                        shallow
                        className={`text-14 hover:bg-green-500 hover:text-white p-2 rounded ${pathname.includes("change-password")
                          ? "bg-green-500 text-white"
                          : ""}`}
                      >
                        Change Password
                      </Link>
                    </div>
                  </Accordion>
                )}
              </li>





              {/* <li
                className={`hover:bg-primary group flex gap-2 ${pathname.includes("profile-settings") ? "bg-primary" : ""
                  }`}
              >
                <span>
                  <svg
                    className={`w-5 h-5 fill-current group-hover:text-white ${pathname.includes("profile-settings")
                        ? "text-white"
                        : "text-primary"
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                  </svg>
                </span>
                {isOpen && (
                  <Accordion
                    title="Profile Settings"
                    active={pathname.includes("profile-settings")}
                  >
                    <div className="bg-white flex flex-col gap-2 p-1">
                      <Link
                        href={{
                          pathname: "/user/profile-settings/manage-profile",
                        }}
                        shallow
                        className="text-14 hover:text-primary"
                      >
                        Manage Profile
                      </Link>
                      <Link
                        href={{
                          pathname: "/user/profile-settings/change-password",
                        }}
                        shallow
                        className="text-14 hover:text-primary"
                      >
                        Change Password
                      </Link>
                    </div>
                  </Accordion>
                )}
              </li> */}



            </ul>
          </div>
        </div>
        <div className="bg-emerald-700 text-white p-4 flex items-center justify-between gap-4">
          {isOpen && (
            <div className="flex items-center gap-2">
              <Image
                className="w-10 h-10 rounded-md"
                src={user?.photo ? process.env.NEXT_PUBLIC_IMAGE_URL + user?.photo : relative_image_path('dummy_image1.jpg')}
                width={1000}
                height={1000}
                alt="Bangla"
              />
              <div>
                <h3> {user ? user?.name : ""} </h3>
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
