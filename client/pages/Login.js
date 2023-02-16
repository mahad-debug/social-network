import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { Modal } from "antd"
import Link from "next/link"
import { SyncOutlined } from '@ant-design/icons'
import AuthForm from "../components/forms/AuthForm";
import { useRouter } from "next/router";

import react from 'React';





const Login = () => {


    
     

   


    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clcicked")
            try {
            // console.log(name, email, password, secret);
             //setLoading(true)
            const data  = await axios.post("http://localhost:8000/api/login", {
                email,
                password,
            }
            );
            console.log(data);
            // .then((res) => setOk(res.data.ok))
        //    router.push("/")
        } catch(err) { 
            console.log(err)
            toast.error(err.response.data);
            setLoading(false);
         }
        // const requestOptions = {
        //     method: 'POST',
        //     // headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         email: "mahad62@gmail.com",
        //         password: "123456789"
        //     })
            // body:{
            // email: "mahad62@gmail.com",
            // password: "123456789"
            // }
        //};
        // fetch("http://localhost:8000/api/login", requestOptions)
        //     .then(response => response.json()).then(data => console.log("data=> ", data)).catch(error => console.error("error: ",error));
        //
        // try{
        //     let data = await fetch("http://localhost:8000/api/register", requestOptions);
        // // let data2 = await data.json()
        // let data2 = await data.json()
        // console.log("data2: ",data2)
        // }catch(e){
        //     console.log("error=> ",e)
        // }
        // fetch("http://localhost:8000/api/Register", {
        //     method: 'POST',
        //     // mode: 'cors',
        //     body: JSON.stringify({
        //         email: "mahad62@gmail.com",
        //         password: "123456789"
        //     }) // body data type must match "Content-Type" header
        // }).then(resp=>resp.json()).then(data=>console.log("darta:",data)).catch(e=>console.log("error:",e))
        //
    };

    return (
        <div className="container-fluid">
            {/* background color grey aya hwa hai */}
            <div className="row py-5 text-light bg-default-image">
                <div className="col text-center">
                    <h1>Login</h1>
                </div>
            </div>


            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-lg-6 ">
                    <AuthForm
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        page="login"
                    />
                    <form onSubmit={handleSubmit}>
                        {/* <div className="form-group p-2">
                            <small>
                            <label className="text-muted">your name</label>
                            </small>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Enter name" />
                        </div> */}
                        <div className="form-group p-2">
                            <small>
                                <label className="text-muted">your Email</label>
                            </small>
                            {/* is value k email ki jaga name likh dete to name pe likhtay to saath email pe b likha hwa ata */}
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Enter Email" />
                        </div>
                        <div className="form-group p-2">
                            <small>
                                <label className="text-muted">your Password</label>
                            </small>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter Password" />
                        </div>
                        {/* <div className="form-group p-2">
                            <small>
                                <label className="text-muted">Pick a question</label>
                            </small>
                            {/* phr tm name iddogay takay tm questiuon select kr skho */}
                        {/* <select className="form-control" > */}
                        {/* select krwao phr option dedo */}
                        {/* <option value="1">What is your favourite color?</option>
                                <option>What is your best friend name?</option>
                                <option>What city your were born?</option>
                            </select>
                            <small className="form-text text-muted">
                              When you forget the Password
                            </small>
                            <div className="form-group p-2">
                                <input type="text"
                                className="form-control"
                                placeholder="Wrtie your answer here"
                                />
                            </div>

                        </div>  */}
                        <div className="form-group p-2 ">
                            <button className="btn btn-primary btn-clock col-12">{loading ? <SyncOutlined spin className="py-1" /> : "Submit"}</button>
                            
                        </div>
                        {/* <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-facebook-f"></i>
    </button>  */}
                 

                 <a href="/auth/google/callback">Login with google</a>
                    </form>


                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">
                        Not yet registered?{" "}
                        <Link href="/Register">
                            <div>Register</div>
                        </Link>
                    </p>
                </div>
            </div>
        </div>



    )
}
export default Login;

export async function getServerSideProps({ req, res}){
     try{
        const cookieExists = getCookie('token', {req, res});
        if(cookieExists) return { redirect: {destination: "/home"}};
        return { props: {}}
           
     } catch (err) {
    return { props: {}};
}
}



