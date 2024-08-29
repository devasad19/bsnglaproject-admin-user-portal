"use client";

import Image from "next/image";
import { relative_image_path } from "@/helper";
import Link from "next/link";
import Modal from "@/app/_components/Modal/Modal";

const Home = (): JSX.Element => {
  const AddUser = (): void => {
    console.log("add user");
  };

  const UpdateUser = (): void => {
    console.log("update user");
  };

  return (
    <div className="bg-white p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-10">
        <h3 className="text-24 font-bold">অনুমতি পরিচালনা</h3>
        <div className="space-x-4">
          <Modal
            id={"1"}
            trigger={"প্যারেন্ট অনুমতি তৈরি করুন"}
            title={"প্যারেন্ট অনুমতির নাম তৈরি করুন"}
            subFunc={AddUser}
            subFuncTitle={"সংরক্ষণ করুন"}
          >
            <div className="pt-3 flex flex-col gap-3">
              <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                <legend>
                  <label
                    htmlFor=""
                    className="after:content-['_*'] after:text-red-400"
                  >
                    প্যারেন্ট নাম
                  </label>
                </legend>
                <input
                  type="text"
                  className="w-full text-14 outline-none py-1"
                  placeholder="প্যারেন্ট অনুমতির প্রদর্শনী নাম লিখুন"
                />
              </fieldset>
            </div>
          </Modal>
          <Modal
            id={"2"}
            trigger={"অনুমতি তৈরি করুন"}
            title={"অনুমতি তৈরি করুন"}
            subFunc={AddUser}
            subFuncTitle={"সংরক্ষণ করুন"}
          >
            <div className="pt-3 flex flex-col gap-3">
              <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                <legend>
                  <label
                    htmlFor=""
                    className="after:content-['_*'] after:text-red-400"
                  >
                    প্যারেন্ট অনুমতির নাম  
                  </label>
                </legend>
                <select name="" id="" className="w-full bg-white py-2">
                  <option value="1">parent 1</option>
                  <option value="2">parent 2</option>
                  <option value="3">parent 3</option>
                </select>
              </fieldset>
              <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                <legend>
                  <label
                    htmlFor=""
                    className="after:content-['_*'] after:text-red-400"
                  >
                    প্রদর্শনী নাম
                  </label>
                </legend>
                <input
                  type="text"
                  className="w-full text-14 outline-none py-1"
                  placeholder="অনুমতির প্রদর্শনী নাম লিখুন"
                />
              </fieldset>
              <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                <legend>
                  <label
                    htmlFor=""
                    className="after:content-['_*'] after:text-red-400"
                  >
                    অনুমতি নাম
                  </label>
                </legend>
                <input
                  type="text"
                  className="w-full text-14 outline-none py-1"
                  placeholder="Enter Permission Name"
                />
              </fieldset>
            </div>
          </Modal>
        </div>
      </div>
      <div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-center">
            <thead>
              <tr className="bg-[#E1F6F9] h-12">
                <th>#</th>
                <th>প্রদর্শনী নাম</th>
                <th>অনুমতি নাম</th>
                <th>প্প্যারেন্ট অনুমতির নাম</th>
                <th>স্ট্যাটাস</th>
                <th>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-16 border-b border-gray-300 hover:bg-gray-100">
                <td>1</td>
                <td>Demo Role</td>
                <td>Demo Role bangla</td>
                <td>Demo producer</td>
                <td>
                  <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                    সক্রিয়
                  </span>
                </td>
                <td className="flex items-center justify-center my-2">
                  <div className="flex flex-col gap-2">
                    <Modal
                      id={"3"}
                      trigger={"সংশোধন"}
                      title={"অনুমতি সংশোধন"}
                      subFunc={UpdateUser}
                      subFuncTitle={"সংরক্ষণ করুন"}
                    >
                      <div className="pt-3 flex flex-col gap-3">
                        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                          <legend>
                            <label
                              htmlFor=""
                              className="after:content-['_*'] after:text-red-400"
                            >
                              প্যারেন্ট অনুমতির নাম
                            </label>
                          </legend>
                          <select
                            name=""
                            id=""
                            className="w-full bg-white py-2"
                          >
                            <option value="1">parent 1</option>
                            <option value="2">parent 2</option>
                            <option value="3">parent 3</option>
                          </select>
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                          <legend>
                            <label
                              htmlFor=""
                              className="after:content-['_*'] after:text-red-400"
                            >
                              প্রদর্শনী নাম
                            </label>
                          </legend>
                          <input
                            type="text"
                            className="w-full text-14 outline-none py-1"
                            placeholder="অনুমতির প্রদর্শনী নাম লিখুন"
                          />
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                          <legend>
                            <label
                              htmlFor=""
                              className="after:content-['_*'] after:text-red-400"
                            >
                              অনুমতি নাম
                            </label>
                          </legend>
                          <input
                            type="text"
                            className="w-full text-14 outline-none py-1"
                            placeholder="Enter Permission Name"
                          />
                        </fieldset>
                      </div>
                    </Modal>
                    <button
                      onClick={() => {
                        confirm("Are you sure?");
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      মুছে ফেলুন
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="h-16 border-b border-gray-300 hover:bg-gray-100">
                <td>2</td>
                <td>Demo Role</td>
                <td>Demo Role bangla</td>
                <td>Demo producer</td>
                <td>
                  <span className="bg-violet-500 text-white px-2 py-1 rounded-md">
                    নিষ্ক্রিয়
                  </span>
                </td>
                <td className="flex items-center justify-center my-2">
                  <div className="flex flex-col gap-2">
                    <Modal
                      id={"3"}
                      trigger={"সংশোধন"}
                      title={"অনুমতি সংশোধন"}
                      subFunc={UpdateUser}
                      subFuncTitle={"সংরক্ষণ করুন"}
                    >
                      <div className="pt-3 flex flex-col gap-3">
                        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                          <legend>
                            <label
                              htmlFor=""
                              className="after:content-['_*'] after:text-red-400"
                            >
                              প্যারেন্ট অনুমতির নাম
                            </label>
                          </legend>
                          <select
                            name=""
                            id=""
                            className="w-full bg-white py-2"
                          >
                            <option value="1">parent 1</option>
                            <option value="2">parent 2</option>
                            <option value="3">parent 3</option>
                          </select>
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                          <legend>
                            <label
                              htmlFor=""
                              className="after:content-['_*'] after:text-red-400"
                            >
                              প্রদর্শনী নাম
                            </label>
                          </legend>
                          <input
                            type="text"
                            className="w-full text-14 outline-none py-1"
                            placeholder="অনুমতির প্রদর্শনী নাম লিখুন"
                          />
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                          <legend>
                            <label
                              htmlFor=""
                              className="after:content-['_*'] after:text-red-400"
                            >
                              অনুমতি নাম
                            </label>
                          </legend>
                          <input
                            type="text"
                            className="w-full text-14 outline-none py-1"
                            placeholder="Enter Permission Name"
                          />
                        </fieldset>
                      </div>
                    </Modal>
                    <button
                      onClick={() => {
                        confirm("Are you sure?");
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      মুছে ফেলুন
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="h-16 border-b border-gray-300 hover:bg-gray-100">
                <td>3</td>
                <td>Demo Role</td>
                <td>Demo Role bangla</td>
                <td>Demo producer</td>
                <td>
                  <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                    সক্রিয়
                  </span>
                </td>
                <td className="flex items-center justify-center my-2">
                  <div className="flex flex-col gap-2">
                    <Modal
                      id={"3"}
                      trigger={"সংশোধন"}
                      title={"অনুমতি সংশোধন"}
                      subFunc={UpdateUser}
                      subFuncTitle={"সংরক্ষণ করুন"}
                    >
                      <div className="pt-3 flex flex-col gap-3">
                        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                          <legend>
                            <label
                              htmlFor=""
                              className="after:content-['_*'] after:text-red-400"
                            >
                              প্যারেন্ট অনুমতির নাম
                            </label>
                          </legend>
                          <select
                            name=""
                            id=""
                            className="w-full bg-white py-2"
                          >
                            <option value="1">parent 1</option>
                            <option value="2">parent 2</option>
                            <option value="3">parent 3</option>
                          </select>
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                          <legend>
                            <label
                              htmlFor=""
                              className="after:content-['_*'] after:text-red-400"
                            >
                              প্রদর্শনী নাম
                            </label>
                          </legend>
                          <input
                            type="text"
                            className="w-full text-14 outline-none py-1"
                            placeholder="অনুমতির প্রদর্শনী নাম লিখুন"
                          />
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                          <legend>
                            <label
                              htmlFor=""
                              className="after:content-['_*'] after:text-red-400"
                            >
                              অনুমতি নাম
                            </label>
                          </legend>
                          <input
                            type="text"
                            className="w-full text-14 outline-none py-1"
                            placeholder="Enter Permission Name"
                          />
                        </fieldset>
                      </div>
                    </Modal>
                    <button
                      onClick={() => {
                        confirm("Are you sure?");
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      মুছে ফেলুন
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="h-16 border-b border-gray-300 hover:bg-gray-100">
                <td>4</td>
                <td>Demo Role</td>
                <td>Demo Role bangla</td>
                <td>Demo producer</td>
                <td>
                  <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                    সক্রিয়
                  </span>
                </td>
                <td className="flex items-center justify-center my-2">
                  <div className="flex flex-col gap-2">
                    <Modal
                      id={"3"}
                      trigger={"সংশোধন"}
                      title={"অনুমতি সংশোধন"}
                      subFunc={UpdateUser}
                      subFuncTitle={"সংরক্ষণ করুন"}
                    >
                      <div className="pt-3 flex flex-col gap-3">
                        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                          <legend>
                            <label
                              htmlFor=""
                              className="after:content-['_*'] after:text-red-400"
                            >
                              প্যারেন্ট অনুমতির নাম
                            </label>
                          </legend>
                          <select
                            name=""
                            id=""
                            className="w-full bg-white py-2"
                          >
                            <option value="1">parent 1</option>
                            <option value="2">parent 2</option>
                            <option value="3">parent 3</option>
                          </select>
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                          <legend>
                            <label
                              htmlFor=""
                              className="after:content-['_*'] after:text-red-400"
                            >
                              প্রদর্শনী নাম
                            </label>
                          </legend>
                          <input
                            type="text"
                            className="w-full text-14 outline-none py-1"
                            placeholder="অনুমতির প্রদর্শনী নাম লিখুন"
                          />
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                          <legend>
                            <label
                              htmlFor=""
                              className="after:content-['_*'] after:text-red-400"
                            >
                              অনুমতি নাম
                            </label>
                          </legend>
                          <input
                            type="text"
                            className="w-full text-14 outline-none py-1"
                            placeholder="Enter Permission Name"
                          />
                        </fieldset>
                      </div>
                    </Modal>
                    <button
                      onClick={() => {
                        confirm("Are you sure?");
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      মুছে ফেলুন
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="h-16 border-b border-gray-300 hover:bg-gray-100">
                <td>5</td>
                <td>Demo Role</td>
                <td>Demo Role bangla</td>
                <td>Demo producer</td>
                <td>
                  <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                    সক্রিয়
                  </span>
                </td>
                <td className="flex items-center justify-center my-2">
                  <div className="flex flex-col gap-2">
                    <Modal
                      id={"3"}
                      trigger={"সংশোধন"}
                      title={"অনুমতি সংশোধন"}
                      subFunc={UpdateUser}
                      subFuncTitle={"সংরক্ষণ করুন"}
                    >
                      <div className="pt-3 flex flex-col gap-3">
                        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                          <legend>
                            <label
                              htmlFor=""
                              className="after:content-['_*'] after:text-red-400"
                            >
                              প্যারেন্ট অনুমতির নাম
                            </label>
                          </legend>
                          <select
                            name=""
                            id=""
                            className="w-full bg-white py-2"
                          >
                            <option value="1">parent 1</option>
                            <option value="2">parent 2</option>
                            <option value="3">parent 3</option>
                          </select>
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                          <legend>
                            <label
                              htmlFor=""
                              className="after:content-['_*'] after:text-red-400"
                            >
                              প্রদর্শনী নাম
                            </label>
                          </legend>
                          <input
                            type="text"
                            className="w-full text-14 outline-none py-1"
                            placeholder="অনুমতির প্রদর্শনী নাম লিখুন"
                          />
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-300 rounded-md px-2">
                          <legend>
                            <label
                              htmlFor=""
                              className="after:content-['_*'] after:text-red-400"
                            >
                              অনুমতি নাম
                            </label>
                          </legend>
                          <input
                            type="text"
                            className="w-full text-14 outline-none py-1"
                            placeholder="Enter Permission Name"
                          />
                        </fieldset>
                      </div>
                    </Modal>
                    <button
                      onClick={() => {
                        confirm("Are you sure?");
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      মুছে ফেলুন
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
