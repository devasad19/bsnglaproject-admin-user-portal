"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSingleSlider, updateSlider } from "@/app/(admin)/_api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Home = ({ params: { id } }) => {
  const router = useRouter();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSingleSlider(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  const HandleUpdate = async () => {
    setLoading(true);
    const response = await updateSlider(id, data)
      .then((res) => {
        if (res.status) {
          toast.success("Slider Updated Successfully");
          router.push("/admin/setting/banner");
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="bg-white p-4 rounded min-h-screen">
      <div className=" w-full inline-flex flex-col lg:flex-row justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={{
              pathname: "/admin/setting/banner",
            }}
            shallow
          >
            <svg
              className="w-6 h-6 fill-primary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </Link>

          <h3 className="text-32 font-mono font-bold text-[#151D48]">
            Edit Slider
          </h3>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              HandleUpdate();
            }}
            className="grid grid-cols-1 gap-2"
          >
            <div>
              <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                <legend>
                  <label
                    htmlFor="slider_image"
                    className="text-14  bg-white px-2"
                  >
                    Change Slider Image:
                  </label>
                </legend>
                <input
                  onChange={(event) =>
                    setData({ ...data, img: event.target.files[0] })
                  }
                  type="file"
                  id="slider_image"
                  className="p-2 w-full"
                />
              </fieldset>
              {typeof data?.img == "string" && (
                <Image
                  src={process.env.NEXT_PUBLIC_IMAGE_URL + data?.img}
                  className="w-[10em] h-[10em]"
                  alt="slider"
                  width={1000}
                  height={1000}
                />
              )}

              {typeof data?.img == "object" && (
                <Image
                  src={URL.createObjectURL(data?.img)}
                  className="w-[10em] h-[10em]"
                  alt="slider"
                  width={1000}
                  height={1000}
                />
              )}
            </div>
            <div>
              <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                <legend>
                  <label htmlFor="link" className="text-14 bg-white px-2">
                    Url:
                  </label>
                </legend>
                <input
                  onChange={(event) =>
                    setData({ ...data, link: event.target.value })
                  }
                  value={data?.link}
                  id="link"
                  placeholder="Enter Slider url"
                  className="outline-none text-14 p-2 w-full"
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                <legend>
                  <label
                    htmlFor="slider_description"
                    className="text-14 bg-white px-2"
                  >
                    Caption Text:
                  </label>
                </legend>
                <input
                  onChange={(event) =>
                    setData({ ...data, caption_text: event.target.value })
                  }
                  value={data?.caption_text}
                  id="slider_description"
                  placeholder="Enter Slider Description"
                  className="outline-none text-14 p-2 w-full"
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                <legend>
                  <label
                    htmlFor="caption_button"
                    className="text-14 bg-white px-2"
                  >
                    Caption Button Text:
                  </label>
                </legend>
                <input
                  onChange={(event) =>
                    setData({ ...data, caption_btn: event.target.value })
                  }
                  value={data?.caption_btn}
                  id="caption_button"
                  placeholder="Enter caption button text"
                  className="outline-none text-14 p-2 w-full"
                ></input>
              </fieldset>
            </div>
            <div>
              <fieldset className="border border-gray-300 flex flex-col px-2 rounded">
                <legend>
                  <label
                    htmlFor="slider_status"
                    className="text-14 p-2 bg-white"
                  >
                    Select Slider Status:
                  </label>
                </legend>
                <select id="slider_status" className="text-14 p-2 bg-white">
                  <option selected={data?.status == 1} value="1">
                    Active
                  </option>
                  <option selected={data?.status == 0} value="2">
                    Inactive
                  </option>
                </select>
              </fieldset>
            </div>
            <div className="pt-6 flex justify-end">
              <div className="flex items-center gap-4">
                <Link
                  href={{
                    pathname: "/admin/setting/banner",
                  }}
                  shallow
                  className="bg-gray-500 text-white px-4 py-3 rounded-md"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-3 rounded-md"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default Home;
