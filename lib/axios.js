import Axios from "axios";

const axios = Axios.create({
    baseUrl: process.env.BACKEND_ROOT,
    headers: {
        'X-Requested-with': "XMLHttpRequest",
    },
    withCredentials: true
});

export default axios;

