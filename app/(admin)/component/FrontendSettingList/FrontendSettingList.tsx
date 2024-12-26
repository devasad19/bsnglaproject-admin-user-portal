"use client";

import Image from "next/image";
import { modelClose, modelOpen, relative_image_path } from "@/helper";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Modal from "@/app/_components/Modal/Modal";
import { toast } from "react-toastify";
import { createLogo } from "@/app/(admin)/_api/Setting/FrontendSettingApi";
import ApiLoading from "@/app/(admin)/component/ApiLoading/ApiLoading";
import SwiperCard from "@/app/_components/SwiperCard/SwiperCard";
import { getAllActiveSliderApi } from "../../_api/Setting/SliderApi/SliderApi";


type frontendProps = {
  logoData: any;
};

const FrontendSettingList = ({ logoData }: frontendProps) => {
  // console.log(logoData);

  const logoAdd = useRef<any>(null);
  const logoForm = useRef<any>(null);

  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [activeSliders, setActiveSliders] = useState<any>([]);

  const fetchActiveSlider = async()=>{
    const response = await getAllActiveSliderApi();
    setActiveSliders(response?.data);
  }

  useEffect(()=>{
    fetchActiveSlider();
  },[])

  console.log({activeSliders});
  

  const handleLogoUpload = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    if (!logoImage) {
      toast.error("Please select a logo image");
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("logo", logoImage);
    try {
      const response = await createLogo(formData);
      if (response?.status) {
        setIsLoading(false);
        toast.success("Logo Update Successfully");
        modelClose(logoAdd, logoForm);
        setLogoImage(null);
      } else {
        setIsLoading(false);
        toast.error("Logo Update Failed");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error((error as Error)?.message);
    }
  };
  return (
    <>
      <section>
        <h3 className="text-32 font-mono font-bold text-[#151D48] pb-12">
          Frontend Setting
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4  bg-gray-200 py-3 px-4">
            <p className="text-16 font-bold text-[#464646] min-w-[20%]">
              Upload Logo
            </p>
            <div className=" w-full flex justify-between items-center border border-gray-400 rounded-md   py-6 px-4">
              {logoData?.logo && (
                <>
                  <Image
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + logoData?.logo}
                    className="w-[7.375em] h-[4.75em] mb-5"
                    width={1000}
                    height={1000}
                    alt="Bangla"
                  />
                </>
              )}

              <button
                className="bg-primary text-white px-4 py-1 rounded-md"
                onClick={() => modelOpen(logoAdd)}
              >
                Logo Change
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <p className="text-16 font-bold text-[#464646] min-w-[20%]">
              Change Banner
            </p>
            <div className="w-full flex flex-col items-center">
              <SwiperCard data={activeSliders}/>
              <Link
                href={{
                  pathname: "/admin/setting/banner",
                }}
                shallow
                className="mt-4 px-2 py-1 lg:px-4 lg:py-2 bg-blue-500 text-white active:scale-90 transition-all duration-400 rounded-md"
              >
                Manage Slider
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Modal
        modalRef={logoAdd}
        modalForm={logoForm}
        setPreviewSrc={setLogoImage}
        title="upload logo"
        size="w-1/3 max-w-[400px]"
      >
        <>
          <form
            onSubmit={handleLogoUpload}
            ref={logoForm}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4 mt-4">
              <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                <legend>
                  <label
                    htmlFor=""
                    className="after:content-['_*'] after:text-red-400"
                  >
                    Select Logo
                  </label>
                </legend>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setLogoImage(e.target.files[0]);
                    }
                  }}
                  className="w-full text-14 outline-none py-1"
                  placeholder="Icon Image"
                  accept="image/*"
                />
              </fieldset>
            </div>
            <div className="pt-3 flex flex-col gap-3">
              {logoImage && (
                <Image
                  className="w-[50px] h-[50px] object-cover"
                  src={URL.createObjectURL(logoImage)}
                  width={50}
                  height={50}
                  alt="icon"
                />
              )}
            </div>
            <div className="pt-6 flex justify-end">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className=" border border-black  px-4 py-1 rounded-md"
                  onClick={() => {
                    setLogoImage(null);
                    modelClose(logoAdd, logoForm);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-1 rounded-md"
                >
                  upload
                </button>
              </div>
            </div>
          </form>
          {isLoading && <ApiLoading />}
        </>
      </Modal>
    </>
  );
};

export default FrontendSettingList;
