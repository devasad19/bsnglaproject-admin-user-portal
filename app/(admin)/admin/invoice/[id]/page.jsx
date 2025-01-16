"use client";
import Image from "next/image";
import { formatDate, relative_image_path, textFormat } from "@/helper";
import { usePDF } from "react-to-pdf";
import { getSingleOrderByIdApi } from "@/app/(portal)/_api";
import { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { getInvoiceDetails } from "@/app/(user)/_api/accountService";
import PaymentHisSkeleton from "@/app/(user)/component/PaymentHistorySkeleton/PaymentHisSkeleton";
import html2canvas from "html2canvas";
import { convertNumberToWords } from "@/utilis/ConvertNumbertoword";


const Home = ({ params: { id } }) => {
  const [data, setData] = useState();
  const [plan, setPlan] = useState();
  const [loading, setLoading] = useState(true);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const divRef = useRef();

  const handleDownloadPDF = async () => {
    const div = divRef.current;
    if (!div) return;

    // Capture the div as a canvas image
    const canvas = await html2canvas(div);
    const imgData = canvas.toDataURL("image/png");

    // Generate PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("citizen-invoice.pdf");
  };

  const PrintInvoice = () => {
    const PrintableDiv = document.getElementById("invoice");
    var printContents = PrintableDiv.innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    // return false;
    window.location.reload();
  };

  console.log({ id });

  /* useEffect(()=> {
    getSingleOrderByIdApi(id).then((res) => {
      setOrder(res.data);
      setPlan(JSON.parse(res.data?.plans));
    }).catch((err) => console.log(err));
  },[id]) */

  useEffect(() => {
    setLoading(true);
    getInvoiceDetails(id)
      .then((res) => {
        // console.log(res?.data);
        setLoading(false);
        setData(res.data);

        setPlan(res.data?.plans ? JSON.parse(res.data?.plans) : []);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    setLoading(false);
  }, [id]);
  console.log({ data, plan });

  return (
    <>
      <section>
        <div className="w-full">
          {loading ? (
            <PaymentHisSkeleton />
          ) : (
            <>
              <div className="flex flex-col lg:flex-row lg:justify-between gap-2 lg:gap-0 pb-5">
                <h3 className="text-20 lg:text-[28px] font-bold">
                  Bill No: {id}
                </h3>
                <div className="flex gap-4">
                  <button
                    onClick={PrintInvoice}
                    className="bg-blue-500 text-white text-14 lg:text-16 px-2 py-1 lg:px-4 lg:py-2 rounded active:scale-75 transition-all duration-300"
                  >
                    Print
                  </button>
                  <button
                    // onClick={() => HandlePdfDownload("invoice")}
                    onClick={handleDownloadPDF}
                    className="bg-blue-500 text-white text-14 lg:text-16 px-2 py-1 lg:px-4 lg:py-2 rounded active:scale-75 transition-all duration-300"
                  >
                    Download
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center text-14">
                <div
                  ref={divRef}
                  id="invoice"
                  className="w-2/3 bg-white p-6 shadow-lg rounded-md"
                >
                  <div className="pb-5">
                    <div className="w-24 flex flex-col items-center gap-1 pb-3">
                      <Image
                        src={relative_image_path("logo.png")}
                        className="h-10"
                        width={1000}
                        height={1000}
                        alt="Bangla"
                      />
                      <p className="">Bangla Project</p>
                    </div>
                    <div className="grid grid-cols-2 pb-5">
                      <div className="flex flex-col gap-1 ">
                        <p>
                          Address: ICT Tower,9th Floor, E-14/X, Sher-E-Bangla
                          nagar, Dhaka-1207
                        </p>
                        <p>Phone: +88-02-55006880</p>
                        <p>Email: pdeblict@bcc.net.bd</p>
                        <p>www.bangla.com</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-20 text-red-500 font-bold">
                          Invoice
                        </h3>
                        <p className="">Invoice No: {data?.invoice_no}</p>
                        <p className="">
                          Invoice Date: {formatDate(data?.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex flex-col ">
                      <p>Name: {data?.citizen_name}</p>
                      <div className="grid grid-cols-2">
                        <p>Phone: {data?.phone}</p>
                        <p>Email: {data?.email}</p>
                      </div>
                      <p>Address: {data?.address}</p>
                    </div>
                  </div>
                  <div>
                    <div className="w-full overflow-x-auto pb-5">
                      <table className="w-full text-center border-collapse">
                        <thead>
                          <tr className="border border-gray-500 h-10">
                            <th className="border border-gray-500">SI</th>
                            <th className="border border-gray-500">Service</th>
                            <th className="border border-gray-500">Plan</th>
                            <th className="border border-gray-500">Price</th>
                            <th className="border border-gray-500">Quantity</th>
                            <th className="border border-gray-500">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {plan?.length > 0 &&
                            plan.map((item, index) => (
                              <tr className="h-14" key={index}>
                                <td className="border border-gray-500">
                                  {index + 1}
                                </td>
                                <td className="border border-gray-500">
                                  {data?.service_name}
                                </td>
                                <td className="border border-gray-500">
                                  {data?.feature_name}
                                </td>
                                <td className="border border-gray-500">
                                  {item?.price || 0}
                                </td>
                                <td className="border border-gray-500">1</td>
                                <td className="border border-gray-500">
                                  {item?.price || 0}
                                </td>
                              </tr>
                            ))}
                          <tr className="border border-gray-500 h-10">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="border border-gray-500">Total</td>
                            <td>{data?.total}</td>
                          </tr>
                        </tbody>

                        {/* <tbody>
                      <tr className="h-52">
                        <td className="border border-gray-500">1</td>
                        <td className="border border-gray-500">
                          {data?.service_name}
                        </td>
                        <td className="border border-gray-500">
                          {data?.feature_name}
                        </td>
                        <td className="border border-gray-500">
                          {plan[0]?.price || 0}
                        </td>
                        <td className="border border-gray-500">1</td>
                        <td className="border border-gray-500">
                          {plan[0]?.price || 0}
                        </td>
                      </tr>
                      <tr className="border border-gray-500 h-10">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="border border-gray-500">Total</td>
                        <td>{data?.total}</td>
                      </tr>
                    </tbody> */}
                      </table>
                      <div className="border-b border-gray-500 h-10 flex items-center">
                        <p>Taka in Words: {textFormat(convertNumberToWords(data?.total))} Taka Only</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p>Terms and Conditions</p>
                        <ul className="list-disc list-inside">
                          <li>Lorem ipsum dolor sit amet</li>
                          <li>Lorem ipsum dolor sit amet</li>
                          <li>Lorem ipsum dolor sit amet</li>
                        </ul>
                      </div>
                      <div className="pr-4 flex flex-col items-center">
                        <Image
                          src={relative_image_path("sign.jpg")}
                          className="w-32 h-20"
                          width={1000}
                          height={1000}
                          alt="Bangla"
                        />
                        <p>Signature</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
