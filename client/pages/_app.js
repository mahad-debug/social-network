import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import Head from "next/head"
import {ToastContainer} from 'react-toastify'; //
import "react-toastify/dist/ReactToastify.css";
// import "antd/dist/antd.css";



function myApp({ Component, pageProps}) {
    return (
    <>
    
    <Head>
        <link rel="stylesheet" href="/css/styles.css" />
    </Head>
    <Nav />
    <ToastContainer position="top-center" />
      
    <Component {...pageProps} />  
      
       {/* <Component {...pageProps} />    */}
    </>
    )
}

export default myApp;