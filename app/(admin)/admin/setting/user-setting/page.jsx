export const revalidate = 3600;

import { relative_image_path } from "@/helper";
import Image from "next/image";

const Home = async () => {
  return (
    <section>
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <div className="flex flex-col lg:flex-row justify-between pb-5">
          <div className="flex gap-4 pb-5 lg:pb-0">
            <button className="px-2 py-1 lg:px-4 lg:py-2 bg-[#E1F6F9] text-black active:scale-90 transition-all duration-400 rounded-md">
              All Users
            </button>
            <button className="px-2 py-1 lg:px-4 lg:py-2  text-black active:scale-90 transition-all duration-400 rounded-md">
              Admin
            </button>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <form className="bg-white rounded-md shadow-md text-[#515151] flex items-center gap-2 px-2 py-1 lg:py-0">
              <label htmlFor="userSearch">
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </label>
              <input
                id="userSearch"
                type="text"
                placeholder="Search for your keyword"
                className="outline-none"
              />
            </form>
            <button className="px-2 py-1 bg-[#E1F6F9] text-[#348739] active:scale-90 transition-all duration-400 rounded-md flex items-center gap-2">
              <span>
                <svg
                  className="fill-current w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
              </span>
              <span>Add User</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#E1F6F9] h-8">
                <th>ID</th>
                <th>User Name</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr className="h-16 border-b border-gray-300">
                <td className="">
                  <span className="ml-2">1425</span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("user1.png")}
                      className="w-[2.125em] h-[2.125em] rounded-full"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                    <div className="flex flex-col text-left">
                      <span className="ml-2 text-13">Tamid</span>
                      <span className="ml-2 text-[11px] text-[#868686]">
                        tamid@gmail.com
                      </span>
                    </div>
                  </div>
                </td>
                <td>0123456789</td>
                <td className="text-[#348739] font-medium text-13">Active</td>
                <td>
                  <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border text-14 text-gray-500 border-gray-300 bg-[#E1F6F9]">
                    Manage Role
                  </button>
                </td>
              </tr>
              <tr className="h-16 border-b border-gray-300">
                <td className="">
                  <span className="ml-2">1425</span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("user1.png")}
                      className="w-[2.125em] h-[2.125em] rounded-full"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                    <div className="flex flex-col text-left">
                      <span className="ml-2 text-13">Tamid</span>
                      <span className="ml-2 text-[11px] text-[#868686]">
                        tamid@gmail.com
                      </span>
                    </div>
                  </div>
                </td>
                <td>0123456789</td>
                <td className="text-[#348739] font-medium text-13">Active</td>
                <td>
                  <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border text-14 text-gray-500 border-gray-300 bg-[#E1F6F9]">
                    Manage Role
                  </button>
                  
                </td>
              </tr>
              <tr className="h-16 border-b border-gray-300">
                <td className="">
                  <span className="ml-2">1425</span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("user1.png")}
                      className="w-[2.125em] h-[2.125em] rounded-full"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                    <div className="flex flex-col text-left">
                      <span className="ml-2 text-13">Tamid</span>
                      <span className="ml-2 text-[11px] text-[#868686]">
                        tamid@gmail.com
                      </span>
                    </div>
                  </div>
                </td>
                <td>0123456789</td>
                <td className="text-[#348739] font-medium text-13">Active</td>
                <td>
                  <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border text-14 text-gray-500 border-gray-300 bg-[#E1F6F9]">
                    Manage Role
                  </button>
                  
                </td>
              </tr>
              <tr className="h-16 border-b border-gray-300">
                <td className="">
                  <span className="ml-2">1425</span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("user1.png")}
                      className="w-[2.125em] h-[2.125em] rounded-full"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                    <div className="flex flex-col text-left">
                      <span className="ml-2 text-13">Tamid</span>
                      <span className="ml-2 text-[11px] text-[#868686]">
                        tamid@gmail.com
                      </span>
                    </div>
                  </div>
                </td>
                <td>0123456789</td>
                <td className="text-[#348739] font-medium text-13">Active</td>
                <td>
                  <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border text-14 text-gray-500 border-gray-300 bg-[#E1F6F9]">
                    Manage Role
                  </button>
                  
                </td>
              </tr>
              <tr className="h-16 border-b border-gray-300">
                <td className="">
                  <span className="ml-2">1425</span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("user1.png")}
                      className="w-[2.125em] h-[2.125em] rounded-full"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                    <div className="flex flex-col text-left">
                      <span className="ml-2 text-13">Tamid</span>
                      <span className="ml-2 text-[11px] text-[#868686]">
                        tamid@gmail.com
                      </span>
                    </div>
                  </div>
                </td>
                <td>0123456789</td>
                <td className="text-[#348739] font-medium text-13">Active</td>
                <td>
                  <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border text-14 text-gray-500 border-gray-300 bg-[#E1F6F9]">
                    Manage Role
                  </button>
                  
                </td>
              </tr>
              <tr className="h-16 border-b border-gray-300">
                <td className="">
                  <span className="ml-2">1425</span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("user1.png")}
                      className="w-[2.125em] h-[2.125em] rounded-full"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                    <div className="flex flex-col text-left">
                      <span className="ml-2 text-13">Tamid</span>
                      <span className="ml-2 text-[11px] text-[#868686]">
                        tamid@gmail.com
                      </span>
                    </div>
                  </div>
                </td>
                <td>0123456789</td>
                <td className="text-[#348739] font-medium text-13">Active</td>
                <td>
                  <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border text-14 text-gray-500 border-gray-300 bg-[#E1F6F9]">
                    Manage Role
                  </button>
                  
                </td>
              </tr>
              <tr className="h-16 border-b border-gray-300">
                <td className="">
                  <span className="ml-2">1425</span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("user1.png")}
                      className="w-[2.125em] h-[2.125em] rounded-full"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                    <div className="flex flex-col text-left">
                      <span className="ml-2 text-13">Tamid</span>
                      <span className="ml-2 text-[11px] text-[#868686]">
                        tamid@gmail.com
                      </span>
                    </div>
                  </div>
                </td>
                <td>0123456789</td>
                <td className="text-[#348739] font-medium text-13">Active</td>
                <td>
                  <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border text-14 text-gray-500 border-gray-300 bg-[#E1F6F9]">
                    Manage Role
                  </button>
                  
                </td>
              </tr>
              <tr className="h-16 border-b border-gray-300">
                <td className="">
                  <span className="ml-2">1425</span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("user1.png")}
                      className="w-[2.125em] h-[2.125em] rounded-full"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                    <div className="flex flex-col text-left">
                      <span className="ml-2 text-13">Tamid</span>
                      <span className="ml-2 text-[11px] text-[#868686]">
                        tamid@gmail.com
                      </span>
                    </div>
                  </div>
                </td>
                <td>0123456789</td>
                <td className="text-[#348739] font-medium text-13">Active</td>
                <td>
                  <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border text-14 text-gray-500 border-gray-300 bg-[#E1F6F9]">
                    Manage Role
                  </button>
                  
                </td>
              </tr>
              <tr className="h-16 border-b border-gray-300">
                <td className="">
                  <span className="ml-2">1425</span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("user1.png")}
                      className="w-[2.125em] h-[2.125em] rounded-full"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                    <div className="flex flex-col text-left">
                      <span className="ml-2 text-13">Tamid</span>
                      <span className="ml-2 text-[11px] text-[#868686]">
                        tamid@gmail.com
                      </span>
                    </div>
                  </div>
                </td>
                <td>0123456789</td>
                <td className="text-[#348739] font-medium text-13">Active</td>
                <td>
                  <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border text-14 text-gray-500 border-gray-300 bg-[#E1F6F9]">
                    Manage Role
                  </button>
                  
                </td>
              </tr>
              <tr className="h-16 border-b border-gray-300">
                <td className="">
                  <span className="ml-2">1425</span>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={relative_image_path("user1.png")}
                      className="w-[2.125em] h-[2.125em] rounded-full"
                      width={1000}
                      height={1000}
                      alt="Bangla"
                    />
                    <div className="flex flex-col text-left">
                      <span className="ml-2 text-13">Tamid</span>
                      <span className="ml-2 text-[11px] text-[#868686]">
                        tamid@gmail.com
                      </span>
                    </div>
                  </div>
                </td>
                <td>0123456789</td>
                <td className="text-[#348739] font-medium text-13">Active</td>
                <td>
                  <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border text-14 text-gray-500 border-gray-300 bg-[#E1F6F9]">
                    Manage Role
                  </button>
                  
                </td>
              </tr>
            </tbody>
          </table>
          <div className="pt-10 flex justify-center">
            <div className="flex items-center gap-2">
              <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 bg-primary text-white">
                Prev
              </button>
              <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 bg-primary text-white">
                1
              </button>
              <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                2
              </button>
              <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                3
              </button>
              <span>...</span>
              {/* <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                2
              </button>
              <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                2
              </button>
              <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                2
              </button>
              <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                2
              </button> */}
              <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                8
              </button>
              <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                9
              </button>
              <button className="px-2 py-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 ">
                10
              </button>
              <button className="p-1 active:scale-90 transition-all duration-400 rounded-md border border-gray-300 bg-primary text-white">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
