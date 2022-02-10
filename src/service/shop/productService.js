import httpService from "../httpService";

const productsApi =  'http://localhost:8080/api/v1/shop/products';
const checkoutApi = 'http://localhost:8080/api/v1/shop/checkout';

export function getAllProduct(){
    return httpService.get(productsApi);
}

export function checkout(productList){
    return httpService.post(checkoutApi,productList);
}