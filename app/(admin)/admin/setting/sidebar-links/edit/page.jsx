'use client';


import { useState, useEffect } from "react";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";



const Home = () => {
    const [formData, setFormData] = useState({
        title: "",
        url: "",
    });


    const HandleUpdate = (e) => {
        e.preventDefault();
        console.log(formData);
    };


    return (
        <section className="bg-white p-4 min-h-screen rounded">
            <div className="flex gap-2 items-center pb-5">
                <Link href={{
                    pathname: "/admin/setting/sidebar-links",
                }} shallow>
                    <IoMdArrowRoundBack size={30} />
                </Link>
                <h3 className="text-32 font-mono font-bold text-[#151D48]">Edit Sidebar Links</h3>
            </div>

            <div>
                <form onSubmit={HandleUpdate}>
                    <div className="flex items-center gap-2">
                        <fieldset className="flex flex-col border border-gray-400 rounded px-2 w-full">
                            <legend>
                                <label htmlFor="title" className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500">Title</label>
                            </legend>
                            <input onChange={(e) => setFormData({ ...formData, title: e.target.value })} value={formData.title} type="text" id="title" placeholder="Enter Title" className="w-full outline-none text-14 py-1" required />
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-400 rounded px-2 w-full">
                            <legend>
                                <label htmlFor="url" className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500">Url</label>
                            </legend>
                            <input onChange={(e) => setFormData({ ...formData, url: e.target.value })} value={formData.url} type="text" id="url" placeholder="Enter Url" className="w-full outline-none text-14 py-1" required />
                        </fieldset>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-5">
                        <Link href={{
                            pathname: "/admin/setting/sidebar-links",
                        }} shallow className="bg-red-500 text-white px-4 py-2 rounded" >
                            Cancel
                        </Link>

                        <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
};


export default Home;