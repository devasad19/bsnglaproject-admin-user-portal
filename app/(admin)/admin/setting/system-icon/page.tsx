import { getSettingIcon } from "@/app/(admin)/_api/Setting/SettingIconApi";
import SystemIconList from "../../../component/SystemIconList/SystemIconList";

const page = async () => {
  const response = await getSettingIcon()
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
  return (
    <div>
      <SystemIconList  systemIconData={response?.data}/>
    </div>
  );
};

export default page;
