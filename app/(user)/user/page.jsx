export const revalidate = 3600;

import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const BarChart = dynamic(() =>
  import("@/app/_components/Chart/BarChart/BarChart")
);
const LineChart = dynamic(() =>
  import("@/app/_components/Chart/LineChart/LineChart")
);
import { getDashboardStats } from "../_api";
import Link from "next/link";
import UserDashboard from "../component/UserDashboard/UserDashboard";

const Home = async () => {
  let user;
  const userinfo = cookies().get("user");
  if (!userinfo) {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  } else {
    user = typeof userinfo !== "undefined" ? JSON.parse(userinfo?.value) : "";
  }
  const stats = await getDashboardStats(user?.id)
    .then((res) => res?.data)
    .catch((err) => console.log(err));

  return (
    <>
    <UserDashboard stats={stats} />
    </>
  );
};

export default Home;

// export const revalidate = 3600;

// import dynamic from "next/dynamic";
// import { cookies } from "next/headers";
// const BarChart = dynamic(() => import("@/app/_components/Chart/BarChart/BarChart"));
// const LineChart = dynamic(() => import("@/app/_components/Chart/LineChart/LineChart"));
// import { getDashboardStats } from "../_api";
// import Link from "next/link";

// const Home = async () => {
//   let user;
//   const userinfo = cookies().get("user");
//   if (!userinfo) {
//     typeof window != undefined ? window.location.href = "/" : " ";
//   } else {
//     user = typeof userinfo != undefined ? JSON.parse(userinfo?.value) : '';
//   }
//   const stats = await getDashboardStats(user?.id).then((res) => res?.data).catch((err) => console.log(err));

//   return (
//     <section>
//       <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
//         Dashboard
//       </h3>
//       <div>
//         <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row pb-5">
//           <div className="w-full lg:w-[60%]">
//             <p className="pb-1 text-18 font-bold">Stats</p>
//             <div className="flex flex-wrap gap-4">
//               <Link href={{
//                 pathname: "/user/accounts-settings/purchase-services"
//               }} shallow className="bg-[#DCFCE7] p-4 w-full lg:w-[48%]">
//                 <div className="flex justify-between">
//                   <svg
//                     className="fill-white bg-[#3CD856] w-8 h-8 p-1 rounded-full"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 512 512"
//                   >
//                     <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
//                   </svg>
//                   <p className="text-[#151D48] text-16 font-medium">
//                     Active Services
//                   </p>
//                 </div>
//                 <p className="text-center text-24 font-bold text-[#151D48]">
//                   {stats?.activeServices}
//                 </p>
//               </Link>
//               <Link href={{
//                 pathname: "/user/accounts-settings/payment-history"
//               }} shallow className="bg-blue-100 p-4 w-full lg:w-[48%]">
//                 <div className="flex justify-between">
//                   <svg
//                     className="fill-white bg-blue-400 w-8 h-8 p-1 rounded-full"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 512 512"
//                   >
//                     <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
//                   </svg>
//                   <p className="text-[#151D48] text-16 font-medium">
//                     Total Payments
//                   </p>
//                 </div>
//                 <p className="text-center text-24 font-bold text-[#151D48]">
//                   {stats?.totalPayments}
//                 </p>
//               </Link>
//               <Link href={{
//                 pathname: "/user/comment"
//               }} shallow className="bg-fuchsia-100 p-4 w-full lg:w-[48%]">
//                 <div className="flex justify-between">
//                   <svg
//                     className="fill-white bg-fuchsia-400 w-8 h-8 p-1 rounded-full"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 576 512"
//                   >
//                     <path d="M7.8 207.7c-13.1-17.8-9.3-42.8 8.5-55.9L142.9 58.5C166.2 41.3 194.5 32 223.5 32H384 544c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H507.2l-44.9 36c-22.7 18.2-50.9 28-80 28H304 288 224c-17.7 0-32-14.3-32-32s14.3-32 32-32h64 16c8.8 0 16-7.2 16-16s-7.2-16-16-16H183.4L63.7 216.2c-17.8 13.1-42.8 9.3-55.9-8.5zM382.4 160l0 0 .9 0c-.3 0-.6 0-.9 0zM568.2 304.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 453.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V384c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 352l0 0-.9 0c.3 0 .6 0 .9 0z" />
//                   </svg>
//                   <p className="text-[#151D48] text-16 font-medium">
//                     Total Feedbacks
//                   </p>
//                 </div>
//                 <p className="text-center text-24 font-bold text-[#151D48]">
//                   {stats?.feedbacks}
//                 </p>
//               </Link>
//             </div>
//           </div>
//           <div className="w-full lg:w-[40%]">
//             <p className="pb-1 text-18 font-bold">Monthly Usage</p>
//             <BarChart />
//           </div>
//         </div>
//         <div>
//           <p className="pb-1 text-18 font-bold">Monthly Usage</p>
//           <LineChart />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Home;
