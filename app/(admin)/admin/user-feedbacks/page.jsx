export const revalidate = 3600;

import { getAdminAllFeedBacks, getUserFeedBacks } from "../../_api";
import { dateName } from "@/helper";

const Home = async () => {
  let data = [];
  const response = await getAdminAllFeedBacks().then((res) => {
    return res;
  }).catch((err) => {
    console.log(err);
  });
  // console.log({response});
  

  if (response?.data) {
    data = response?.data;
  }

  return (
    <section className="bg-white p-4 rounded shadow-lg">
      <h3 className="text-24 text-slate-900 font-bold pb-5">
        User FeedBacks
      </h3>

      {
        response ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left ">
              <thead className="h-16 ">
                <tr>
                  <th className="pl-2 w-10">SL</th>
                  <th className="pl-2 w-40">Service Name</th>
                  <th className="pl-2 w-52">User Name</th>
                  <th className="pl-2">Comment</th>
                  <th className="pl-2 w-44">Rating</th>
                  <th className="pl-2 w-36">Date</th>
                </tr>
              </thead>
              <tbody className="text-14">
                { 
                data?.length === 0? (
                  <tr>
                    <td colSpan="6" className=" mt-4 text-center">No Data Found</td>
                    </tr>
                ) : (
                  data?.map((item, index) => (
                    <tr key={index} className="border-b border-gray-500 h-12">
                      <td className="pl-2">{index + 1}</td>
                      <td className="pl-2">{item?.service?.name}</td>
                      <td className="pl-2">{item?.user?.name}</td>
                      <td className="pl-2">{item?.msg}</td>
                      <td className="pl-2">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">


                            {[...Array(parseInt(item?.rating))].map((_, index) => (
                              <svg
                                className="fill-yellow-500 w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                                key={index}
                              >
                                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                              </svg>
                            ))}

                            {[...Array(5 - parseInt(item?.rating))].map((_, index) => (
                              <svg
                                key={index}
                                className="fill-gray-400 w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                              >
                                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-14 text-gray-500">({item?.rating}/5)</span>
                        </div>
                      </td>
                      <td className="pl-2 border border-gray-500">
                        {
                          item?.created_at?.slice(0, 10)
                        }
                      </td>
                    </tr>
                  ))
                  )
                }
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )
      }
    </section>
  );
};

export default Home;