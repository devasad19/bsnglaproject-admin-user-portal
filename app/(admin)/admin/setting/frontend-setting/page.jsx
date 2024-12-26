import { getLogo } from "@/app/(admin)/_api/Setting/FrontendSettingApi";
import FrontendSettingList from "@/app/(admin)/component/FrontendSettingList/FrontendSettingList";


const Home = async() => {
const response = await getLogo()
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });

    

  return (
   <>
   <FrontendSettingList logoData={response?.data}/>
   </>
  );
};

export default Home;
