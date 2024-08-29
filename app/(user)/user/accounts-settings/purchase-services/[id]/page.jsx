import Link from "next/link";


const Home = async ({params : { id }}) => {
    return (
      <section>
        <div className="flex items-center gap-4 pb-5">
          <Link
            href={{
              pathname: "/user/accounts-settings/purchase-services",
            }}
            shallow
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </span>
          </Link>
          <h3 className="text-26 lg:text-32 font-mono font-bold text-[#151D48]">
            Service Name: {id}
          </h3>
        </div>

        <h3 className="text-28 font-bold text-[#151D48] pb-5">
          Package Name: Package 1
        </h3>
        <div className="overflow-x-auto bg-white rounded shadow-lg mb-5">
          <table className="w-full lg:table-fixed text-center">
            <thead className="h-10 bg-blue-500 text-white">
              <tr>
                <th>Purchasing Date</th>
                <th>Valid Till</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-12">
                <td>2022-01-01</td>
                <td>2022-01-01</td>
                <td>1000</td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-28 font-bold text-[#151D48] pb-5">
          Package Name: Package 2
        </h3>
        <div className="overflow-x-auto bg-white rounded shadow-lg">
          <table className="w-full lg:table-fixed text-center">
            <thead className="h-10 bg-blue-500 text-white">
              <tr>
                <th>Purchasing Date</th>
                <th>Valid Till</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-12">
                <td>2022-01-01</td>
                <td>2022-01-01</td>
                <td>1000</td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
};

export default Home;