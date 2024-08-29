export const revalidate = 3600;
import Link from "next/link";
const Home = async ({ params: { id } }: { params: { id: string } }): Promise<JSX.Element> => {
  return (
    <section className="bg-white p-4 rounded shadow-lg">
      <div className="flex items-center gap-4 pb-10">
        <Link
          href={{
            pathname: "/admin/service-setting",
          }}
          shallow
        >
          <svg
            className="w-6 h-6 fill-slate-800"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </Link>
        <h3 className="text-32 font-bold text-slate-800">বর্ণ</h3>
      </div>
      <div className="grid grid-rows-3 gap-4">
        <div className="grid  grid-cols-6">
          <p>Service On/Off:</p>
          <div className="col-span-4">
            <p className="text-12">
              <label className="toggleSwitch large">
                <input type="checkbox" />
                <span>
                  <span>OFF</span>
                  <span>ON</span>
                </span>
                <a></a>
              </label>
            </p>
          </div>
        </div>
        <div className="grid  grid-cols-6">
          <p>Comment On/Off:</p>
          <div className="col-span-4">
            <p className="text-12">
              <label className="toggleSwitch large">
                <input type="checkbox" />
                <span>
                  <span>OFF</span>
                  <span>ON</span>
                </span>
                <a></a>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="pb-5">
        <h3 className="text-20 font-bold text-slate-900">Feature Details:</h3>
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-full lg:w-[75%]">
          <div className="flex items-center justify-between pb-5">
            <h3>(1) Validity</h3>
            <div className="flex gap-2 items-center">
              <p>Is Publically Open:</p>
              <input type="checkbox" name="" id="" />
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-center border border-primary table-fixed">
              <thead>
                <tr>
                  <td className="border border-primary">Plans</td>
                  <td className="border border-primary">Charge</td>
                  <td className="border border-primary">New Charge</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-primary">7 days</td>
                  <td className="border border-primary">100 tk</td>
                  <td className="border border-primary">
                    <input
                      type="text"
                      className="text-center w-full outline-none"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full lg:w-[75%]">
          <div className="flex items-center justify-between pb-5">
            <h3>(2) Max File Size</h3>
            <div className="flex gap-2 items-center">
              <p>Is Publically Open:</p>
              <input type="checkbox" name="" id="" checked />
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-center border border-primary table-fixed">
              <thead>
                <tr>
                  <td className="border border-primary">Plans</td>
                  <td className="border border-primary">Charge</td>
                  <td className="border border-primary">New Charge</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-primary">2 MB</td>
                  <td className="border border-primary">200 tk</td>
                  <td className="border border-primary">
                    <input
                      type="text"
                      className="text-center w-full outline-none"
                      disabled
                      value={'250 tk'}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
