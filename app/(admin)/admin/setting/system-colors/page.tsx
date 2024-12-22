import { getSettingColors } from "@/app/(admin)/_api/Setting/ColorApi";
import SystemColorList from "@/app/(admin)/component/SystemColorList/SystemColorList";


const page = async() => {
    const response = await getSettingColors()
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error;
        });
    return (
        <>
            <SystemColorList systemColorData={response?.data}/>
        </>
    );
};

export default page;