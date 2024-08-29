export const revalidate = 3600;

import Link from "next/link";
import Image from "next/image";
import { relative_image_path } from "@/helper";
import { getServices } from "@/app/(portal)/_api";



const Home = async () => {
  const services = await getServices();


  return (
    <section>
      <div className="flex flex-wrap justify-between">
        <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
          Usage History
        </h3>
      </div>
      <div className="w-full overflow-x-auto bg-white p-7 rounded-md">
        <table className="w-full">
          <thead className="border-b border-[#151D48] text-[#151D48] h-10 text-12 lg:text-16">
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Plan</th>
              <th className="text-center">Purchase Date</th>
              <th className="text-center">Usage Type</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-b [&>tr]:border-[#151D48] [&>tr]:text-left [&>tr]:h-16 text-12 lg:text-16">
            {services?.map((item: any, index: number) => (
              <tr key={index}>
                <td>
                  <Link
                    href={{
                      pathname: "/user/usage/1",
                    }}
                    className="flex items-center gap-2 text-14"
                    shallow
                  >
                    <span>
                      <Image
                        className="w-10 h-10 rounded-md"
                        src={relative_image_path(item?.image)}
                        height={1000}
                        width={1000}
                        alt="Bangla"
                      />
                    </span>
                    <span>{item?.title}</span>
                  </Link>
                </td>
                <td>Basic</td>
                <td className="text-center">{item?.created_at}</td>
                <td className="text-center">Business</td>
                <td
                  className={`text-center ${
                    item?.status == 0 ? "text-red-400" : "text-blue-400"
                  }`}
                >
                  {item?.status == 0 ? "Inactive" : "Active"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Home;
