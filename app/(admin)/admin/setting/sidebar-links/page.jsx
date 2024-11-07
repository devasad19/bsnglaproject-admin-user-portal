'use client';


import { useState } from "react";
import Link from "next/link";

const Home = () => {
const [loading, setLoading] = useState(false);
const [data, setData] = useState([]);





const HandleDelete = (id) => {

};



    return (
        <section className="bg-white p-4 min-h-screen rounded">
            <div className="flex justify-between items-center pb-5">
                <h3 className="text-32 font-mono font-bold text-[#151D48]">Sidebar Links</h3>
                <Link href={{
                    pathname: "/admin/setting/sidebar-links/create",
                }} shallow className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create
                </Link>
            </div>

            <div>
                <table className="w-full">
                    <thead className="bg-primary text-white h-10">
                        <tr>
                            <th>SI</th>
                            <th>Title</th>
                            <th>Url</th>
                            <th className="w-[20em]">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr className="h-16">
                            <td>1</td>
                            <td>Home</td>
                            <td>home</td>
                            <td className="space-x-5">
                                <Link href={{
                                    pathname: `/admin/setting/sidebar-links/edit`,
                                }} shallow className="bg-green-500 text-white px-4 py-2 rounded">
                                    Edit
                                </Link>

                                <button onClick={() => HandleDelete(1)} className="bg-red-500 text-white px-4 py-1.5 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
};


export default Home;