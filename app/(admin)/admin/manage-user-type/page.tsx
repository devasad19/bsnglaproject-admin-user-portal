import React from 'react';
import ManageUserTypeList from '../../component/ManageUserTypeList/ManageUserTypeList';

import { getUserTypes } from "@/app/(admin)/_api";

const page = async () => {
    
  const features = await getUserTypes().catch((err) => console.log(err));
    return (
        <div className='px-14'>
            <ManageUserTypeList features={features} />
        </div>
    );
};

export default page;