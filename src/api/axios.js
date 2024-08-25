import axios from "axios";
import React from "react";


import useAuth from "../hooks/useAuth";


const baseUrl=`${process.env.SERVER_URL}`


export default axios.create({
    baseURL:baseUrl,
    headers: {
        // 'Authorization': 'Bearer yourToken',
        'Content-Type': 'application/json',
      }
})



export const PrivateComponent = () => {
  const {auth} = useAuth();


  const privateAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      'Authorization': `Bearer ${auth.token}`,
    }
  });


  return privateAxios;
};


