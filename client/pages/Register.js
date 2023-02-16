import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { Modal } from "antd"
import Link from "next/link"
import { SyncOutlined} from '@ant-design/icons'
import AuthForm from "../components/forms/AuthForm";


const register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [secret, setSecret] = useState('');
    const[ok, setOk] = useState(false)
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        // console.log(name, email, password, secret);
        setLoading(true)
        const { data } = await axios.post("http://localhost:8000/api/register", {
            name,
            email,
            password,
            secret,
        })
        // .then((res) => setOk(res.data.ok))
        setOk(data.ok);
        setLoading(false);
    } catch(err) { 
        toast.error(err.response.data);
        setLoading(false);
    }
};
    return (
        <div className="container-fluid">
            {/* background color grey aya hwa hai */}
            <div className="row py-5 text-light bg-default-image">
                <div className="col text-center">
                <h1>Register</h1>
                </div>
            </div>
           

            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-lg-6 ">
                    <AuthForm  
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group p-2">
                            <small>
                            <label className="text-muted">your name</label>
                            </small>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Enter name" />
                        </div>
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
                        <div className="form-group p-2">
                            <small>
                                <label className="text-muted">Pick a question</label>
                            </small>
                            {/* phr tm name iddogay takay tm questiuon select kr skho */}
                            <select className="form-control" >
                                {/* select krwao phr option dedo */}
                                <option value="1">What is your favourite color?</option>
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

                        </div>
                        <div className="form-group p-2 ">
                        <button className="btn btn-primary btn-clock col-12">{loading ? <SyncOutlined spin className="py-1"/> : "Submit"}</button>
                        </div> 
                        </form>
                   
                </div>
           </div>
           <div className="row">
            <div className="col">
                <Modal 
                title="congratulation!"
                open={ok}
                
                onCancel={() => setOk(false)}
                footer={null}
                >
                
                    <p>bhai hogaye mubarak hoo</p>
                    <Link href="/Login">
                        <div className="btn btn-primary btn-sm">Login</div>
                    </Link>
                </Modal>
            </div>

           </div>
           <div className="row">
            <div className="col">
                <p className="text-center">
                    Already registered?{" "}
                    <Link href="/Login">
                        <div>Login</div>
                    </Link>
                </p>
            </div>
           </div>
            </div>

            
                    
               )
}
export default register;