import { useAuthstore } from "../store/auth";

//import axios from "axios";
import axios from'axios'

import jwtDecode from "jwt-decode";
import Cookies from "js-cookie"
import Swal from "sweetalert2"
import apiInstance from "./axios";

// export const login = async (email,password)=>{
// try {
//     const {data,status}= await apiInstance.post('user/token/',{email,password,});

//     if(status===200){

//         setAuthUser(data.access, data.refresh);
//         alert("Login Successful")
//     }
//     return{data, error:null};
// } catch (error) {
//     return{
//         data:null,
//         error:error.response.data?.detail || "Something went wrong "
        
//     }
// }
// };
//start
export const login = async (email, password) => {
    try {
        console.log("🔍 Attempting login for:", email);
        
        const { data, status } = await apiInstance.post('user/token/', { email, password });
        
        console.log("🔍 Login response:", { status, data });
        console.log("🔍 Response data structure:", Object.keys(data));
        
        if (status === 200) {
            // Validate the response structure
            if (!data.access || !data.refresh) {
                console.error("❌ Missing tokens in response:", {
                    hasAccess: !!data.access,
                    hasRefresh: !!data.refresh,
                    dataKeys: Object.keys(data)
                });
                return {
                    data: null,
                    error: "Invalid response from server - missing tokens"
                };
            }
            
            // Log token format for debugging
            console.log("🔍 Token info:", {
                accessType: typeof data.access,
                refreshType: typeof data.refresh,
                accessLength: data.access?.length,
                refreshLength: data.refresh?.length,
                accessPreview: data.access?.substring(0, 20) + "...",
                refreshPreview: data.refresh?.substring(0, 20) + "..."
            });
            
            // Check if tokens are valid JWT format
            const accessParts = data.access.split('.');
            const refreshParts = data.refresh.split('.');
            
            if (accessParts.length !== 3 || refreshParts.length !== 3) {
                console.error("❌ Invalid JWT format:", {
                    accessParts: accessParts.length,
                    refreshParts: refreshParts.length
                });
                return {
                    data: null,
                    error: "Invalid token format from server"
                };
            }
            
            console.log("✅ Tokens validated, setting user...");
            
            // Store tokens in localStorage
            localStorage.setItem('auth_token', data.access);
            localStorage.setItem('refresh_token', data.refresh); // Also store refresh token
            
            console.log("✅ Tokens stored in localStorage");
            
            // Set auth user
            await setAuthUser(data.access, data.refresh);
            
            alert("Login Successful");
            
            // Return success response
            return { data, error: null };
        }
        
        // If status is not 200, return error
        return {
            data: null,
            error: "Login failed - unexpected status code"
        };
        
    } catch (error) {
        console.error("❌ Login failed:", error);
        console.error("❌ Error response:", error.response?.data);
        
        return {
            data: null,
            error: error.response?.data?.detail || "Something went wrong"
        };
    }
};


//end

export const register= async (fullname, email,category, password,password2) =>{

    try{
        
    const {data}= await apiInstance.post('user/register/', {fullname, email, category, password, password2}); 
        

        await login(email,password)
        alert("Registration successful");
        return {data, error:null}


    }catch(error){
return{
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

// export const setAuthUser=async(access_token,refresh_token) =>{
//         // Cookies.set('access_token',access_token,{
//         //     expires: 1, 
//         //     secure: true
//         // })
//         Cookies.set('refresh_token',refresh_token,{
//             expires: 7, 
//             secure: true
//         });
//         const user=jwtDecode(access_token) ?? null
//         if (user){
//             useAuthstore.setState(state => ({...state, user}));
//         }
//             useAuthstore.setState(state => ({...state, loading: false}));
        
// }
export const setAuthUser = async (access_token, refresh_token) => {
    // Store BOTH tokens - this was your main issue
    Cookies.set('access_token', access_token, {
        expires: 1, // 1 day
        secure: false, // Set to false for localhost development
        sameSite: 'lax'
    });
    
    Cookies.set('refresh_token', refresh_token, {
        expires: 7, // 7 days
        secure: false, // Set to false for localhost development
        sameSite: 'lax'
    });

    try {
        const user = jwtDecode(access_token);
        
        if (user) {
            // Use your store's setUser method instead of setState
             useAuthstore.getState().setUser(user)
        }
    } catch (error) {
        console.error("Failed to decode token:", error);
    }
    
    // Use your store's setLoading method
    useAuthstore.getState().setLoading(false);
};

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