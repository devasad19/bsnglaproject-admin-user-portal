import axios from "axios"

export const AddSLiderApi = async (data:any) =>{
    try {
        const resSlider = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/slider/store`,data)
        return resSlider.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getAllSliderApi = async () =>{
    try {
        const resSlider = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sliders`)
        return resSlider.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const sliderUpdateStatus = async (id:any,status:any) =>{
    try {
        const resSlider = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/slider/on-off-update/${id}`,{status:status})
        return resSlider.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}