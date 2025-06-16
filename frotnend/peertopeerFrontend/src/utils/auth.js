import { useAuthstore } from "../store/auth";

//import axios from "axios";
import axios from'axios'

import jwtDecode from "jwt-decode";
import Cookies from "js-cookie"
import Swal from "sweetalert2"
import apiInstance from "./axios";

export const login = async (email,password)=>{
try {
    const {data,status}= await axios.post('user/token/',{email,password,});

    if(status===200){


        setAuthUser(data.access, data.refresh);
        alert("Login Successful")
    }
    return{data, error:null};
} catch (error) {
    return{
        data:null,
        error:error.response.data?.detail || "Something went wrong "
        
    }

    
}


};

export const register= async (fullname, email, password,password2) =>{

    try{
        const {data}= await apiInstance.post('user/register/', {fullname, email,password,password2}); 

        await login(email,password)
        alert("Registration successful");
        return {data, error:null}


    }catch(error){
return{
        data:null,
        error:error.response.data?.detail || "Something went wrong ",
        
    };



    }
}

export const logout=()=>{

Cookies.remove("access_token");
Cookies.remove("refresh_token");
useAuthstore.getState().setUser(null)
alert("Logout Successful");

}

export const setUser= async () => {
const access_token= Cookies.get('access_token');
const refresh_token= Cookies.get('refresh_token');

if (!access_token || !refresh_token){
    return;
}
if (isAccessTokenExpired(access_token)){
    
    
    const response=getRefreshedToken(refresh_token);
    setAuthUser(response.access, response.refresh)
}else{
 setAuthUser(access_token, refresh_token)

}



}

export const setAuthUser=async(access_token,refresh_token) =>{
        Cookies.set('access_token',access_token,{
            expires: 1, 
            secure: true
        })
        Cookies.set('refresh_token',refresh_token,{
            expires: 7, 
            secure: true
        });
        const user=jwtDecode(access_token) ?? null
        if (user){

            useAuthstore.getState().setUser(user);
        }

            setAuthUser.getState().setLoading(false)
        
}

export const getRefreshedToken= async() =>{
    const refresh_token=Cookies.get("refresh_token");
    const response=await axios.post('token/refresh/', {

        refresh:refresh_token,
    });
    return response.data



}


export const isAccessTokenExpired=async(access_token) =>{
    try{

        const decodedToken=jwtDecode(access_token)
        return decodedToken.expires <Date.now() /1000
    }catch(error){
        console.log(error);
        return true;
    }

}