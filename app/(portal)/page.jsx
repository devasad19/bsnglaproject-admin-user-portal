import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const Home = () => {
    const userinfo = cookies().get("user");
  if (!userinfo) {
    redirect(process.env.NEXT_PUBLIC_PORTAL_URL + "/signin");
  }
};

export default Home;