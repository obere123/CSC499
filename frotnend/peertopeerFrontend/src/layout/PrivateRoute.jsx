import { useEffect } from "react";

import { Navigate } from "react-router-dom";
import { useAuthstore } from "../store/auth";
import { Nav } from "react-bootstrap";

const PrivateRoute = ({children}) =>{

    const loggedIn=useAuthstore((state) => state.isLoggedIn)();

    return loggedIn ? <>{children}</> : <Navigate to= '/login/' />

}


export default PrivateRoute;
