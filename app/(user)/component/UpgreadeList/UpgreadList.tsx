"use client";
import Image from "next/image";
import { relative_image_path } from "@/helper";
import { useEffect, useMemo, useState } from "react";
import {
  getFeaturesByServiceId,
  getSingleOrderByServiceId,
  getSingleService,
} from "@/app/(portal)/_api";
import { useHomeContext } from "@/ContextProvider/Home.Context";

interface Tprops {
  id: any;
  validities: any;
}
interface TFeature {
    plans: string;
    name: string;
    unit: string;
  }

const UpgreadList = ({ id, validities }: Tprops) => {
   const context = useHomeContext();
   const user = context?.user;
  const [service, setService] = useState<any>({});
  

  const [features, setFeatures] = useState<TFeature[]>([]);
  const [orderData, setOrderData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPrices, setSelectedPrices] = useState<any>([]);
  const [activePlans, setActivePlans] = useState<any>([]);
  const [selectedFeatureInfo, setSelectedFeatureInfo] = useState<any>([]);
  const [index, setIndex] = useState<any>({});
  const [totalPrice, setTotalPrice] = useState<any>(0);
  const [error, setError] = useState<any>("");
  // const [isLoading,setIsLoading] = useState(false);

  const handlePlanClick = (
    featureIndex: any,
    price: any,
    planIndex: any,
    planName: any
  ) => {
    const selectIndexFeatureData = features[featureIndex];
    setActivePlans((prevActivePlans: any) => {
      const updatedPlans = [...prevActivePlans];
      updatedPlans[featureIndex] = planIndex; // Set the active plan for this feature
      return updatedPlans;
    });
    setSelectedFeatureInfo((prevData: any) => {
      const updatedData = [...prevData];
      updatedData[featureIndex] = { selectIndexFeatureData, price, planName };
      return updatedData;
    });
    setSelectedPrices((prevPrices: any) => {
      const updatedPrices = [...prevPrices];
      updatedPrices[featureIndex] = price;
      return updatedPrices;
    });
  };
console.log({user});

  useEffect(() => {
    try {
      setIsLoading(true);
      if(user?.id){
        getSingleService(id)
        .then((data) => (setIsLoading(false), setService(data)))
        .catch((err) => console.log(err));
      getFeaturesByServiceId(id).then(
        (data) => (setIsLoading(false), setFeatures(data?.data))
      );
      getSingleOrderByServiceId(id, user?.id).then(
        (data) => (setIsLoading(false), setOrderData(data?.data))
      );
      }
    } catch (error) {
      setError("Failed to load data. Please try again later.");
    } finally {
      setIsLoading(false); // End loading
    }
  }, [id, user?.id]);

  const maxPlanLength = Math.max(
    ...features?.map((fItem) => JSON.parse(fItem?.plans || "[]").length)
  );
  const ordersPlans = JSON.parse(orderData?.plans || "[]");
  const TotalAmountOld = ordersPlans?.reduce(
    (acc: any, curr: any) => acc + (Number(curr?.price) || 0),
    0
  );

  const updatedTotalAmount = selectedPrices?.reduce(
    (sum: any, price: any) => sum + (Number(price) || 0),
    0
  );
  useEffect(() => {
    const initialActivePlans: any = [];
    const initialSelectedPrices: any = [];
    let initialTotalPrice = 0;

    if (features?.length > 0) {
      features?.forEach((fItem, fIndex) => {
        const plans = JSON.parse(fItem?.plans || "[]");
        plans?.forEach((pItem: any, pIndex: number) => {
          const matchingOrder = ordersPlans?.find(
            (element: any) =>
              element?.data === pItem?.limit &&
              element?.price === pItem?.validaty
          );
          if (matchingOrder) {
            initialActivePlans[fIndex] = pIndex;
            initialSelectedPrices[fIndex] = pItem?.validaty;
            initialTotalPrice += pItem?.validaty || 0;
          }
        });
      });
    }

    setActivePlans(initialActivePlans || []);
    setSelectedPrices(initialSelectedPrices || 0);
    setTotalPrice(initialTotalPrice || 0);
  }, [features]);

  const handlePayment = (id: any) => {
    // if (!user) {
    //   toast.warn("Please login first");
    //   setIsLoading(false);
    //   return;
    // }

    // const { name, email, phone, address, division, zila, thana, companyUrl } =
    //   data;

    let plans = [];

    // if (featureSelectedInfoAll.length > 0) {
    //   plans = featureSelectedInfoAll.map((item) => ({
    //     id: item?.selectIndexFeatureData?.id,
    //     name: item?.selectIndexFeatureData?.name,
    //     data: item?.planName,
    //     price: item?.price,
    //     unit: item?.selectIndexFeatureData?.unit,
    //   }));
    // }
    // const orderInfo = {
    //   user_id: user?.id,
    //   service_id: id,
    //   plans,
    //   total: featureTotalPrice,
    //   offer: "",
    //   discount: 0,
    //   status: 1,
    // };
  };
  console.log({features,orderData, ordersPlans, TotalAmountOld, updatedTotalAmount, activePlans});
  
  return (
    <>
      <section>
        <div className="flex flex-col lg:flex-row gap-2 bg-white p-4 rounded mb-5">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${service?.logo || ""}`}
            className="w-16 h-16 lg:h-[5em] lg:w-[5em] pb-2"
            width={1000}
            height={1000}
            alt="Bangla"
          />
          <div>
            <h3 className="text-20 font-medium"> {service?.name || ""}</h3>
            <p dangerouslySetInnerHTML={{ __html: service?.description }}></p>
          </div>
        </div>
        <div className="max-[768px]:w-[165vw] lg:w-auto flex justify-center items-center overflow-x-auto">
          <div className="w-full lg:w-[70%] flex  bg-white p-4">
            <div className="min-h-[20vh] w-full">
              <table className="w-full">
                <thead className="w-full bg-primary py-4 text-white">
                  <tr className="text-center">
                    <th className="py-4">Feature Name</th>
                    <th colSpan={5} className="py-4">
                      Plans
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center w-[40%] py-6 border border-l border-gray-200">
                      <div>
                        <h1 className="text-16 font-semibold">Validaty</h1>
                      </div>
                    </td>
                    {validities && validities?.length > 0
                      ? validities?.map((vItem: any, vIndex: any) => {
                          return (
                            <td
                              key={vIndex}
                              className="border border-gray-200 w-12 h-28"
                            >
                              <div className="text-center flex items-center justify-center">
                                <h1 className="text-16 font-semibold w-20 h-20 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                  {vItem?.day + " " + "Days"}
                                </h1>
                              </div>
                            </td>
                          );
                        })
                      : ""}
                  </tr>
                  {isLoading && (
                    <tr>
                      <td colSpan={6} className="text-center">
                        Loading...
                      </td>
                    </tr>
                  )}

                  {features && features?.length > 0 ? (
                    features?.map((fItem, fIndex) => {
                      let plans = JSON.parse(fItem.plans || "[]");
                      return (
                        <tr key={fIndex}>
                          <td className="text-center w-[40%] py-6 border border-l border-gray-200">
                            <div>
                              <h1 className="text-16 font-semibold">
                                {fItem?.name}
                              </h1>
                            </div>
                          </td>

                          {plans.length > 0 ? (
                            plans?.map((pItem: any, planIndex: any) => {
                              let isSelected =
                                activePlans[fIndex] === planIndex;
                              return (
                                <td
                                  key={planIndex}
                                  className="border border-gray-300 w-12 h-28"
                                >
                                  <div className="text-center flex items-center justify-center">
                                    <h1
                                      onClick={() =>
                                        handlePlanClick(
                                          fIndex,
                                          pItem?.validaty || 0,
                                          planIndex,
                                          pItem?.limit || 0
                                        )
                                      }
                                      className={`text-16 font-semibold w-20 h-20 border ${
                                        isSelected
                                          ? "border-primary"
                                          : "border-gray-300"
                                      } rounded-full flex items-center justify-center cursor-pointer`}
                                    >
                                      {pItem?.limit + " " + fItem?.unit}
                                    </h1>
                                  </div>
                                </td>
                              );
                            })
                          ) : (
                            <span className="text-center">Data Not Found</span>
                          )}

                          {Array.from({
                            length: maxPlanLength - plans.length,
                          }).map((_, emptyIndex) => (
                            <td
                              key={`empty-${emptyIndex}`}
                              className="border border-gray-200 w-12 h-28"
                            ></td>
                          ))}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td>Data Not Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="w-full bg-green-100 text-gray-700 flex items-center justify-between py-4">
                <div className="w-[60%] flex items-center justify-center">
                  <h1 className="text-16 font-semibold">Total Amount:</h1>
                </div>
                <div className="w-[40%] flex items-center justify-center">
                  <h1 className="text-16 font-semibold">{TotalAmountOld}</h1>
                </div>
              </div>

              {updatedTotalAmount != TotalAmountOld &&
                updatedTotalAmount > 0 && (
                  <div className="w-full bg-green-100 text-gray-700  boreder-t border-gray-00 flex items-center justify-between py-4">
                    <div className="w-[60%] flex items-center justify-center">
                      <h1 className="text-16 font-semibold">
                        Total Updated Amount:
                      </h1>
                    </div>
                    <div className="w-[40%] flex items-center justify-center">
                      <h1 className="text-16 font-semibold">
                        {updatedTotalAmount}{" "}
                        <button
                          onClick={() => handlePayment(id)}
                          className="mt-1 bg-primary text-white rounded px-2 py-1"
                        >
                          Update
                        </button>
                      </h1>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpgreadList;
