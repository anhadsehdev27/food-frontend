import { Navigate } from "react-router";


export default function AuthRedirect(){


const token = localStorage.getItem("token");


// already logged in
if(token){

return <Navigate to="/home"/>

}


// new user
return <Navigate to="/register"/>


}