"use client";

import Image from "next/image";
import { relative_image_path } from "@/helper";
import { usePDF } from "react-to-pdf";

const Home = ({ params }) => {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const PrintInvoice = () => {
    var printContents = document.getElementById("invoice").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    // return false;
    window.location.reload();
  };

  return (
    <section>
      <div className="w-full">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-2 lg:gap-0 pb-5">
          <h3 className="text-20 lg:text-[28px] font-bold">
            Bill No: {params.id}
          </h3>
          <div className="flex gap-4">
            <button
              onClick={PrintInvoice}
              className="bg-blue-500 text-white text-14 lg:text-16 px-2 py-1 lg:px-4 lg:py-2 rounded active:scale-75 transition-all duration-300"
            >
              Print
            </button>
            <button
              onClick={() => toPDF()}
              className="bg-blue-500 text-white text-14 lg:text-16 px-2 py-1 lg:px-4 lg:py-2 rounded active:scale-75 transition-all duration-300"
            >
              Download
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center text-14">
          <div
            ref={targetRef}
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
                  <p>Address Line 1,Address Line 2,Address Line 3,</p>
                  <p>Phone: 0123456789</p>
                  <p>Email: 0jLb7@example.com</p>
                  <p>www.bangla.com</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-20 text-red-500 font-bold">Invoice</h3>
                  <p className="">Invoice No: 123456789</p>
                  <p className="">Invoice Date: 2022-01-01</p>
                </div>
              </div>
              <div className="w-full flex flex-col ">
                <p>Name: রহিম</p>
                <div className="grid grid-cols-2">
                  <p>Phone: 0123456789</p>
                  <p>Email: 0jLb7@example.com</p>
                </div>
                <p>Address: Address Line 1,Address Line 2,Address Line 3</p>
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
                    <tr className="h-52">
                      <td className="border border-gray-500">1</td>
                      <td className="border border-gray-500">Text To Speach</td>
                      <td className="border border-gray-500">Advance</td>
                      <td className="border border-gray-500">10</td>
                      <td className="border border-gray-500">1</td>
                      <td className="border border-gray-500">10</td>
                    </tr>
                    <tr className="border border-gray-500 h-10">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="border border-gray-500">Total</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <div className="border-b border-gray-500 h-10 flex items-center">
                  <p>Taka in Words: </p>
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
      </div>
    </section>
  );
};

export default Home;
