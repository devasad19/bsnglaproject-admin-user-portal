import Link from "next/link";
import Image from "next/image";
import { relative_image_path } from "@/helper";
import { type ServiceType } from "@/types/ServiceType";

const Card1 = ({ id, title, image, description }: ServiceType) => {
  return (
    <>
      <Link
        href={{
          pathname: `/services/${id}`,
        }}
        className={`w-[10em] lg:w-[18.75em] h-[10em] lg:h-[15em] border border-green-100 rounded-md 
           flex flex-col justify-center items-center  gap-2 lg:gap-4 bg-gradient-to-tr from-emerald-200 to-rose-200`}
      >
        <p className=" lg:text-24 font-bold">{title}</p>
        <Image
          className="w-10 h-10 lg:w-20 lg:h-20"
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image || ""}`}
          width={1000}
          height={1000}
          alt="Bangla"
          loading="eager"
        />
        <p className="text-center line-clamp-2 text-12 lg:text-14 px-4 text-gray-500">
          {description}
        </p>
      </Link>
    </>
  );
};

export default Card1;
