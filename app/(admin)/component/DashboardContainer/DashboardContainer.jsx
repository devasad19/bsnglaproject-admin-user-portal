import Link from "next/link";


const DashboardContainer = ({ data }) => {
    return (
        <section>
            <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
                Dashboard
            </h3>
            <div className="flex flex-wrap">
                <Link href={'/admin/services'} shallow className="w-full md:w-1/2 xl:w-1/4 p-2">
                    <div className="bg-blue-500 text-white mb-4 rounded-lg shadow-lg">
                        <div className="p-4 text-left text-24 font-bold">{data?.totalServices}</div>
                        <div className="p-4 flex items-center justify-between bg-blue-600 rounded-b-lg">
                            <p className="text-white text-sm font-medium underline">Total Services </p>
                            <div className="text-white">
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 512">
                                    <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>


                <Link href={'/admin/accounts-settings/purchase-services'} shallow className="w-full md:w-1/2 xl:w-1/4 p-2">
                    <div className="bg-green-500 text-white mb-4 rounded-lg shadow-lg">
                        <div className="p-4 text-left text-24 font-bold">{data?.soldServices}</div>
                        <div className="p-4 flex items-center justify-between bg-green-600 rounded-b-lg">
                            <p className="text-white text-sm font-medium underline">Sold Services </p>
                            <div className="text-white">
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 512">
                                    <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>


                <Link href={'/admin/accounts-settings/purchase-services'} shallow className="w-full md:w-1/2 xl:w-1/4 p-2">
                    <div className="bg-yellow-500 text-white mb-4 rounded-lg shadow-lg">
                        <div className="p-4 text-left text-24 font-bold">{data?.activeSoldServices}</div>
                        <div className="p-4 flex items-center justify-between bg-yellow-600 rounded-b-lg">
                            <p className="text-white text-sm font-medium underline">Active Sold Services </p>
                            <div className="text-white">
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 512">
                                    <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>


                <Link href={'/admin/manage-citizen'} shallow className="w-full md:w-1/2 xl:w-1/4 p-2">
                    <div className="bg-red-500 text-white mb-4 rounded-lg shadow-lg">
                        <div className="p-4 text-left text-24 font-bold">{data?.toatalRegCitizen}</div>
                        <div className="p-4 flex items-center justify-between bg-red-600 rounded-b-lg">
                            <p className="text-white text-sm font-medium underline">Total Registered Citizen</p>
                            <div className="text-white">
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 512">
                                    <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>


                <Link href={'/admin/user-feedbacks'} shallow className="w-full md:w-1/2 xl:w-1/4 p-2">
                    <div className="bg-indigo-500 text-white mb-4 rounded-lg shadow-lg">
                        <div className="p-4 text-left text-24 font-bold">{data?.feedbacks}</div>
                        <div className="p-4 flex items-center justify-between bg-indigo-600 rounded-b-lg">
                            <p className="text-white text-sm font-medium underline">Total Feedbacks</p>
                            <div className="text-white">
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 512">
                                    <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>

            </div>


            <div className="grid grid-cols-2 mt-3 gap-4">
                {/* <!-- Sessions by Channel Card --> */}
                <div className="">
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="p-4">
                            <div className="flex justify-between mb-3">
                                <h4 className="text-lg font-semibold">Service Visits</h4>
                            </div>
                            <div className="flex">
                                <div className="w-[40%] p-3">
                                    <div id="circleProgress6" className="relative rounded-full bg-gray-100 p-4">
                                        {/* <!-- Placeholder for progress circle --> */}
                                        <svg viewBox="0 0 100 100" className="w-full">
                                            <path d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90" stroke="#eee" strokeWidth="10" fillOpacity="0"></path>
                                            <path d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90" stroke="rgb(46,32,199)" strokeWidth="10" fillOpacity="0"></path>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-900 font-bold">
                                            <p className="mb-0 text-center">Total Visits</p>
                                            {data?.total_visits}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[60%]">
                                    <ul className="space-y-2">
                                        {
                                            data?.visits?.map((item, index) => (
                                                <li key={index} className="flex justify-between text-sm">
                                                    <div>{ item?.name }</div>
                                                    <div className="w-[40%] text-right">{  item?.visits } ( { ((item?.visits/data?.total_visits)*100).toFixed(2) } %)</div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Events Card --> */}
                <div className="">
                    <div className="bg-white rounded-lg shadow-md h-full">
                        <div className="p-4">
                            <div className="flex justify-between mb-3">
                                <h4 className="text-lg font-semibold">Payments</h4>
                            </div>
                            <div className=" justify-between mb-5 mt-3 text-sm">
                                <div className="my-3 text-gray-600">Total Payments<span className="text-gray-800 font-bold float-right">{ data?.totalPayments }</span></div>
                                <div className="my-3 text-red-500">Today Payments <span className="text-gray-800 font-bold float-right">{ data?.todayPayments }</span></div>
                                <div className="my-3 text-yellow-500">Last Month Payments <span className="text-gray-800 font-bold float-right">{ data?.lastMonthPayments }</span></div>

                            </div>

                        </div>
                    </div>
                </div>

                {/* <!-- Device Stats Card --> */}
                {/* <div className="w-full xl:w-1/3 p-2">
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="p-4">
                            <div className="flex justify-between mb-3">
                                <h4 className="text-lg font-semibold">Device stats</h4>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <div>Uptime</div>
                                    <div className="text-gray-500">195 Days, 8 hours</div>
                                </div>
                                <div className="flex justify-between">
                                    <div>First Seen</div>
                                    <div className="text-gray-500">23 Sep 2019, 2.04PM</div>
                                </div>
                                <div className="flex justify-between">
                                    <div>Collected time</div>
                                    <div className="text-gray-500">23 Sep 2019, 2.04PM</div>
                                </div>
                                <div className="flex justify-between">
                                    <div>Memory space</div>
                                    <div className="text-gray-500">168.3GB</div>
                                </div>
                                <div className="relative w-full bg-gray-200 rounded h-2 mt-4">
                                    <div className="bg-green-500 h-full rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>


        </section>
    )
};



export default DashboardContainer;