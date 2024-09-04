"use client";

import Image from "next/image";
import { modelOpen, relative_image_path } from "@/helper";
import Link from "next/link";
import Modal from "@/app/_components/Modal/Modal";
import { useRef } from "react";

const Home = () => {
  const addModal = useRef<any>(null);
  const updateModal = useRef<any>(null);
  const protectedModal = useRef<any>(null);

  const addModelForm = useRef<any>(null);
  const updateModalForm = useRef<any>(null);
  const protectedModalForm = useRef<any>(null);

  const AddUser = () => {
    console.log("add user");
  };

  const UpdateUser = () => {
    console.log("update user");
  };

  return (
    <>
      <div className="bg-white p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-10">
          <h3 className="text-24 font-bold">ভুমিকা পরিচালনা</h3>
          <button
            onClick={() => modelOpen(addModal)}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            ভুমিকা তৈরি করুন
          </button>
        </div>
        <div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="bg-[#E1F6F9] h-12">
                  <th>#</th>
                  <th>ভুমিকা নাম (ইংরেজি)</th>
                  <th>ভুমিকা নাম (বাংলা)</th>
                  <th>প্রস্তুতকারক</th>
                  <th>স্ট্যাটাস</th>
                  <th>ক্রিয়াকলাপ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-16 border-b border-gray-300 hover:bg-gray-100">
                  <td>1</td>
                  <td>Demo Role</td>
                  <td>Demo Role bangla</td>
                  <td>Demo producer</td>
                  <td>
                    <span className="bg-green-500 text-white px-2 py-1 text-14 rounded-md">
                      সক্রিয়
                    </span>
                  </td>
                  <td className="flex items-center justify-center my-2">
                    <div className="flex flex-col gap-2">
                      <button onClick={() => modelOpen(updateModal)} className="bg-primary text-14 text-white p-2 rounded-md">
                        সংশোধন
                      </button>

                      
                      <div className="flex gap-2">
                        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 rounded-md text-14 text-white">
                          অনুমতি সংশোধন
                        </button>
                        {/* <Modal
                        id={"2"}
                        trigger={"অনুমতি সংশোধন"}
                        title={"অনুমতি প্রদান পরিচালনা করুন"}
                        subFunc={UpdateUser}
                        subFuncTitle={"Update"}
                      >
                        <div className="pt-3">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="border border-gray-300 rounded-md">
                              <div>
                                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                                  Setting 1
                                </h3>
                              </div>
                              <ul className="p-2">
                                <li className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <label htmlFor="">lorem 1</label>
                                </li>
                                <li className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <label htmlFor="">lorem 2</label>
                                </li>
                                <li className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <label htmlFor="">lorem 3</label>
                                </li>
                              </ul>
                            </div>
                            <div className="border border-gray-300 rounded-md">
                              <div>
                                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                                  Setting 1
                                </h3>
                              </div>
                              <ul className="p-2">
                                <li className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <label htmlFor="">lorem 1</label>
                                </li>
                                <li className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <label htmlFor="">lorem 2</label>
                                </li>
                                <li className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <label htmlFor="">lorem 3</label>
                                </li>
                              </ul>
                            </div>
                            <div className="border border-gray-300 rounded-md">
                              <div>
                                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                                  Setting 1
                                </h3>
                              </div>
                              <ul className="p-2">
                                <li className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <label htmlFor="">lorem 1</label>
                                </li>
                                <li className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <label htmlFor="">lorem 2</label>
                                </li>
                                <li className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <label htmlFor="">lorem 3</label>
                                </li>
                              </ul>
                            </div>
                            <div className="border border-gray-300 rounded-md">
                              <div>
                                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                                  Setting 1
                                </h3>
                              </div>
                              <ul className="p-2">
                                <li className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <label htmlFor="">lorem 1</label>
                                </li>
                                <li className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <label htmlFor="">lorem 2</label>
                                </li>
                                <li className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <label htmlFor="">lorem 3</label>
                                </li>
                              </ul>
                            </div>
                            <div className="border border-gray-300 rounded-md">
                              <div>
                                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                                  Setting 1
                                </h3>
                              </div>
                              <ul className="p-2">
                                <li className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <label htmlFor="">lorem 1</label>
                                </li>
                                <li className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <label htmlFor="">lorem 2</label>
                                </li>
                                <li className="flex items-center gap-2">
                                  <input type="checkbox" />
                                  <label htmlFor="">lorem 3</label>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Modal> */}

                        <button
                          onClick={() => {
                            confirm("Are you sure?");
                          }}
                          className="bg-red-500 text-white px-2 py-1 text-14 rounded-md"
                        >
                          মুছে ফেলুন
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* add modal start */}
      <Modal
        modalRef={addModal}
        modalForm={addModelForm}
        title="ভুমিকা তৈরি করুন"
      >
        <form className="pt-3" ref={addModelForm}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 border-b border-gray-300 pb-5 mb-5">
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="NameBangla"
                  className="after:content-['_*'] after:text-red-400"
                >
                  ভুমিকা নাম (বাংলা)
                </label>
              </legend>
              <input
                type="text"
                id="NameBangla"
                className="w-full outline-none text-14 py-1"
                placeholder="ভুমিকার নাম লিখুন"
              />
            </fieldset>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="NameBangla"
                  className="after:content-['_*'] after:text-red-400"
                >
                  ভুমিকা নাম (ইংরেজি)
                </label>
              </legend>
              <input
                type="text"
                id="NameBangla"
                className="w-full outline-none text-14 py-1"
                placeholder="Enter Name of The Role"
              />
            </fieldset>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="border border-gray-300 rounded-md">
              <div>
                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                  Setting 1
                </h3>
              </div>
              <ul className="p-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 1</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 2</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 3</label>
                </li>
              </ul>
            </div>
            <div className="border border-gray-300 rounded-md">
              <div>
                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                  Setting 1
                </h3>
              </div>
              <ul className="p-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 1</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 2</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 3</label>
                </li>
              </ul>
            </div>
            <div className="border border-gray-300 rounded-md">
              <div>
                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                  Setting 1
                </h3>
              </div>
              <ul className="p-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 1</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 2</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 3</label>
                </li>
              </ul>
            </div>
            <div className="border border-gray-300 rounded-md">
              <div>
                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                  Setting 1
                </h3>
              </div>
              <ul className="p-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 1</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 2</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 3</label>
                </li>
              </ul>
            </div>
            <div className="border border-gray-300 rounded-md">
              <div>
                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                  Setting 1
                </h3>
              </div>
              <ul className="p-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 1</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 2</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 3</label>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </Modal>
      {/* add modal end */}

      {/* update modal start */}
      <Modal
        modalRef={updateModal}
        modalForm={updateModalForm}
        title="ভুমিকা সংশোধন"
      >
        <form className="pt-3" ref={updateModalForm}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 border-b border-gray-300 pb-5 mb-5">
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="NameBangla"
                  className="after:content-['_*'] after:text-red-400"
                >
                  ভুমিকা নাম (বাংলা)
                </label>
              </legend>
              <input
                type="text"
                id="NameBangla"
                className="w-full outline-none text-14 py-1"
                placeholder="ভুমিকার নাম লিখুন"
              />
            </fieldset>
            <fieldset className="flex flex-col border rounded-md px-2">
              <legend>
                <label
                  htmlFor="NameBangla"
                  className="after:content-['_*'] after:text-red-400"
                >
                  ভুমিকা নাম (ইংরেজি)
                </label>
              </legend>
              <input
                type="text"
                id="NameBangla"
                className="w-full outline-none text-14 py-1"
                placeholder="Enter Name of The Role"
              />
            </fieldset>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="border border-gray-300 rounded-md">
              <div>
                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                  Setting 1
                </h3>
              </div>
              <ul className="p-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 1</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 2</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 3</label>
                </li>
              </ul>
            </div>
            <div className="border border-gray-300 rounded-md">
              <div>
                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                  Setting 1
                </h3>
              </div>
              <ul className="p-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 1</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 2</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 3</label>
                </li>
              </ul>
            </div>
            <div className="border border-gray-300 rounded-md">
              <div>
                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                  Setting 1
                </h3>
              </div>
              <ul className="p-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 1</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 2</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 3</label>
                </li>
              </ul>
            </div>
            <div className="border border-gray-300 rounded-md">
              <div>
                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                  Setting 1
                </h3>
              </div>
              <ul className="p-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 1</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 2</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 3</label>
                </li>
              </ul>
            </div>
            <div className="border border-gray-300 rounded-md">
              <div>
                <h3 className="bg-gradient-to-r from-indigo-500 to-blue-500 py-3 text-center rounded-t-md">
                  Setting 1
                </h3>
              </div>
              <ul className="p-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 1</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 2</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">lorem 3</label>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </Modal>
      {/* update modal end */}
    </>
  );
};

export default Home;
