import { getAllParentPermission, getAllPermission } from "../../_api/PermissionManagementApi";
import PermissionManagementList from "../../component/PermissionManagemntList/PermissionManagementList";


const Home = async () => {

  const getParentPermissionData = await getAllParentPermission();
  const getAllPermissionData = await getAllPermission();

  return (
    <>
     <PermissionManagementList parentPermissionData={getParentPermissionData?.data} permissionsData={getAllPermissionData?.data}/>
    </>
  );
};

export default Home;
