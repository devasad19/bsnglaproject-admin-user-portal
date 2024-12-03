'use client';


import { useState } from "react";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { createPortalMenu } from "@/app/(admin)/_api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";




const Home = () => {
    const router = useRouter();
    const [laoding, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        serial: 0,
        title: "",
        en_title: "",
        url: "",
        status: 1
    });


    const HandleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData();

        form.append("sort_id", formData.serial);
        form.append("title_bn", formData.title);
        form.append("title_eng", formData.en_title);
        form.append("url", formData.url);
        form.append("status", formData.status);

        createPortalMenu(form).then((res) => {
            toast.success(res?.message);
            router.push("/admin/setting/sidebar-links");
        }).catch((err) => {
            console.log(err);
            toast.error(err?.message);
        }).finally(() => setLoading(false));
    };


    return (
        <section className="bg-white p-4 min-h-screen rounded">
            <div className="flex gap-2 items-center pb-5">
                <Link href={{
                    pathname: "/admin/setting/sidebar-links",
                }} shallow>
                    <IoMdArrowRoundBack size={30} />
                </Link>
                <h3 className="text-32 font-mono font-bold text-[#151D48]">Create Hamburger Menu</h3>
            </div>

            <div>
                <form onSubmit={HandleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <fieldset className="flex flex-col border border-gray-400 rounded px-2 w-full">
                            <legend>
                                <label htmlFor="title" className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500">Title</label>
                            </legend>
                            <input onChange={(e) => setFormData({ ...formData, title: e.target.value })} value={formData.title} type="text" id="title" placeholder="Enter Title" className="w-full outline-none text-14 py-1" required />
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-400 rounded px-2 w-full">
                            <legend>
                                <label htmlFor="en_title" className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500">English Title</label>
                            </legend>
                            <input onChange={(e) => setFormData({ ...formData, en_title: e.target.value })} value={formData.en_title} type="text" id="en_title" placeholder="Enter English Title" className="w-full outline-none text-14 py-1" required />
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-400 rounded px-2 w-full">
                            <legend>
                                <label htmlFor="url" className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500">Url</label>
                            </legend>
                            <input onChange={(e) => setFormData({ ...formData, url: e.target.value })} value={formData.url} type="text" id="url" placeholder="Enter Url" className="w-full outline-none text-14 py-1" required />
                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-400 rounded px-2 w-full">
                            <legend>
                                <label htmlFor="url" className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500">Serial</label>
                            </legend>


                            <select className="w-full outline-none text-14 p-1 bg-white" onChange={(e) => setFormData({ ...formData, serial: e.target.value })} name="serial" id="serial">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                            </select>

                        </fieldset>
                        <fieldset className="flex flex-col border border-gray-400 rounded px-2 w-full">
                            <legend>
                                <label htmlFor="url" className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500">Status</label>
                            </legend>

                            <select onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full outline-none text-14 p-1 bg-white" name="status" id="status">
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </fieldset>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-5">
                        <Link href={{
                            pathname: "/admin/setting/sidebar-links",
                        }} shallow className="bg-red-500 text-white px-4 py-2 rounded" >
                            Cancel
                        </Link>

                        <button disabled={laoding} type='submit' className={`bg-blue-500 text-white px-4 py-2 rounded ${  laoding && "opacity-50 cursor-not-allowed"}`}>
                            {
                                laoding ? (
                                    'Loading...'
                                ) : (
                                    'Create'
                                )
                            }
                            
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
};


export default Home;