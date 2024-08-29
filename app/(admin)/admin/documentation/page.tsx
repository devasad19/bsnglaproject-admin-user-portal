'use client';
import Modal from "@/app/_components/Modal/Modal";
const Home = (): JSX.Element => {
  const AddDoc = () => console.log("add doc");
  const UpdateDoc = () => console.log("update doc");
  const DeleteDoc = () => confirm("delete doc");
    return (
      <div className="bg-white p-2 lg:p-4 rounded shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-0 pb-5">
          <div className="lg:col-span-11 lg:flex lg:justify-center">
            <h1 className="text-20 lg:text-3xl">Documentation</h1>
          </div>
          {/* <div>
            <Modal
              id={1}
              trigger={"Add"}
              title={"Add Documentation"}
              subFunc={AddDoc}
              subFuncTitle={"Add"}
            >
              <div className="pt-3">
                <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                  <legend>
                    <label htmlFor="">Title</label>
                  </legend>
                  <input
                    type="text"
                    className="w-full outline-none text-14 py-1"
                    placeholder="Enter Title"
                  />
                </fieldset>
                <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                  <legend>
                    <label htmlFor="">Description</label>
                  </legend>
                  <textarea
                    name=""
                    id=""
                    placeholder="Enter Description"
                    className="outline-none text-14 py-1text-14 py-1"
                  ></textarea>
                </fieldset>
              </div>
            </Modal>
          </div> */}
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-blue-500 text-white h-10 table-row">
                <th className="text-center">SI</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-100 h-16">
                <td className="text-center">
                  <span className="bg-blue-100 px-2 py-1 rounded-full">1</span>
                </td>
                <td>How to open account?</td>
                <td>To open an account in Bangla you have to register.</td>
                <td>
                  <div className="flex gap-1">
                    {/* <Modal
                      id={2}
                      trigger={"Update"}
                      title={"Update Documentation"}
                      subFunc={UpdateDoc}
                      subFuncTitle={"Update"}
                    >
                      <div className="pt-3">
                        <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                          <legend>
                            <label htmlFor="">Title</label>
                          </legend>
                          <input
                            type="text"
                            className="w-full outline-none text-14 py-1"
                            placeholder="Enter Title"
                          />
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                          <legend>
                            <label htmlFor="">Description</label>
                          </legend>
                          <textarea
                            name=""
                            id=""
                            placeholder="Enter Description"
                            className="outline-none text-14 py-1text-14 py-1"
                          ></textarea>
                        </fieldset>
                      </div>
                    </Modal> */}
                    <button onClick={DeleteDoc} className="bg-red-500 text-white px-4 py-2 rounded-md">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-slate-100 h-16">
                <td className="text-center">
                  <span className="bg-blue-100 px-2 py-1 rounded-full">2</span>
                </td>
                <td>How to open account?</td>
                <td>To open an account in Bangla you have to register.</td>
                <td>
                  <div className="flex gap-1">
                    {/* <Modal
                      id={2}
                      trigger={"Update"}
                      title={"Update Documentation"}
                      subFunc={UpdateDoc}
                      subFuncTitle={"Update"}
                    >
                      <div className="pt-3">
                        <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                          <legend>
                            <label htmlFor="">Title</label>
                          </legend>
                          <input
                            type="text"
                            className="w-full outline-none text-14 py-1"
                            placeholder="Enter Title"
                          />
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                          <legend>
                            <label htmlFor="">Description</label>
                          </legend>
                          <textarea
                            name=""
                            id=""
                            placeholder="Enter Description"
                            className="outline-none text-14 py-1text-14 py-1"
                          ></textarea>
                        </fieldset>
                      </div>
                    </Modal> */}
                    <button onClick={DeleteDoc} className="bg-red-500 text-white px-4 py-2 rounded-md">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-slate-100 h-16">
                <td className="text-center">
                  <span className="bg-blue-100 px-2 py-1 rounded-full">3</span>
                </td>
                <td>How to open account?</td>
                <td>To open an account in Bangla you have to register.</td>
                <td>
                  <div className="flex gap-1">
                    {/* <Modal
                      id={2}
                      trigger={"Update"}
                      title={"Update Documentation"}
                      subFunc={UpdateDoc}
                      subFuncTitle={"Update"}
                    >
                      <div className="pt-3">
                        <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                          <legend>
                            <label htmlFor="">Title</label>
                          </legend>
                          <input
                            type="text"
                            className="w-full outline-none text-14 py-1"
                            placeholder="Enter Title"
                          />
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                          <legend>
                            <label htmlFor="">Description</label>
                          </legend>
                          <textarea
                            name=""
                            id=""
                            placeholder="Enter Description"
                            className="outline-none text-14 py-1text-14 py-1"
                          ></textarea>
                        </fieldset>
                      </div>
                    </Modal> */}
                    <button onClick={DeleteDoc} className="bg-red-500 text-white px-4 py-2 rounded-md">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-slate-100 h-16">
                <td className="text-center">
                  <span className="bg-blue-100 px-2 py-1 rounded-full">4</span>
                </td>
                <td>How to open account?</td>
                <td>To open an account in Bangla you have to register.</td>
                <td>
                  <div className="flex gap-1">
                    {/* <Modal
                      id={2}
                      trigger={"Update"}
                      title={"Update Documentation"}
                      subFunc={UpdateDoc}
                      subFuncTitle={"Update"}
                    >
                      <div className="pt-3">
                        <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                          <legend>
                            <label htmlFor="">Title</label>
                          </legend>
                          <input
                            type="text"
                            className="w-full outline-none text-14 py-1"
                            placeholder="Enter Title"
                          />
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                          <legend>
                            <label htmlFor="">Description</label>
                          </legend>
                          <textarea
                            name=""
                            id=""
                            placeholder="Enter Description"
                            className="outline-none text-14 py-1text-14 py-1"
                          ></textarea>
                        </fieldset>
                      </div>
                    </Modal> */}
                    <button onClick={DeleteDoc} className="bg-red-500 text-white px-4 py-2 rounded-md">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-slate-100 h-16">
                <td className="text-center">
                  <span className="bg-blue-100 px-2 py-1 rounded-full">5</span>
                </td>
                <td>How to open account?</td>
                <td>To open an account in Bangla you have to register.</td>
                <td>
                  <div className="flex gap-1">
                    {/* <Modal
                      id={2}
                      trigger={"Update"}
                      title={"Update Documentation"}
                      subFunc={UpdateDoc}
                      subFuncTitle={"Update"}
                    >
                      <div className="pt-3">
                        <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                          <legend>
                            <label htmlFor="">Title</label>
                          </legend>
                          <input
                            type="text"
                            className="w-full outline-none text-14 py-1"
                            placeholder="Enter Title"
                          />
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-400 rounded-md px-2">
                          <legend>
                            <label htmlFor="">Description</label>
                          </legend>
                          <textarea
                            name=""
                            id=""
                            placeholder="Enter Description"
                            className="outline-none text-14 py-1text-14 py-1"
                          ></textarea>
                        </fieldset>
                      </div>
                    </Modal> */}
                    <button onClick={DeleteDoc} className="bg-red-500 text-white px-2 py-1 lg:px-4 lg:py-2 rounded-md">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default Home;