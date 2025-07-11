import React from "react";
import axios from "axios";
import apiInstance from "./axios";
import { useAuthstore } from "../store/auth";
import { P2Proles } from "./constants";

 //const {user} = useAuthstore((state) => state.user()); //where data will be gotten
//api function call for tutee applying or course
export const DeleteFromPending=async(email,courseCode)=>{
try{

await apiInstance.delete(`pending/delete/${email}/${courseCode}/`);
alert("Success");


}catch(error){
    alert("Something is Wrong, Contact IT");
}
}

//the function below verifies whether a tutor is available for a tutee and vice versa
export const VerifyPersonAvailability = async ( coursecode,category) => {
  try {
    const response = await apiInstance.get('pending/', {
      params: {  coursecode, category},
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
if (!(await VerifyPersonAvailability(coursecode,P2Proles[category]))){
await apiInstance.post('pending/', { email, category, coursecode});
return;
//return data 
}else{
   try{
 const response= await apiInstance.get('pending/', {
        params: {category:P2Proles[category],coursecode},
    } );
    //variable to store the name from func above c
    const mydata=response.data;
    const obtainedEmail=mydata[0].email;

    try{
        if(category==="Tutor"){
try{
              await apiInstance.post('pairing/',{tutorEmail:email,tuteeEmail:obtainedEmail,coursecode:coursecode} );
            //await DeleteFromPending(email,coursecode);
            await DeleteFromPending(obtainedEmail,coursecode);
            
            
            
            }catch(error){
                console.log("Obere error is",error.response.data);
              }
            //delete shit 
        } else if(category==="Tutee"){
            console.log("The data is", mydata);
              await apiInstance.post('pairing/',{tutorEmail:obtainedEmail,tuteeEmail:email,coursecode: coursecode} 
               


              );
               await DeleteFromPending(obtainedEmail,coursecode);

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

export const CourseList=async()=>{
return apiInstance.get('course/');


}


export const GetPairings=async()=>{
return apiInstance.get('pairing/');

}


export const PairingsForTutees = async (tuteeEmail) => {
  return apiInstance.get("pairing/forTutee", {
    params: { tuteeEmail }
  });
};
export const GetCourseName=async(coursename)=>{
return apiInstance.get(`course-name/${coursename}/`)

}


export const GetPendings = async (email, category) => {
    const params = {};
    if (email) params.email = email;
    if (category) params.category = category;
    return apiInstance.get("getPendingByEmail/", { params });
}


export const AddCourseFunc=async(coursename,coursecode,course_description)=>{
  try{

apiInstance.post("course/", {coursename,coursecode,course_description}


)
  }catch(error){
    alert("error in course is", error)
    console.log(error)
  }
}



export const GetMostRecentPendings=async()=>{
try{

  const response=await apiInstance.get("pending/oldest/");
  return response.data
}catch(error){

alert(error.message)
console.log("The error for presidentdashboard is", error)


}

}



export const DeleteCourseFunc = async (coursename, coursecode) => {
  
    return await apiInstance.delete("deletecourse/", {
    data: {
      coursename: coursename,
      coursecode: coursecode
    }
  });
};


export const AddtoLogBook=async(tutorEmail,tuteeEmail,courseCode,log )=> {

  try{apiInstance.post('addToLog/',{
    
    
    tutorEmail,
    tuteeEmail,
    courseCode,
    
    log
  })}
  
  catch(error){
    
    
    alert("The logbook error is", error);
  console.log("The logbook error is", error);
  
  }

}

export const DisplayLog = async (tutorEmail, tuteeEmail, courseCode) => {
  const response = await apiInstance.get("getLogBookEntries/", {
    params: {
      tutorEmail,
      tuteeEmail,
      courseCode
    }
  });
  return response.data.results;
}