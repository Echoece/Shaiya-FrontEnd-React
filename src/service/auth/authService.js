import httpService from "../httpService";
import jwtDecode from "jwt-decode";
import axios from "axios";


const apiEndpoint ='http://localhost:8080/authenticate';
const tokenKey = "token";
// to get rid of bi-directional dependency between http and auth service
httpService.setJwt(getJWT());

export async function login(name,password){
    /* const {data:jwt}= await httpService.post(apiEndpoint,{username:name,password},{
        headers:{ Authorization:""}
    });*/
    const{data:jwt}= await httpService.post(apiEndpoint,{username:name,password});
    localStorage.setItem(tokenKey,jwt.token);
}

export function loginWithJWT(jwt){
    localStorage.setItem(tokenKey,jwt);
}

export function logout(){
    localStorage.removeItem(tokenKey);
    delete axios.defaults.headers.common["Authorization"];
}

export function getJWT(){
    return localStorage.getItem(tokenKey);
}

export function getCurrentUser(){
    try{
        const jwt=localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    }catch (e) {
        return null;
    }
}