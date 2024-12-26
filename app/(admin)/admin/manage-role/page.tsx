import { getAllPermissionWithParent } from "../../_api/RoleManagementApi";
import ManageRoleList from "../../component/ManageRoleList/ManageRoleList";

const Home = async() => {
    const allParentPermission = await getAllPermissionWithParent().then((res) => {
        return res?.data;
    }).catch((error) => {
        return error;
    });
  return (
   <>
   <ManageRoleList allParentPermissionList={allParentPermission}/>
   </>
  );
};

export default Home;
