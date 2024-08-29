const Home = (): JSX.Element => {
    return (
      <section className="bg-white p-4">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-0 pb-5">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
            <p className="pt-1">Filter by date: </p>
            <div className="flex flex-col lg:flex-row gap-2">
              <fieldset className="flex flex-col border border-gray-500 px-2">
                <legend>
                  <label htmlFor="FromDate" className="text-12">
                    From
                  </label>
                </legend>
                <input id="FromDate" type="date" className=" outline-none" />
              </fieldset>
              <fieldset className="flex flex-col border border-gray-500 px-2">
                <legend>
                  <label htmlFor="ToDate" className="text-12">
                    To
                  </label>
                </legend>
                <input id="ToDate" type="date" className=" outline-none" />
              </fieldset>
            </div>
          </div>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Clear all logs
          </button>
        </div>
        <div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <select name="" id="" className="w-20 bg-white border p-1">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
              <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                <p>Export As: </p>
                <div className="flex flex-col lg:flex-row"> 
                  <button className="lg:w-20 bg-white border p-1 active:scale-90 transition-all duration-100">
                    PDF
                  </button>
                  <button className="lg:w-20 bg-white border p-1 active:scale-90 transition-all duration-100">
                    Excel
                  </button>
                  <button className="lg:w-20 bg-white border p-1 active:scale-90 transition-all duration-100">
                    CSV
                  </button>
                </div>
              </div>
              <button className="lg:w-20 bg-white border p-1 active:scale-90 transition-all duration-100">
                Print
              </button>
            </div>
            <div>
              <fieldset className="flex items-center">
                <label
                  htmlFor="search"
                  className="border border-r-0 border-gray-500 p-1 lg:p-2"
                >
                  <svg
                    className="w-4 h-4 fill-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                </label>
                <input
                  type="search"
                  name=""
                  id="search"
                  placeholder="Search..."
                  className="outline-none border border-gray-500 lg:px-2 lg:py-1"
                />
              </fieldset>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border border-gray-500">
              <thead className="h-16 bg-blue-300 text-white">
                <tr>
                  <th className="pl-2 border border-gray-500">Description</th>
                  <th className="pl-2 border border-gray-500">Date</th>
                  <th className="pl-2 border border-gray-500">Designation</th>
                </tr>
              </thead>
              <tbody className="text-14">
                <tr className="border-b border-gray-500 h-12">
                  <td className="pl-2 border border-gray-500">
                    New task added [ID:1136, Name: স্মার্ট কেস ম্যানেজমেন্ট
                    সিস্টেম অন্যান্য রেস্পন্ডেন্ট ম্যানুয়াল এন্ট্রি (CRUD)]
                  </td>
                  <td className="pl-2 border border-gray-500">
                    05/27/2024 3:39 PM
                  </td>
                  <td className="pl-2 border border-gray-500">User</td>
                </tr>
                <tr className="border-b border-gray-500 h-12">
                  <td className="pl-2 border border-gray-500">
                    New task added [ID:1136, Name: স্মার্ট কেস ম্যানেজমেন্ট
                    সিস্টেম অন্যান্য রেস্পন্ডেন্ট ম্যানুয়াল এন্ট্রি (CRUD)]
                  </td>
                  <td className="pl-2 border border-gray-500">
                    05/27/2024 3:39 PM
                  </td>
                  <td className="pl-2 border border-gray-500">User</td>
                </tr>
                <tr className="border-b border-gray-500 h-12">
                  <td className="pl-2 border border-gray-500">
                    New task added [ID:1136, Name: স্মার্ট কেস ম্যানেজমেন্ট
                    সিস্টেম অন্যান্য রেস্পন্ডেন্ট ম্যানুয়াল এন্ট্রি (CRUD)]
                  </td>
                  <td className="pl-2 border border-gray-500">
                    05/27/2024 3:39 PM
                  </td>
                  <td className="pl-2 border border-gray-500">User</td>
                </tr>
                <tr className="border-b border-gray-500 h-12">
                  <td className="pl-2 border border-gray-500">
                    New task added [ID:1136, Name: স্মার্ট কেস ম্যানেজমেন্ট
                    সিস্টেম অন্যান্য রেস্পন্ডেন্ট ম্যানুয়াল এন্ট্রি (CRUD)]
                  </td>
                  <td className="pl-2 border border-gray-500">
                    05/27/2024 3:39 PM
                  </td>
                  <td className="pl-2 border border-gray-500">User</td>
                </tr>
                <tr className="border-b border-gray-500 h-12">
                  <td className="pl-2 border border-gray-500">
                    New task added [ID:1136, Name: স্মার্ট কেস ম্যানেজমেন্ট
                    সিস্টেম অন্যান্য রেস্পন্ডেন্ট ম্যানুয়াল এন্ট্রি (CRUD)]
                  </td>
                  <td className="pl-2 border border-gray-500">
                    05/27/2024 3:39 PM
                  </td>
                  <td className="pl-2 border border-gray-500">User</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
};

export default Home;