import React, { } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setLogout } from 'state/AppState';

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const dispatch = useDispatch();

  

    if (!auth || !auth.token ) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const payloadToken = jwt_decode(auth.token);
    const isTokenExpired = Date.now() >= payloadToken.exp * 1000;

    if (!isTokenExpired) {

        return <Outlet />;

    } else {
        dispatch(setLogout());
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
};

export default RequireAuth;
