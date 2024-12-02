export const revalidate = 3600;

import dynamic from "next/dynamic";
const DashboardContainer = dynamic(() => import("../component/DashboardContainer/DashboardContainer"), { ssr: false });
import { getDashboardStats } from "../_api";

const Home = async () => {
    const data = await getDashboardStats().catch((err) => console.log(err));

    // console.log('dashboard stats: ',data);
    return (
        <DashboardContainer data={data} />
    );
};

export default Home;
