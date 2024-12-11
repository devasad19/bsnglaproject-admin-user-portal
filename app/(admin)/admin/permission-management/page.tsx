import { getAllParentPermission } from "../../_api/PermissionManagementApi";
import PermissionManagementList from "../../component/PermissionManagemntList/PermissionManagementList";


const Home = async () => {

  const getParentPermissionData = await getAllParentPermission();

  return (
    <>
     <PermissionManagementList parentPermissionData={getParentPermissionData.data}/>
    </>
  );
};

export default Home;
