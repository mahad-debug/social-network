import React from "react";
import { getCookie, removeCookies } from "cookie-next";
import connect from "./server";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { checkCookies, getCookie, getCookies } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home = ({name, email}) => {
     
    const router = useRouter();
    const logout = () => {
        removeCookies('token');
        router.replace("/")
    }



    return (
        <div className="container">
        <div className="row">
            <div className="col">
                
         <h1 className="display-1 text-center py-5">Home Page</h1>
         
         <div>Welcome {name}</div>
         <div> {email}</div>
         <button onClick={logout}>Logout</button>
         
            </div>
        </div>
        </div>
    )
}

export async function getServerSideProps({ req, res}) {
    try {
     await connect();
     const token = getCookie('token', {req, res});
     if(!token) return {redirect : { destination: '/'}}

     const verified = await jwt.verify(token, process.JWT_SECRET);
     const obj = await User.findOne({ _id: verified.id });
     if(!obj) return {redirect : { destination: '/'}};
     return {
        props: {
       email: obj.email,
       name: obj.name,
        }
     }
    } catch (err){
        removeCookies('token', {req, res});
        return { redirect: {destination: "/"}}
    }
}
export default Home;