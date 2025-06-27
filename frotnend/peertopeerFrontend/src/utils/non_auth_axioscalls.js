import React from "react";
import axios from "axios";
import apiInstance from "./axios";
import { useAuthstore } from "../store/auth";
import { P2Proles } from "./constants";

 //const user = useAuthstore((state) => state.user()); //where data will be gotten
//api function call for tutee applying or course
export const DeleteFromPending=async(email,courseCode)=>{
try{

await apiInstance.delete(`pending/delete/${email}/${courseCode}/`);
alert("Deleted Successfully");


}catch(error){
    alert("Something is Wrong, Contact IT");
}
}

//the function below verifies whether a tutor is available for a tutee and vice versa
export const VerifyPersonAvailability = async (email, coursecode) => {
  try {
    const response = await apiInstance.get('pending/', {
      params: { email, coursecode },
    });

    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
      
      return false ;
    }

    else{
    return true;  }

  } catch (error) {
    console.log("Error verifying person availability:", error);
    return null;
  }
};

export const CourseApplication=async(email,category, coursecode)=>{
try{
if (!VerifyPersonAvailability(email,coursecode)){
await apiInstance.post('/pending', { email, category, coursecode});
//return data 
}else{
   try{
 const response= await apiInstance.get('/pending', {
        params: {category:P2Proles[category],coursecode},
    } );
    //variable to store the name from func above c
    const mydata=response.data;
    const obtainedEmail=mydata[0].email;

    try{
        if(category==="Tutor"){
            await apiInstance.post('pairing/',{tutorEmail:email,tuteeEmail:obtainedEmail,coursecode:coursecode} );
        } else if(category==="Tutee"){
              await apiInstance.post('pairing/',{tutorEmail:obtainedEmail,tuteeEmail:email,coursecode:coursecode} );

        }

    }catch(error){
        console.log(error);
    }


   }catch(error){
    console.log(error);
   }

}


}catch(error){
console.log(error)


}

}