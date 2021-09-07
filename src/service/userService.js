import httpService from "./httpService";

const api = 'http://localhost:8080/register';

export function register(user){
    return httpService.post(api,{
        password: user.password,
        username: user.username
    });
}