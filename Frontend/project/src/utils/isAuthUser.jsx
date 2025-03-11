import { jwtDecode } from "jwt-decode";
import axios from 'axios'


const updateUserToken = async ()=>{
    const baseURL = "http://127.0.0.1:8000";
    const refreshToken = localStorage.getItem('refresh')

    try{
        const response = await axios.post(`${baseURL}/api/user/token/refresh/`,{
            refresh : refreshToken,
        })
        console.log(response.data)
        console.log(refreshToken)
        if (response.status===200){
            localStorage.setItem('access',response.data.access)
            localStorage.setItem('refresh',response.data.refresh)
            let decoded = jwtDecode(response.data.access)
            return {name : decoded.username, isAuthenticated : true }
        }
        else{
            return { name : null, isAuthenticated : false }
        }
    }
    catch(error){
        return { name : null, isAuthenticated : false }
        
    }
}

const isAuthUser = async () => {
    // console.log('3')
    const accessToken =localStorage.getItem('access')
    if(!accessToken){
        return { name : null, isAuthenticated : false }
    }
    const currentTime =Date.now()/1000
    let decoded = jwtDecode(accessToken)
    if(decoded.exp>currentTime){
        return { name : decoded.username, isAuthenticated : true }
    }
    else{
        const updateSuccess = await updateUserToken()
        return updateSuccess
    }
}

export default isAuthUser;