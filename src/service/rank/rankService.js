import httpService from "../httpService";


const apiEndPoint =  'http://localhost:8080/api/v1/rank/all';

export function getRankData(){
    return httpService.get(apiEndPoint,{transformRequest: (data, headers) => {
            delete headers.common['Authorization'];
            return data;
        }
    });
}