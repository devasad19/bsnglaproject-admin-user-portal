import { useParams } from "next/navigation";
import CitizenInfoData from "../../../component/CitizenInfoData/CitizenInfoData";

const page = ({ params: { id } }: { params: { id: string } }) => {
    return (
        <>
        <CitizenInfoData id={id}/>
        </>
    );
};

export default page;