// export const revalidate = 3600;
'use client'

import Image from "next/image";
import { relative_image_path } from "@/helper";
import Modal from "@/app/_components/Modal/Modal";
import Link from "next/link";

const Home =  () => {
    return (
      <section>
        <h3 className="text-32 font-mono font-bold text-[#151D48] pb-12">
          Frontend Setting
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <p className="text-16 font-bold text-[#464646] min-w-[20%]">
              Primary Color
            </p>
            <input type="color" name="" id="" className="w-1/2" />
          </div>
          <div className="flex gap-4">
            <p className="text-16 font-bold text-[#464646] min-w-[20%]">
              Menu Color
            </p>
            <input type="color" name="" id="" className="w-1/2" />
          </div>
          <div className="flex gap-4">
            <p className="text-16 font-bold text-[#464646] min-w-[20%]">
              Upload Logo
            </p>
            <div className="flex flex-col items-center">
              <Image
                src={relative_image_path("logo.png")}
                className="w-[7.375em] h-[4.75em] mb-5"
                width={1000}
                height={1000}
                alt="Bangla"
              />
              <Modal trigger="Upload Logo" title={"Upload Logo"}>
                <div className="flex gap-4 mt-4">
                  <p>Select Logo</p>
                  <input type="file" name="" id="" />
                </div>
              </Modal>
            </div>
          </div>
          <div className="flex gap-4">
            <p className="text-16 font-bold text-[#464646] min-w-[20%]">
              Change Banner
            </p>
            <div className="flex flex-col items-center">
              <Image
                src={relative_image_path("home_hero_banner1.jpg")}
                className="w-[7.375em] h-[4.75em] mb-5"
                width={1000}
                height={1000}
                alt="Bangla"
              />
              <Link
                href={{
                  pathname: "/admin/setting/banner",
                }}
                shallow
                className="px-2 py-1 lg:px-4 lg:py-2 bg-blue-500 text-white active:scale-90 transition-all duration-400 rounded-md"
              >
                Manage Slider
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Home;