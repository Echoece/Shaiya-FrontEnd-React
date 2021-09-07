import axios from "axios";
import {toast} from "react-toastify";


axios.interceptors.response.use(null,error=>{
    const expectedError = error.response &&
        error.response.status >=400 &&
        error.response.status <500;

    if (!expectedError){
        //logger.log(error);
        toast.error('unexpected error');
    }
    return Promise.reject(error);
});

function setJwt(jwt){
    //axios.defaults.headers.common['Bearer']= jwt;
    axios.defaults.headers.common['Authorization']= `Bearer ${jwt}`;
}

const httpService= {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    del: axios.delete,
    setJwt
};

export default httpService;