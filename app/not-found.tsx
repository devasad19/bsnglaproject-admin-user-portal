"use client";
import { useRouter } from "next/navigation";
const NotFound = (): JSX.Element => {
  const router = useRouter();
  return (
    <>
      <section className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-40 text-primary">
          দুঃখিত, এই পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>
        <button
          className="text-primary border border-primary hover:bg-primary hover:text-white px-[18px] rounded-md mt-3"
          onClick={() => router.back()}
        >
          ফিরে যান
        </button>
      </section>
    </>
  );
};
export default NotFound;