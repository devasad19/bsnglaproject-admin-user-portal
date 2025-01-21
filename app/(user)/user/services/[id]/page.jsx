
import UpgreadList from "@/app/(user)/component/UpgreadeList/UpgreadList";
const Home = async({ params: { id } }) => {
  
  const validities = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plan/validities`).then((res) => res.json()).catch((err) => console.log(err));

  // console.log({activePlans,selectedPrices,selectedFeatureInfo});
  
  

  // console.log("service: ", service);
  // console.log("features: ", features);
  // console.log("orderData: ", orderData);

  return (
   <>
   <UpgreadList id={id} validities={validities?.data} />
   </>
  );
};

export default Home;

{
  /* <div className="">
            <h1>Plans</h1>
            <div className="w-full grid grid-cols-3 bg-white p-3">
              <div className="min-h-[20vh] grid grid-rows-6 border border-blue-500 bg-blue-100 rounded-2xl text-14">
                <div className="flex justify-center items-center">
                  <p className="font-semibold text-center">Premium</p>
                </div>
                <div className="p-4 border-b border-gray-300">
                  <p className="text-center">Monthly Email Sends</p>
                </div>
                <div className="p-4 border-b border-gray-300">
                  <p className="text-center">Monthly Email Sends</p>
                </div>
                <div className="p-4 border-b border-gray-300">
                  <p className="text-center">Monthly Email Sends</p>
                </div>
                <div className="p-4 border-b border-gray-300 flex justify-center">
                  <p className="text-center">
                    <svg
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                  </p>
                </div>
                <div className="p-4 border-b border-gray-300 flex justify-center">
                  <p className="text-center">
                    <svg
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                  </p>
                </div>
                <div className="p-4 py-6 border-b border-gray-300 flex justify-center items-center">
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    RUNNING
                  </button>
                </div>
              </div>
             
            </div>
          </div> */
}
