// dummy user data
const users=[
    {
        name:"user",
        password:"1234",
        jwt:"some jwt",
        role:"user"
    },
    {
        name:"user1",
        password:"1234",
        jwt:"some jwt",
        role:"user"
    },
    {
        name:"user2",
        password:"1234",
        jwt:"some jwt",
        role:"user"
    }
];
const tokenKey = "token";


export function loginWithJWT(jwt){
    localStorage.setItem(tokenKey,jwt);
}

export async function login(email,password){
    const jwt = 'some-jwt-token-here';
    localStorage.setItem(tokenKey,jwt);
}

export function logout(){
    localStorage.removeItem(tokenKey);
}

export function getJWT(){
    return localStorage.getItem(tokenKey);
}

export function getCurrentUser(){
    return '';
}

export function register(user){
    return 'some-jwt';
}