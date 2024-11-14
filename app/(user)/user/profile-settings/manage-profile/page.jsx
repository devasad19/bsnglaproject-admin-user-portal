export const revalidate = 3600;
import { cookies } from "next/headers";
import ProfileContainer from "@/app/(user)/component/ProfileContainer/ProfileContainer";
import { getCitizenData } from "@/app/(user)/_api";

const Home = async () => {
  let user;
  const userinfo = cookies().get("user");
  if (!userinfo) {
    typeof window != undefined ? window.location.href = "/" : " ";
  } else {
    user = typeof userinfo != undefined ? JSON.parse(userinfo?.value) : '';
  }

  const citizen = await getCitizenData(user?.id).then((res) => res?.data).catch((err) => console.log(err));

  return (
    <ProfileContainer citizen={citizen} />
  );
};

export default Home;
