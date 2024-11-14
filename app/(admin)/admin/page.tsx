import BarChart from "@/app/_components/Chart/BarChart/BarChart";
import LineChart from "@/app/_components/Chart/LineChart/LineChart";

const Home = async (): Promise<JSX.Element> => {
  return (
    <section >
      <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
        Dashboard
      </h3>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 xl:w-1/4 p-2">
            <div className="bg-blue-500 text-white mb-4 rounded-lg shadow-lg">
                <div className="p-4 text-left text-24 font-bold">343</div>
                <div className="p-4 flex items-center justify-between bg-blue-600 rounded-b-lg">
                    <a className="text-white text-sm font-medium underline" href="#">Total Services </a>
                    <div className="text-white">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 512">
                            <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full md:w-1/2 xl:w-1/4 p-2">
            <div className="bg-yellow-500 text-white mb-4 rounded-lg shadow-lg">
                <div className="p-4 font-semibold">Warning Card</div>
                <div className="p-4 flex items-center justify-between bg-yellow-600 rounded-b-lg">
                    <a className="text-white text-sm font-medium underline" href="#">View Details</a>
                    <div className="text-white">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 512">
                            <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full md:w-1/2 xl:w-1/4 p-2">
            <div className="bg-green-500 text-white mb-4 rounded-lg shadow-lg">
                <div className="p-4 font-semibold">Success Card</div>
                <div className="p-4 flex items-center justify-between bg-green-600 rounded-b-lg">
                    <a className="text-white text-sm font-medium underline" href="#">View Details</a>
                    <div className="text-white">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 512">
                            <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full md:w-1/2 xl:w-1/4 p-2">
            <div className="bg-red-500 text-white mb-4 rounded-lg shadow-lg">
                <div className="p-4 font-semibold">Danger Card</div>
                <div className="p-4 flex items-center justify-between bg-red-600 rounded-b-lg">
                    <a className="text-white text-sm font-medium underline" href="#">View Details</a>
                    <div className="text-white">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 512">
                            <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div className="flex flex-wrap mt-3">
    {/* <!-- Sessions by Channel Card --> */}
    <div className="w-full xl:w-5/12 p-2">
        <div className="bg-white rounded-lg shadow-md">
            <div className="p-4">
                <div className="flex justify-between mb-3">
                    <h4 className="text-lg font-semibold">Service Visits</h4>
                </div>
                <div className="flex">
                    <div className="w-1/2 p-3">
                        <div id="circleProgress6" className="relative rounded-full bg-gray-100 p-4">
                            {/* <!-- Placeholder for progress circle --> */}
                            <svg viewBox="0 0 100 100" className="w-full">
                                <path d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90" stroke="#eee" stroke-width="10" fill-opacity="0"></path>
                                <path d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90" stroke="rgb(46,32,199)" stroke-width="10" fill-opacity="0"></path>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-900 font-bold text-2xl">
                                <p className="mb-0 text-xl text-center">Total Visits</p>
                                2345
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <ul className="space-y-2">
                            <li className="flex justify-between">
                                <div>Firewalls (3)</div>
                                <div>4 (100%)</div>
                            </li>
                            <li className="flex justify-between">
                                <div>Ports (12)</div>
                                <div>12 (100%)</div>
                            </li>
                            <li className="flex justify-between">
                                <div>Servers (233)</div>
                                <div>2 (100%)</div>
                            </li>
                            <li className="flex justify-between">
                                <div>Firewalls (3)</div>
                                <div>7 (100%)</div>
                            </li>
                            <li className="flex justify-between">
                                <div>Firewalls (3)</div>
                                <div>6 (70%)</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- Events Card --> */}
    <div className="w-full xl:w-1/4 p-2">
        <div className="bg-white rounded-lg shadow-md">
            <div className="p-4">
                <div className="flex justify-between mb-3">
                    <h4 className="text-lg font-semibold">Payments</h4>
                </div>
                <div className=" justify-between mb-5 mt-3 text-sm">
                    <div className="my-3 text-gray-600">Total Payments<span className="text-gray-800 font-bold float-right">23456</span></div>
                    <div className="my-3 text-red-500">Today Payments <span className="text-gray-800 font-bold float-right">23456</span></div>
                    <div className="my-3 text-yellow-500">Last Month Payments <span className="text-gray-800 font-bold float-right">23456</span></div>
                  
                </div>
                 
            </div>
        </div>
    </div>

    {/* <!-- Device Stats Card --> */}
    <div className="w-full xl:w-1/3 p-2">
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
    </div>
</div>


    </section>
  );
};

export default Home;
