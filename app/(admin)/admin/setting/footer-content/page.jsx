'use client';

import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { getFooterLeftData, upDateFooterLeft, getFooterMiddleData, updateFooterMiddle, getFooterRightData, updateFooterRight } from "@/app/(admin)/_api";
import { FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState(1);
    const [leftForm, setLeftForm] = useState({
        id: "",
        status: 1,
        title: "",
        description: "",
        copyText: "",
    });
    const [middleForm, setMiddleForm] = useState({
        status: 1,
        title: "",
        links: [
            {
                label: "",
                link: "",
            }
        ],
    })
    const [rightForm, setRightForm] = useState({
        title: "",
        address: "",
        addressIcon: "",
        contacts: [
            {
                icon: "",
                label: "",
            }
        ],
        social: [
            {
                icon: "",
                link: "",
            }
        ]

    });


    useEffect(() => {
        setLoading(true);
        getFooterLeftData().then((response) => {
            setLeftForm({
                title: response?.title,
                description: response?.description,
                copyText: response?.copyright_text
            })
        }).catch((err) => console.log('1st err: ', err));


        getFooterMiddleData().then((response) => {
            // console.log('inside 2nd api: ',response);
            setMiddleForm({
                title: response?.title,
                links: response?.links ? JSON.parse(response?.links) : [
                    {
                        label: "",
                        link: "",
                    }
                ]
            })
        }).catch((err) => console.log('2nd err: ', err));



        getFooterRightData().then((response) => {
            setRightForm({
                title: response?.title,
                address: response?.address,
                addressIcon: response?.address_icon,
                contacts: response?.contacts ? JSON.parse(response?.contacts) : [
                    {
                        icon: "",
                        label: "",
                    }
                ],
                social: response?.social_icons ? JSON.parse(response?.social_icons) : [
                    {
                        icon: "",
                        link: "",
                    }
                ]
            })
        }).catch((err) => console.log('3rd err: ', err)).finally(() => setLoading(false));


    }, []);


    const HandleUpdate1 = async (e) => {
        e.preventDefault();

        const form = new FormData();

        form.append("title", leftForm.title);
        form.append("description", leftForm.description);
        form.append("copyright_text", leftForm.copyText);
        form.append("status", 2);

        const response = await upDateFooterLeft(form, leftForm.id).catch((err) => {
            console.log('1st err: ', err)
        }).finally(() => setLoading(false));


        if (response.status === true) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };


    const HandleUpdate2 = async (e) => {
        e.preventDefault();

        const form = new FormData();

        form.append("title", middleForm.title);
        middleForm.links.map((item, index) => {
            form.append(`links[${index}][label]`, item.label);
            form.append(`links[${index}][link]`, item.link);
        })
        form.append("status", 1);


        const response = await updateFooterMiddle(middleForm.id, form).catch((err) => {
            console.log('2nd err: ', err)
        }).finally(() => setLoading(false));

        if (response.status === true) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    const HandleUpdate3 = async (e) => {
        e.preventDefault();

        const form = new FormData();

        form.append("title", rightForm.title);
        form.append("address", rightForm.address);
        form.append("address_icon", rightForm.addressIcon);

        rightForm.contacts.map((item, index) => {
            form.append(`contacts[${index}][icon]`, item.icon);
            form.append(`contacts[${index}][label]`, item.label);
        });

        rightForm.social.map((item, index) => {
            form.append(`social_icons[${index}][icon]`, item.icon);
            form.append(`social_icons[${index}][link]`, item.link);
        });
        form.append("status", 1);

        const response = await updateFooterRight(form).catch((err) => console.log('3rd err: ', err)).finally(() => setLoading(false));


        if (response.status === true) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    }


    // console.log('rightForm: ', rightForm);




    return (
        <section className="bg-white p-4 min-h-screen rounded">
            <div className="flex justify-between items-center pb-5">
                <h3 className="text-32 font-mono font-bold text-[#151D48]">Footer Content</h3>
            </div>


            {
                loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <div className="flex gap-2 pb-5">
                            <button onClick={() => setTab(1)} className={`px-4 py-2 rounded text-white ${tab == 1 ? "bg-primary" : "bg-primary/50"}`}>
                                Left Column
                            </button>
                            <button onClick={() => setTab(2)} className={`px-4 py-2 rounded text-white ${tab == 2 ? "bg-primary" : "bg-primary/50"}`}>
                                Middle Column
                            </button>
                            <button onClick={() => setTab(3)} className={`px-4 py-2 rounded text-white ${tab == 3 ? "bg-primary" : "bg-primary/50"}`}>
                                Right Column
                            </button>
                        </div >


                        {
                            tab == 1 && (
                                <div>
                                    <form onSubmit={HandleUpdate1} className="flex flex-col gap-2">
                                        <fieldset className="flex flex-col border border-gray-400 rounded px-2">
                                            <legend>
                                                <label htmlFor="title1" className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500">Title</label>
                                            </legend>
                                            <input onChange={(e) => setLeftForm({ ...leftForm, title: e.target.value })} value={leftForm.title} type="text" id="title1" placeholder="Enter title" className="w-full outline-none text-14 py-1" required />
                                        </fieldset>

                                        <fieldset className="flex flex-col border border-gray-400 rounded px-2">
                                            <legend>
                                                <label htmlFor="description1" className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500">Description</label>
                                            </legend>
                                            <textarea rows={5} onChange={(e) => setLeftForm({ ...leftForm, description: e.target.value })} value={leftForm.description} name="description1" id="description1" className="w-full outline-none text-14 py-1" required placeholder="Enter description"></textarea>
                                        </fieldset>

                                        <fieldset className="flex flex-col border border-gray-400 rounded px-2">
                                            <legend>
                                                <label htmlFor="copyText" className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500">Copyright Text</label>
                                            </legend>
                                            <textarea onChange={(e) => setLeftForm({ ...leftForm, copyText: e.target.value })} value={leftForm.copyText} name="copyText" id="copyText" className="w-full outline-none text-14 py-1" required placeholder="Enter copyright text"></textarea>
                                        </fieldset>
                                        <div className="flex justify-end">
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                        {
                            tab == 2 && (
                                <div>
                                    <form onSubmit={HandleUpdate2} className="flex flex-col gap-2">
                                        <fieldset className="flex flex-col border border-gray-400 rounded px-2">
                                            <legend>
                                                <label htmlFor="title2" className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500">Title</label>
                                            </legend>
                                            <input onChange={(e) => setMiddleForm({ ...middleForm, title: e.target.value })} value={middleForm.title} type="text" id="title2" placeholder="Enter title" className="w-full outline-none text-14 py-1" required />
                                        </fieldset>

                                        <div className="bg-slate-100 rounded flex justify-between items-center p-2 mb-5">
                                            <h3>Links:</h3>
                                            <button onClick={() => setMiddleForm({ ...middleForm, links: [...middleForm.links, { label: "", link: "" }] })} className="bg-primary p-1 rounded">
                                                <FaPlus size={24} className="fill-white" />
                                            </button>
                                        </div>

                                        {
                                            middleForm?.links && middleForm?.links?.map((link, index) => (
                                                <div key={index} className="w-full flex gap-2">
                                                    <div className="border border-gray-400 rounded p-2 space-y-3 w-full">
                                                        <div className="grid grid-cols-12">
                                                            <p className="text-14 after:content-['_*'] after:text-red-500">Label:</p>
                                                            <input onChange={(e) => setMiddleForm({ ...middleForm, links: middleForm.links.map((link, i) => i == index ? { ...link, label: e.target.value } : link) })} value={link.label} type="text" placeholder="Enter label" className="col-span-11 border border-gray-400 rounded outline-none p-1" required/>
                                                        </div>
                                                        <div className="grid grid-cols-12">
                                                            <p className="text-14 after:content-['_*'] after:text-red-500">Link:</p>
                                                            <input onChange={(e) => setMiddleForm({ ...middleForm, links: middleForm.links.map((link, i) => i == index ? { ...link, link: e.target.value } : link) })} value={link.link} type="text" placeholder="Enter link" className="col-span-11 border border-gray-400 rounded outline-none p-1" required/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => setMiddleForm({ ...middleForm, links: middleForm.links.filter((link, i) => i != index) })} className="bg-primary  p-1 rounded">
                                                            <FaMinus size={24} className="fill-white" />
                                                        </button>
                                                    </div>

                                                </div>
                                            ))
                                        }

                                        <div className="flex justify-end">
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                        {
                            tab == 3 && (
                                <div>
                                    <form onSubmit={HandleUpdate3} className="flex flex-col gap-2">
                                        <fieldset className="flex flex-col border border-gray-400 rounded px-2">
                                            <legend>
                                                <label htmlFor="title2" className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500">Title</label>
                                            </legend>
                                            <input onChange={(e) => setRightForm({ ...rightForm, title: e.target.value })} value={rightForm.title} type="text" id="title2" placeholder="Enter title" className="w-full outline-none text-14 py-1"  required/>
                                        </fieldset>


                                        <fieldset className="flex flex-col border border-gray-400 rounded px-2">
                                            <legend>
                                                <label htmlFor="address" className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500">Address</label>
                                            </legend>

                                            <textarea onChange={(e) => setRightForm({ ...rightForm, address: e.target.value })} value={rightForm.address} className="w-full outline-none text-14 py-1" name="address" id="address" placeholder="Enter address" required></textarea>
                                        </fieldset>


                                        <fieldset className="flex flex-col border border-gray-400 rounded px-2 pb-2">
                                            <legend>
                                                <label htmlFor="address_icon" className="bg-white px-1 text-14 after:content-['_*'] after:text-red-500">Address Icon</label>
                                            </legend>

                                            <input onChange={(e) => setRightForm({ ...rightForm, addressIcon: e.target.files[0] })} type="file" name="address_icon" id="address_icon" />


                                            {
                                                typeof rightForm?.addressIcon == 'string' && (
                                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + rightForm.addressIcon} className="w-32 h-32 object-cover" />
                                                )
                                            }

                                            {
                                                typeof rightForm?.addressIcon == 'object' && (
                                                    <img src={URL.createObjectURL(rightForm.addressIcon)} className="w-32 h-32 object-cover" />
                                                )
                                            }
                                        </fieldset>

                                        <div className="bg-slate-100 rounded flex justify-between items-center p-2 mb-2">
                                            <h3>Contacts:</h3>
                                            <button onClick={() => setRightForm({ ...rightForm, contacts: [...rightForm.contacts, { icon: "", contact: "" }] })} className="bg-primary p-1 rounded">
                                                <FaPlus size={24} className="fill-white" />
                                            </button>
                                        </div>

                                        {
                                            rightForm?.contacts.map((contact, index) => (
                                                <div key={index} className="w-full flex gap-2">
                                                    <div className="grow border border-gray-400 rounded p-2 space-y-3">
                                                        <div className="">
                                                            <div className="flex items-center gap-2 pb-2">
                                                                <p className="text-14 after:content-['_*'] after:text-red-500">Icon:</p>
                                                                <input onChange={(e) => setRightForm({ ...rightForm, contacts: rightForm.contacts.map((contact, i) => i == index ? { ...contact, icon: e.target.files[0] } : contact) })} type="file" name="icon" id="icon" className="grow border border-gray-400 rounded outline-none p-1"  />
                                                            </div>

                                                            {
                                                                typeof contact.icon == 'string' && (
                                                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + contact.icon} className="w-32 h-32 object-cover" />
                                                                )
                                                            }

                                                            {
                                                                typeof contact.icon == 'object' && (
                                                                    <img src={URL.createObjectURL(contact.icon)} className="w-32 h-32 object-cover" />
                                                                )
                                                            }

                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-14 after:content-['_*'] after:text-red-500">Contact:</p>
                                                            <input onChange={(e) => setRightForm({ ...rightForm, contacts: rightForm.contacts.map((contact, i) => i == index ? { ...contact, label: e.target.value } : contact) })} value={contact.label} type="text" placeholder="Enter link" className="grow border border-gray-400 rounded outline-none p-1"  required/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => setRightForm({ ...rightForm, contacts: rightForm.contacts.filter((contact, i) => i != index) })} className="bg-primary  p-1 rounded">
                                                            <FaMinus size={24} className="fill-white" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        }




                                        <div className="bg-slate-100 rounded flex justify-between items-center p-2 mb-2">
                                            <h3>Social Links:</h3>
                                            <button onClick={() => setRightForm({ ...rightForm, social: [...rightForm.social, { icon: "", link: "" }] })} className="bg-primary p-1 rounded">
                                                <FaPlus size={24} className="fill-white" />
                                            </button>
                                        </div>

                                        {
                                            rightForm?.social.map((link, index) => (
                                                <div key={index} className="w-full flex gap-2">
                                                    <div className="grow border border-gray-400 rounded p-2 space-y-3">
                                                        <div >
                                                            <div className="w-full flex items-center gap-2">
                                                                <p className="text-14 after:content-['_*'] after:text-red-500">Icon:</p>
                                                                <input onChange={(e) => setRightForm({ ...rightForm, social: rightForm.social.map((link, i) => i == index ? { ...link, icon: e.target.files[0] } : link) })} type="file" name="icon" id="icon" className="grow border border-gray-400 rounded outline-none p-1"  />
                                                            </div>

                                                            {
                                                                typeof link.icon == 'string' && (
                                                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + link.icon} className="w-32 h-32 object-cover" />
                                                                )
                                                            }

                                                            {
                                                                typeof link.icon == 'object' && (
                                                                    <img src={URL.createObjectURL(link.icon)} className="w-32 h-32 object-cover" />
                                                                )
                                                            }
                                                        </div>
                                                        <div className="w-full flex items-center gap-2">
                                                            <p className="text-14 after:content-['_*'] after:text-red-500">Url:</p>
                                                            <input onChange={(e) => setRightForm({ ...rightForm, social: rightForm.social.map((link, i) => i == index ? { ...link, link: e.target.value } : link) })} value={link.link} type="text" placeholder="Enter link" className="grow border border-gray-400 rounded outline-none p-1"  />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => setRightForm({ ...rightForm, social: rightForm.social.filter((link, i) => i != index) })} className="bg-primary  p-1 rounded">
                                                            <FaMinus size={24} className="fill-white" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        }


                                        <div className="flex justify-end">
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                    </div >
                )
            }


        </section >
    )
};

export default Home;