import { getAllSystemUser } from "../../_api/ManageSystemUserApi";
import { getAllRolePermission } from "../../_api/RoleManagementApi";
import SystemUserList from "../../component/SystemUserList/SystemUserList";

const Home = async () => {
  const users = await getAllSystemUser()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  const roles = await getAllRolePermission()
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      return err;
    });

  return (
    <>
      <SystemUserList users={users?.data} rolesList={roles}/>
    </>
  );
};

export default Home;
