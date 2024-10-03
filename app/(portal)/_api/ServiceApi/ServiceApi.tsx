import axios from "axios"

export const serviceDetailsResourceApi = async (data:any)=>{
    console.log('data from api: ', data);
    
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/store/service/details`,data);
        return res.data;
        
    } catch (error) {
        console.log(error);
        return error;
        
    }
}


export const serviceBanglaResourceApi = async (data:any)=>{
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/store/bn/service/details`,data);
        return res.data;
        
    } catch (error) {
        console.log(error);
        return error;
    }
}