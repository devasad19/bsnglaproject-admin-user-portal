import { getAllSystemUser } from "../../_api/ManageSystemUserApi";
import SystemUserList from "../../component/SystemUserList/SystemUserList";


const Home = async() => {

  const users = await getAllSystemUser();

  return (
    <>
     <SystemUserList users={users?.data}/>
    </>
  );
};

export default Home;
