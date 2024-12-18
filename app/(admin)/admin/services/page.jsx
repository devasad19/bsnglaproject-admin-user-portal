// export const revalidate = 3600;

import ServiceListContainer from "@/app/(admin)/component/ServiceListContainer/ServiceListContainer";
import { getServices } from "../../_api/ServiceApi";
// import { getServices } from "@/app/(portal)/_api";

const Home = async () => {
  // const services = await getServices().catch((err) => console.log(err));
  
  const responseService = await getServices().catch((err) => console.log(err));

  return (
    <ServiceListContainer services={responseService?.data} />
  );
};

export default Home;