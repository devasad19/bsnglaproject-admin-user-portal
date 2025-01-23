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
import { paymentPostApi, upgradePackage } from "../../_api/OrderPaymentApi";
import { toast } from "react-toastify";
import UserApiLoading from "../UserAPiLoading/UserApiLoading";

interface Tprops {
  id: any;
  validities: any;
}
interface TFeature {
  id?: string;
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
  const [activeValidaty, setActiveValidataty] = useState<any>({});
  const [selectedFeatureInfo, setSelectedFeatureInfo] = useState<any>([]);
  const [index, setIndex] = useState<any>({});
  const [totalPrice, setTotalPrice] = useState<any>(0);
  const [error, setError] = useState<any>("");
  const [percentagePrice, setPercentagePrice] = useState<any>(0);
  // const [isLoading,setIsLoading] = useState(false);

  const handleDayClick = (id: any) => {
    const selectedIndexDay = validities.find(
      (validitie: any) => validitie.id == id
    );
    setActiveValidataty(selectedIndexDay);
  };

  const handlePlanClick = (
    featureIndex: any,
    price: any,
    planIndex: any,
    planName: any,
    planId: any
  ) => {
    const selectIndexFeatureData = features[featureIndex];
    // console.log({ selectIndexFeatureData, price, planName,planId });

    const parseData = JSON.parse(selectIndexFeatureData?.plans || "[]");
    const matchData = parseData?.find((item: any) => item?.id == planId);

    // console.log({ matchData });
    const featureSelectedData = {
      selectIndexFeatureData,
      price: matchData?.validaty,
      planName: matchData?.limit,
      planId: matchData?.id,
      featureId: selectIndexFeatureData?.id,
    };

    // console.log({featureSelectedData});

    setActivePlans((prevActivePlans: any) => {
      const updatedPlans = [...prevActivePlans];
      updatedPlans[featureIndex] = planIndex; // Set the active plan for this feature
      return updatedPlans;
    });
    setSelectedFeatureInfo((prevData: any) => {
      const updatedData = [...prevData];
      updatedData[featureIndex] = { featureSelectedData };
      return updatedData;
    });
    setSelectedPrices((prevPrices: any) => {
      const updatedPrices = [...prevPrices];
      updatedPrices[featureIndex] = price;
      return updatedPrices;
    });
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      if (user?.id) {
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
  const ordersPlans = JSON.parse(orderData?.feature || "[]");
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
    const initialSelectedFeatureInfo: any = [];
    let initialTotalPrice = 0;
    if (features?.length > 0) {
      features.forEach((fItem: any, fIndex) => {
        const plans = JSON.parse(fItem?.plans || "[]");
        plans.forEach((pItem: any, pIndex: number) => {
          const matchingOrder = ordersPlans?.find(
            (element: any) =>
              String(element?.feature_id) === String(fItem.id) &&
              String(element?.id) === String(pItem?.id)
          );
          if (matchingOrder) {
            initialActivePlans[fIndex] = pIndex;
            initialSelectedPrices[fIndex] = pItem?.validaty;
            initialTotalPrice += Number(pItem?.validaty || 0);
            // console.log({ pItem , fItem});

            const featureSelectedData = {
              selectIndexFeatureData: fItem,
              price: pItem?.validaty,
              planName: pItem?.limit,
              planId: pItem?.id,
              featureId: fItem?.id,
            };

            initialSelectedFeatureInfo[fIndex] = {
              featureSelectedData,
            };
          }
        });
      });
      validities?.forEach((validity: any) => {
        const matchingOrder = ordersPlans?.find((element: any) => {
          return element?.id == validity?.id && element?.name == "Validity";
        });
        if (matchingOrder) {
          setActiveValidataty(validity);
          initialTotalPrice += Number(matchingOrder?.price || 0);
        }
      });
    }
    setActivePlans(initialActivePlans || []);
    setSelectedPrices(initialSelectedPrices || []);
    setTotalPrice(initialTotalPrice || 0);
    setSelectedFeatureInfo(initialSelectedFeatureInfo || []);
  }, [features]);

  useEffect(() => {
    if (activeValidaty?.day && updatedTotalAmount) {
      // console.log({ activeDay, totalPrice });

      setPercentagePrice(
        Math.round(
          Number(
            ((Number(activeValidaty?.rate) / 100) * updatedTotalAmount).toFixed(
              2
            )
          )
        )
      );
    } else {
      setPercentagePrice(0);
    }
  }, [updatedTotalAmount, activeValidaty]);

  console.log({ selectedFeatureInfo });

  const handleOrderNow = async () => {
    setIsLoading(true);
    let plans: any = [];
    const newSelectedInfoAll = [
      {
        featureSelectedData: {
          selectIndexFeatureData: {
            id: "",
            name: "Validity",
            unit: "Day",
          },
          planId: activeValidaty?.id,
          planName: activeValidaty?.day,
          price: percentagePrice,
          featureId: "",
        },
      },
      ...selectedFeatureInfo,
    ];
    // if (newSelectedInfoAll.length > 0) {
    //   plans = newSelectedInfoAll.map((item) => ({
    //     id: item?.planId,
    //     feature_id: item?.selectIndexFeatureData?.id,
    //     name: item?.selectIndexFeatureData?.name,
    //     data: item?.planName,
    //     price: item?.price,
    //     unit: item?.selectIndexFeatureData?.unit,
    //   }));
    // }
    if (newSelectedInfoAll?.length > 0) {
      plans = newSelectedInfoAll.map((item: any) => ({
        id: item?.featureSelectedData.planId,
        feature_id: item?.featureSelectedData.featureId,
        name: item?.featureSelectedData.selectIndexFeatureData?.name,
        data: item?.featureSelectedData.planName,
        price: item?.featureSelectedData.price,
        unit: item?.featureSelectedData.selectIndexFeatureData?.unit,
      }));
    }
    // console.log({plans});
    // return;

    const orderInfo = {
      user_id: user?.id,
      order_id: orderData?.order_id,
      payment_id: orderData?.payment_id,
      service_id: id,
      feature: plans,
      expiry_date: activeValidaty?.day,
      offer: orderData?.offer,
      offer_type: orderData?.offer,
      discount: orderData?.discount,
      status: 1,
    };
    // console.log({ orderInfo });
    // return;
    const res = await upgradePackage(orderInfo);
    if (res?.data?.id) {
      // reset();
      try {
        let paymentInfo = {
          user_id: user?.id,
          order_id: orderData?.order_id,
          payment_type: "mobile_banking",
          amount: Number(updatedTotalAmount + percentagePrice),
          account_number: 344345678,
          account_holder_name: "John Doe", //this will be dynamic later
          bank_name: "dbbl",
          transaction_date: new Date(),
          payment_status: "pending",
          status: 0,
          transaction_id: 1, // last defined
          feature: plans,
          discount: 0,
          offer: 10,
          offer_type: "percent",
          validite_days: activeValidaty?.day,
          service_id: id,
          package_upgrade: 1,
        };
        // console.log({paymentInfo});
        const paymentResponse = await paymentPostApi(paymentInfo);
        const transId = paymentResponse?.data?.transaction_id;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/ekpay/get-token?trnsID=${transId}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data && paymentResponse?.status === true) {
          setIsLoading(false);
          let url =
            "https://sandbox.ekpay.gov.bd/ekpaypg/v1?sToken=" +
            JSON.parse(data.response).secure_token +
            "&trnsID=" +
            data.trans_id +
            "&amount=" +
            Number(updatedTotalAmount + percentagePrice);

          location.href = url;
        } else {
          setIsLoading(false);
          toast.error(paymentResponse?.message);
          console.log("Unsuccessful Response HTTP response status code-200");
        }
      } catch (error) {
        setIsLoading(false);
        console.log(`The error is: ${error}`);
      }
    }
  };

  return (
    <>
      <section>
        {isLoading && <UserApiLoading />}
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
        <div className="max-[768px]:w-[180vw] lg:w-auto flex justify-center items-center overflow-x-auto">
          <div className="w-full lg:w-[80%] flex  bg-white p-4">
            <div className="min-h-[20vh] w-full">
              <table className="w-full">
                <thead className="w-full bg-primary py-4 text-white">
                  <tr className="text-center">
                    <th className="py-4">Feature Name</th>
                    <th colSpan={4} className="py-4">
                      Plans
                    </th>
                    <th className="py-4">Price (TK)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center w-[30%] py-6 border border-l border-gray-200">
                      <div>
                        <h1 className="text-16 font-semibold">
                          Validaty (Days)
                        </h1>
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
                                <h1
                                  onClick={() => {
                                    handleDayClick(vItem?.id);
                                  }}
                                  className={`text-16 font-semibold w-20 h-20 border ${
                                    activeValidaty?.id === vItem?.id
                                      ? "border-primary"
                                      : "border-gray-300"
                                  } rounded-full flex items-center justify-center cursor-pointer`}
                                >
                                  {vItem?.day}
                                </h1>
                              </div>
                            </td>
                          );
                        })
                      : ""}
                    <td className="border border-gray-200 w-12 h-28">
                      <div className="text-center flex items-center justify-center">
                        {percentagePrice}
                        {/* {activeValidaty?.rate} */}
                      </div>
                    </td>
                  </tr>
                  {features && features?.length > 0 ? (
                    features?.map((fItem, fIndex) => {
                      let plans = JSON.parse(fItem.plans || "[]");
                      return (
                        <tr key={fIndex}>
                          <td className="text-center w-[40%] py-6 border border-l border-gray-200">
                            <div>
                              <h1 className="text-16 font-semibold">
                                {fItem?.name}( {fItem?.unit} )
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
                                          pItem?.limit || 0,
                                          pItem?.id || 0
                                        )
                                      }
                                      className={`text-16 font-semibold w-20 h-20 border ${
                                        isSelected
                                          ? "border-primary"
                                          : "border-gray-300"
                                      } rounded-full flex items-center justify-center cursor-pointer`}
                                    >
                                      {pItem?.limit}
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
                          <td className="border border-gray-200 w-12 h-28">
                            <div className="text-center flex items-center justify-center">
                              {selectedPrices[fIndex] || 0}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      {Array.from({ length: 5 }).map((_, emptyIndex) => (
                        <td
                          key={`empty-${emptyIndex}`}
                          className="border border-gray-200 w-12 h-28"
                        ></td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="w-full bg-green-100 text-gray-700 flex items-center justify-between py-4">
                <div className="w-[50%] flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <h1 className="text-16 font-semibold">Total Amount:</h1>
                    <span>{TotalAmountOld}</span>
                  </div>
                </div>
                <div className="w-[50%] flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <h1 className="text-16 font-semibold">
                      Total Updated Amount:
                    </h1>
                    <span className="text-16 font-semibold">
                      {percentagePrice + updatedTotalAmount}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-5">
                <div className="w-full">
                  <fieldset className="w-full flex flex-col border rounded-md px-2">
                    <legend>
                      <label
                        htmlFor="ServiceName"
                        className="after:content-['_*'] after:text-red-500"
                      >
                        Name
                      </label>
                    </legend>
                    <input
                      type="text"
                      value={orderData?.billing_address?.name}
                      placeholder="Service Name"
                      className="outline-none px-2 py-1 cursor-not-allowed bg-gray-200/50"
                      disabled
                    />
                  </fieldset>
                </div>
                <div className="w-full">
                  <fieldset className="w-full flex flex-col border rounded-md px-2">
                    <legend>
                      <label
                        htmlFor="ServiceName"
                        className="after:content-['_*'] after:text-red-500"
                      >
                        Email
                      </label>
                    </legend>
                    <input
                      type="text"
                      placeholder="Email"
                      value={orderData?.billing_address?.email}
                      className="outline-none px-2 py-1 cursor-not-allowed bg-gray-200/50"
                      disabled
                    />
                  </fieldset>
                </div>
                <div className="w-full">
                  <fieldset className="w-full flex flex-col border rounded-md px-2">
                    <legend>
                      <label
                        htmlFor="ServiceName"
                        className="after:content-['_*'] after:text-red-500"
                      >
                        Phone
                      </label>
                    </legend>
                    <input
                      type="text"
                      placeholder="Phone"
                      value={orderData?.billing_address?.phone}
                      className="outline-none px-2 py-1 cursor-not-allowed bg-gray-200/50"
                      disabled
                    />
                  </fieldset>
                </div>
              </div>
              <div className="w-full">
                <fieldset className="w-full flex flex-col border rounded-md px-2">
                  <legend>
                    <label
                      htmlFor="ServiceName"
                      className="after:content-['_*'] after:text-red-500"
                    >
                      Address
                    </label>
                  </legend>
                  <textarea
                    placeholder="Address"
                    value={orderData?.billing_address?.address}
                    className="outline-none px-2 py-1 cursor-not-allowed bg-gray-200/50"
                    disabled
                  ></textarea>
                </fieldset>
              </div>
              <div className="flex justify-end pt-5">
                <button
                  onClick={(e) => {
                    handleOrderNow();
                  }}
                  className={`text-white font-bold text-[24px] px-8 py-2 rounded bg-[#04684D]`}
                >
                  Upgrade Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpgreadList;
