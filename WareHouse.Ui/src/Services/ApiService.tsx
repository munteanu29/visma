import axios from "axios";

const GetStorageToken = () => {
    const storage = localStorage.getItem("session");
    if(storage) {
        const session = JSON.parse(storage);
        console.log(session);
        if (session && Date.parse(session.expiration) > Date.now())
            return session.token;
        else
            return undefined;
    }
 };
 

 axios.interceptors.request.use(function (config) {
    const token = "Bearer " + GetStorageToken();
    config.headers.Authorization =  token;

    return config;
});
 
 export const IsAuthenticated = () => {
     return GetStorageToken();
 }

export default function ApiService (){


    // const baseURL =  process.env.REACT_APP_BASE_URL;;
    const baseURL =  "http://localhost:5000";;
   
    
    async function getCustomers() {
        return axios.get(baseURL+`/api/Customer/GetCustomers` );
    }

    async function getGoods() {
        return axios.get(baseURL+`/api/Goods/GetGoods` );
    }

    async function addCustomer(customer:any){
        return axios.post(baseURL+'/api/Customer/AddCustomer',customer)
    }

    async function addProduct(customer:any){
        return axios.post(baseURL+'/api/Goods/AddGoods',customer)
    }
    async function getOffer(params:any){
         return axios.post(baseURL+'/api/CalculatePrice/CalculatePriceForCustomer',params)
    }
    return {getCustomers, getGoods, addCustomer, addProduct, getOffer}
}