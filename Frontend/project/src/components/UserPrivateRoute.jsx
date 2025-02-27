import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'
import isAuthUser from '../utils/isAuthUser'

function UserPrivateRoute(){
    const [isAuthenticated,setIsAuthenticated] =useState(false);
    const [isLoading,setIsLoading ] = useState(true);

    useEffect(()=>{
        const fetchData = async () =>{
            const authInfo = await isAuthUser();
            setIsAuthenticated(authInfo.isAuthenticated);
            setIsLoading(false);

        }
        fetchData();
    },[]);

    if(isLoading){
        return(
            <div>loading</div>
        )
    }

    if(!isAuthenticated){
        return(
            <Navigate to='/login' />
        )
    }
    return children
}
export default UserPrivateRoute