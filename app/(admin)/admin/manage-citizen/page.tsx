
import dynamic from "next/dynamic";
import { relative_image_path } from "@/helper";
import Image from "next/image";
const Button = dynamic(() => import("@/app/_components/Button/Button"), {
    ssr: false,
});

const Home = (): JSX.Element => {
  return (
    <section className="bg-white rounded-lg p-4 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#E1F6F9] h-8">
              <th>Citizen ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Active Plans</th>
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
                  {/* <Image
                    src={relative_image_path("user1.png")}
                    className="w-[2.125em] h-[2.125em] rounded-full"
                    width={1000}
                    height={1000}
                    alt="Bangla"
                  /> */}
                  <div className="flex flex-col text-left">
                    <span className="ml-2 text-13">Tamid</span>
                    <span className="ml-2 text-[11px] text-[#868686]">
                      tamid@gmail.com
                    </span>
                  </div>
                </div>
              </td>
              <td>0123456789</td>
              <td className="font-medium text-13">5</td>
              <td>Running</td>
              <td>
                <Button
                  bg={"#3b82f6"}
                  text={"View Details"}
                  btnSize={"sm"}
                  textSize={"md"}
                />
              </td>
            </tr>
            <tr className="h-16 border-b border-gray-300">
              <td className="">
                <span className="ml-2">1425</span>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  {/* <Image
                    src={relative_image_path("user1.png")}
                    className="w-[2.125em] h-[2.125em] rounded-full"
                    width={1000}
                    height={1000}
                    alt="Bangla"
                  /> */}
                  <div className="flex flex-col text-left">
                    <span className="ml-2 text-13">Tamid</span>
                    <span className="ml-2 text-[11px] text-[#868686]">
                      tamid@gmail.com
                    </span>
                  </div>
                </div>
              </td>
              <td>0123456789</td>
              <td className="font-medium text-13">5</td>
              <td>Running</td>
              <td>
                <Button
                  bg={"#3b82f6"}
                  text={"View Details"}
                  btnSize={"sm"}
                  textSize={"md"}
                />
              </td>
            </tr>
            <tr className="h-16 border-b border-gray-300">
              <td className="">
                <span className="ml-2">1425</span>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  {/* <Image
                    src={relative_image_path("user1.png")}
                    className="w-[2.125em] h-[2.125em] rounded-full"
                    width={1000}
                    height={1000}
                    alt="Bangla"
                  /> */}
                  <div className="flex flex-col text-left">
                    <span className="ml-2 text-13">Tamid</span>
                    <span className="ml-2 text-[11px] text-[#868686]">
                      tamid@gmail.com
                    </span>
                  </div>
                </div>
              </td>
              <td>0123456789</td>
              <td className="font-medium text-13">5</td>
              <td>Running</td>
              <td>
                <Button bg={'#3b82f6'} text={'View Details'} btnSize={'sm'} textSize={'md'} />
              </td>
            </tr>
            <tr className="h-16 border-b border-gray-300">
              <td className="">
                <span className="ml-2">1425</span>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  {/* <Image
                    src={relative_image_path("user1.png")}
                    className="w-[2.125em] h-[2.125em] rounded-full"
                    width={1000}
                    height={1000}
                    alt="Bangla"
                  /> */}
                  <div className="flex flex-col text-left">
                    <span className="ml-2 text-13">Tamid</span>
                    <span className="ml-2 text-[11px] text-[#868686]">
                      tamid@gmail.com
                    </span>
                  </div>
                </div>
              </td>
              <td>0123456789</td>
              <td className="font-medium text-13">5</td>
              <td>Running</td>
              <td>
                <Button bg={'#3b82f6'} text={'View Details'} btnSize={'sm'} textSize={'md'} />
              </td>
            </tr>
            <tr className="h-16 border-b border-gray-300">
              <td className="">
                <span className="ml-2">1425</span>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  {/* <Image
                    src={relative_image_path("user1.png")}
                    className="w-[2.125em] h-[2.125em] rounded-full"
                    width={1000}
                    height={1000}
                    alt="Bangla"
                  /> */}
                  <div className="flex flex-col text-left">
                    <span className="ml-2 text-13">Tamid</span>
                    <span className="ml-2 text-[11px] text-[#868686]">
                      tamid@gmail.com
                    </span>
                  </div>
                </div>
              </td>
              <td>0123456789</td>
              <td className="font-medium text-13">5</td>
              <td>Running</td>
              <td>
                <Button bg={'#3b82f6'} text={'View Details'} btnSize={'sm'} textSize={'md'} />
              </td>
            </tr>
            <tr className="h-16 border-b border-gray-300">
              <td className="">
                <span className="ml-2">1425</span>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  {/* <Image
                    src={relative_image_path("user1.png")}
                    className="w-[2.125em] h-[2.125em] rounded-full"
                    width={1000}
                    height={1000}
                    alt="Bangla"
                  /> */}
                  <div className="flex flex-col text-left">
                    <span className="ml-2 text-13">Tamid</span>
                    <span className="ml-2 text-[11px] text-[#868686]">
                      tamid@gmail.com
                    </span>
                  </div>
                </div>
              </td>
              <td>0123456789</td>
              <td className="font-medium text-13">5</td>
              <td>Running</td>
              <td>
                <Button bg={'#3b82f6'} text={'View Details'} btnSize={'sm'} textSize={'md'} />
              </td>
            </tr>
            <tr className="h-16 border-b border-gray-300">
              <td className="">
                <span className="ml-2">1425</span>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  {/* <Image
                    src={relative_image_path("user1.png")}
                    className="w-[2.125em] h-[2.125em] rounded-full"
                    width={1000}
                    height={1000}
                    alt="Bangla"
                  /> */}
                  <div className="flex flex-col text-left">
                    <span className="ml-2 text-13">Tamid</span>
                    <span className="ml-2 text-[11px] text-[#868686]">
                      tamid@gmail.com
                    </span>
                  </div>
                </div>
              </td>
              <td>0123456789</td>
              <td className="font-medium text-13">5</td>
              <td>Running</td>
              <td>
                <Button bg={'#3b82f6'} text={'View Details'} btnSize={'sm'} textSize={'md'} />
              </td>
            </tr>
            <tr className="h-16 border-b border-gray-300">
              <td className="">
                <span className="ml-2">1425</span>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  {/* <Image
                    src={relative_image_path("user1.png")}
                    className="w-[2.125em] h-[2.125em] rounded-full"
                    width={1000}
                    height={1000}
                    alt="Bangla"
                  /> */}
                  <div className="flex flex-col text-left">
                    <span className="ml-2 text-13">Tamid</span>
                    <span className="ml-2 text-[11px] text-[#868686]">
                      tamid@gmail.com
                    </span>
                  </div>
                </div>
              </td>
              <td>0123456789</td>
              <td className="font-medium text-13">5</td>
              <td>Running</td>
              <td>
                <Button bg={'#3b82f6'} text={'View Details'} btnSize={'sm'} textSize={'md'} />
              </td>
            </tr>
            <tr className="h-16 border-b border-gray-300">
              <td className="">
                <span className="ml-2">1425</span>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  {/* <Image
                    src={relative_image_path("user1.png")}
                    className="w-[2.125em] h-[2.125em] rounded-full"
                    width={1000}
                    height={1000}
                    alt="Bangla"
                  /> */}
                  <div className="flex flex-col text-left">
                    <span className="ml-2 text-13">Tamid</span>
                    <span className="ml-2 text-[11px] text-[#868686]">
                      tamid@gmail.com
                    </span>
                  </div>
                </div>
              </td>
              <td>0123456789</td>
              <td className="font-medium text-13">5</td>
              <td>Running</td>
              <td>
                <Button bg={'#3b82f6'} text={'View Details'} btnSize={'sm'} textSize={'md'} />
              </td>
            </tr>
            <tr className="h-16 border-b border-gray-300">
              <td className="">
                <span className="ml-2">1425</span>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  {/* <Image
                    src={relative_image_path("user1.png")}
                    className="w-[2.125em] h-[2.125em] rounded-full"
                    width={1000}
                    height={1000}
                    alt="Bangla"
                  /> */}
                  <div className="flex flex-col text-left">
                    <span className="ml-2 text-13">Tamid</span>
                    <span className="ml-2 text-[11px] text-[#868686]">
                      tamid@gmail.com
                    </span>
                  </div>
                </div>
              </td>
              <td>0123456789</td>
              <td className="font-medium text-13">5</td>
              <td>Running</td>
              <td>
                <Button bg={'#3b82f6'} text={'View Details'} btnSize={'sm'} textSize={'md'} />
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
    </section>
  );
};

export default Home;
