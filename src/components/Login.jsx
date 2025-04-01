import {React, useState, useContext} from 'react'
import GlobalContext from '../context/GlobalContext'
import { Navigate, useNavigate } from 'react-router-dom';

export const Login = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const {setUser} = useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, mobileNo);
        setUser({username, password, email, mobileNo});
        navigate("/")
    }

  return (
    <div className={"w-screen h-160 bg-[url(/summer.jpg)] bg-cover bg-center flex flex-col items-start justify-center"}>
      
      <div className={"m-2 p-6 w-90 sm:w-sm h-105 gap-6 border-2 bg-white border-amber-50 rounded-xl flex flex-col items-center justify-center space-x-4"}>
      <h1 className="text-amber-800">Welcome!!</h1>
        <input  className={"p-2 border-2 rounded-sm"} type="text" placeholder="Name" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        {" "}
        <input  className={"p-2 border-2 rounded-sm"} type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        {" "}
        <input  className={"p-2 border-2 rounded-sm"} type="number" placeholder="Mobile No" value={mobileNo} onChange={(e)=>setMobileNo(e.target.value)}/>
        {" "}
        <input className={"p-2 border-2 rounded-sm"} type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleSubmit}>Login</button>
      </div>  
    </div>
  )
}
