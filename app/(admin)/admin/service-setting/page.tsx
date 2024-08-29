export const revalidate = 3600;
import Link from "next/link";
import { getServices } from "@/app/(portal)/_api";

const Home = async (): Promise<JSX.Element> => {
  const services = await getServices();

  return (
    <section>
      <div className="flex flex-wrap justify-between">
        <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
          Service Setting
        </h3>
      </div>
      <div className="w-full overflow-x-auto bg-white p-7 rounded-md">
        <table className="w-full">
          <thead className="border-b border-[#151D48] text-[#151D48] h-10 text-12 lg:text-16">
            <tr>
              <th className="text-left">SI</th>
              <th className="text-left">Name</th>
              <th className="text-center">Publish Date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Active Users</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-b [&>tr]:border-[#151D48] [&>tr]:text-left [&>tr]:h-16 text-12 lg:text-16">
            {services?.map((item: any, index:number) => (
              <tr key={index}>
                <td className="text-left">{index + 1}</td>
                <td>
                  <Link
                    href={{
                      pathname: "/admin/service-setting/1",
                    }}
                    className="flex items-center gap-2 text-14"
                    shallow
                  >
                    {/* <span>
                      <Image
                        className="w-10 h-10 rounded-md"
                        src={relative_image_path(item?.image)}
                        height={1000}
                        width={1000}
                        alt="Bangla"
                      />
                    </span> */}
                    <span>{item?.title}</span>
                  </Link>
                </td>
                <td className="text-center">{item?.created_at}</td>
                <td
                  className={`text-center ${
                    item?.status == 0 ? "text-gray-500" : "text-blue-500"
                  }`}
                >
                  {item?.status == 0 ? "OFF" : "ON"}
                </td>
                <td className="text-center">{item?.active_users}</td>
                {/* <td className="text-center">
                  {item?.package.length > 0 ? (
                    <Link
                      href={{
                        pathname: "/admin/services/1",
                      }}
                      shallow
                      className="px-2 py-1 lg:px-4 lg:py-2 bg-green-500 text-white active:scale-90 transition-all duration-400 rounded-md"
                    >
                      View
                    </Link>
                  ) : (
                    <Link
                      href={{
                        pathname: "/admin/services/1",
                      }}
                      shallow
                      className="px-2 py-1 lg:px-4 lg:py-2 bg-yellow-500 text-white active:scale-90 transition-all duration-400 rounded-md"
                    >
                      Create Package
                    </Link>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Home;
