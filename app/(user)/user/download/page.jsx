import { faker } from "@faker-js/faker";
import Link from "next/link";

const Home = async () => {
    const data = faker.datatype.array(6);
  return (
    <section>
      <h3 className="text-32 font-mono font-bold text-[#151D48] pb-5">
        Downloads
      </h3>
      <div className="flex flex-wrap gap-4">
        {data.map((item, index) => (
          <Link
            key={index}
            href={{
              pathname: `/user/usage/${item}`,
            }}
            shallow
            className="w-32 h-32 lg:w-60 lg:h-60 flex justify-center items-center bg-blue-100 border border-blue-300 rounded-md overflow-hidden"
          >
            <p className="text-12 lg:text-16">{item}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
