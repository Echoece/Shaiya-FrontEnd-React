import httpService from "../httpService";

const api = 'http://localhost:8080/register';

export function register(user){
    // removing jwt token, as it is creating error.
    // delete axios.defaults.headers.common["Authorization"];

    return httpService.post(api,{
        password: user.password,
        username: user.username,
        email: user.email
    });
}