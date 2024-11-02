'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const Home = () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/admin/services");
    },[])
    // router.push("/admin/services");
};

export default Home;