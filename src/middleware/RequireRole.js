import { useLocation, Navigate, Outlet, useParams } from "react-router-dom";

import useAuth from "../hooks/useAuth";


const RequireRole = ({allowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();
 

    return (
        
        allowedRoles?.includes(auth?.role)
            ? <Outlet />
            : auth?.userData
                ? <Navigate to={"/unauthorized"} state={{ from: location }} replace />
                : <Navigate to={"/login"} state={{ from: location }} replace />
       
    )
}

export default RequireRole;