// export const revalidate = 3600;

import ServiceListContainer from "@/app/(admin)/component/ServiceListContainer/ServiceListContainer";


const Home = async () => {
  return (
    <ServiceListContainer />
  );
};

export default Home;