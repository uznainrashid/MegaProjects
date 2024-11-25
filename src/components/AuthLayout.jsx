import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authentication }) => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
   const authStatus = useSelector(state=> state.auth.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login")
            
        }
        else if (!authentication && authStatus!==authentication) {
            navigate("/")
            
        }
        setLoader(false)
    
    }, [navigate , authentication , authStatus])
    
  return loader ? <h2>loading...</h2> : <>{children}</>

  
};

export default Protected;
