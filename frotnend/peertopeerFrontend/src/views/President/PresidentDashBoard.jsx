import React from "react";
import { useState,useEffect } from "react";
import { useAuth } from '../../utils/useAuth';
import PresidentNavBar from "./PresidentNavBar";


export default function PresidentDashBoard(){
    const { isAuthenticated, currentUser, loading: authLoading } = useAuth();


    if(currentUser.category==="President"){
    return(

<>

<PresidentNavBar/>




</> ) }else{
return(
    <div>
        No entry to president dahboard
    </div>
)

}


}