
import { getUserTypest } from '../../_api/MangeUserTypeApi';
import ManageUserTypeList from '../../component/ManageUserTypeList/ManageUserTypeList';

const page = async () => {
    const userTyes = await getUserTypest();
    return (
        <div className='px-14'>
            <ManageUserTypeList userType={userTyes?.data} />
        </div>
    );
};

export default page;