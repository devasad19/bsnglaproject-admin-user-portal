export const revalidate = 3600;
import { cookies } from "next/headers";
import ProfileContainer from "@/app/(user)/component/ProfileContainer/ProfileContainer";

import { getUserTypest } from "@/app/(admin)/_api/MangeUserTypeApi";
import { getCitizenData } from "@/app/(user)/_api/user";

const Home = async () => {
  let user;
  const userinfo = cookies().get("user");
  if (!userinfo) {
    typeof window != undefined ? window.location.href = "/" : " ";
  } else {
    user = typeof userinfo != undefined ? JSON.parse(userinfo?.value) : '';
  }

  const citizen = await getCitizenData(user?.id).then((res) => res?.data).catch((err) => console.log(err));
  const userTypes = await getUserTypest().then((res) => res?.data).catch((err) => console.log(err));


  const grade = [
    {
      title: 'grade 1',
      value: 'grade_1'
    },
    {
      title: 'grade 2',
      value: 'grade_2'
    },
    {
      title: 'grade 3',
      value: 'grade_3'
    },
    {
      title: 'grade 4',
      value: 'grade_4'
    },
    {
      title: 'grade 5',
      value: 'grade_5'
    },
    {
      title: 'grade 6',
      value: 'grade_6'
    },
    {
      title: 'grade 7',
      value: 'grade_7'
    },
    {
      title: 'grade 8',
      value: 'grade_8'
    },
    {
      title: 'grade 9',
      value: 'grade_9'
    },
    {
      title: 'grade 10',
      value: 'grade_10'
    },
    {
      title: 'grade 11',
      value: 'grade_11'
    },
    {
      title: 'grade 12',
      value: 'grade_12'
    },
    {
      title: 'grade 13',
      value: 'grade_13'
    },
    {
      title: 'grade 14',
      value: 'grade_14'
    },
    {
      title: 'grade 15',
      value: 'grade_15'
    },
    {
      title: 'grade 16',
      value: 'grade_16'
    },
    {
      title: 'grade 17',
      value: 'grade_17'
    },
    {
      title: 'grade 18',
      value: 'grade_18'
    },
    {
      title: 'grade 19',
      value: 'grade_19'
    },
    {
      title: 'grade 20',
      value: 'grade_20'
    },
  ]

  return (
    <ProfileContainer citizen={citizen} userTypes={userTypes} grade={grade} />
  );
};

export default Home;
