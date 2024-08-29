import { faker } from "@faker-js/faker";
import Link from "next/link";
import LineChart from "@/app/_components/Chart/LineChart/LineChart";

const Home = async ({ params }) => {
  const data = faker.datatype.array(100);
  return (
    <section>
      <div className="flex items-center gap-4 pb-10">
        <Link href="/user/usage">
            <svg className="fill-white bg-blue-500 w-8 h-8 p-1 rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        </Link>
        <h1 className="text-20 lg:text-32 font-mono font-bold text-[#151D48]">
          Name of Service: Borno
        </h1>
      </div>

      <div>
        <LineChart />
      </div>
    </section>
  );
};

export default Home;
